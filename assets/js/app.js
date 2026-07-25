console.log("APP START");

import CONFIG from "../../config/config.js";
import GuideService from "../../core/services/GuideService.js";
import GuideRegistry from "../../core/services/GuideRegistry.js";
import SearchService from "../../core/SearchService.js";
import Renderer from "../../core/renderer/Renderer.js";
import GuideTabs from "./modules/GuideTabs.js";
import ConceptLinks from "./modules/ConceptLinks.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.log(`${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`);

    await loadGuide();

    initSearch();

});

async function loadGuide() {

    try {

        const params = new URLSearchParams(window.location.search);

        const slug = params.get("guide") || "table4";

        await GuideRegistry.init();

const guide = await GuideService.getGuide(slug);

Renderer.renderGuide(guide);

GuideTabs.init();
ConceptLinks.init();

const hash = window.location.hash;

if (hash) {

    requestAnimationFrame(() => {

        const target = document.querySelector(hash);

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    });

}

    } catch (error) {

        console.error("Application Error:", error);

        Renderer.renderGuide(null);

    }

}

/**
 * Render search results.
 */
function renderSearchResults(results, matches) {

    if (!matches.length) {

        results.innerHTML = `
            <div class="search-empty">
                Tiada padanan dijumpai.
            </div>
        `;

        return;

    }

    results.innerHTML = matches.map(guide => {

        const section = guide.__matchedSection;

        const href = section
            ? `?guide=${guide.slug}#${section.id}`
            : `?guide=${guide.slug}`;

        const snippet = section
            ? section.snippet
            : (guide.__highlightSummary || guide.summary);

        const sectionTitle = section
            ? `
                <div class="search-section">
                    📍 ${section.title}
                </div>
            `
            : "";

        return `

            <a class="search-item" href="${href}">

                <strong>
                    ${guide.__highlightTitle || guide.title}
                </strong>

                ${sectionTitle}

                <small>
                    ${snippet}
                </small>

            </a>

        `;

    }).join("");

}

/**
 * Render search suggestions.
 */
function renderSuggestions(box, items, input) {

    box.innerHTML = "";

    if (!items.length) {

        box.hidden = true;
        return;

    }

    box.hidden = false;

    items.forEach(item => {

        const div = document.createElement("div");

        div.className = "search-suggestion";

        div.textContent = item;

        div.addEventListener("click", () => {

            input.value = item;
            input.dispatchEvent(new Event("input"));

            box.hidden = true;

        });

        box.appendChild(div);

    });

}

function initSearch() {

    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    const suggestionBox = document.getElementById("searchSuggestions");

    if (!input || !results) return;

    let guides = [];

    GuideService.getAllGuides().then(data => {

        guides = data;

    });

    input.addEventListener("input", e => {

        const keyword = e.target.value.trim();

        if (!keyword) {

            results.innerHTML = "";

            if (suggestionBox) {

                suggestionBox.hidden = true;
                suggestionBox.innerHTML = "";

            }

            return;

        }

        const matches = SearchService.search(
            guides,
            keyword
        );

        renderSearchResults(results, matches);

        if (suggestionBox) {

            const suggestions = SearchService.suggestions(
                guides,
                keyword
            );

            renderSuggestions(
                suggestionBox,
                suggestions,
                input
            );

        }

    });

    document.addEventListener("click", e => {

        if (!e.target.closest(".search-box")) {

            results.innerHTML = "";

            if (suggestionBox) {

                suggestionBox.hidden = true;

            }

        }

    });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            input.blur();

            results.innerHTML = "";

            if (suggestionBox) {

                suggestionBox.hidden = true;

            }

        }

    });

    results.addEventListener("click", () => {

        results.innerHTML = "";

        if (suggestionBox) {

            suggestionBox.hidden = true;

        }

    });

}