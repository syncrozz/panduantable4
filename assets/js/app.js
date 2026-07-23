console.log("APP START");

import CONFIG from "../../config/config.js";
import GuideService from "../../core/services/GuideService.js";
import GuideRegistry from "../../core/services/GuideRegistry.js";
import SearchService from "../../core/SearchService.js";
import Renderer from "../../core/renderer/Renderer.js";
import GuideTabs from "./modules/GuideTabs.js";

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

    } catch (error) {

        console.error("Application Error:", error);

        Renderer.renderGuide(null);

    }

}

function initSearch() {

    const input = document.getElementById("searchInput");

    const results = document.getElementById("searchResults");

    if (!input || !results) return;

    input.addEventListener("input", async (e) => {

        const keyword = e.target.value.trim();

        if (!keyword) {

            results.innerHTML = "";

            return;

        }

        const guides = await GuideService.getAllGuides();

        const matches = SearchService.search(guides, keyword);

        results.innerHTML = matches.map(guide => `

            <a class="search-item" href="?guide=${guide.slug}">
                <strong>${guide.title}</strong><br>
                <small>${guide.summary}</small>
            </a>

        `).join("");

    });

        // Tutup result apabila klik di luar search

    document.addEventListener("click", (e) => {

        if (!e.target.closest(".search-box")) {

            results.innerHTML = "";

        }

    });

    // Tekan ESC untuk tutup search result

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            results.innerHTML = "";

            input.blur();

        }

    });

    // Tutup result selepas pengguna klik salah satu hasil

    results.addEventListener("click", () => {

        results.innerHTML = "";

    });

}