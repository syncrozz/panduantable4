import MarkdownRenderer from "../core/renderer/MarkdownRenderer.js";
import GuideTable from "./guide/GuideTable.js";

export default function GuideLayout({
    guide,
    previous,
    next
}) {

/* =========================================================
   GUIDE PANELS
========================================================= */

const panelItems = guide.sections
    ? guide.sections.map(section => ({
        ...section
    }))
    : Object.entries(guide.content).map(([key, value]) => ({
        id: key,
        title: formatTitle(key),
        content: value
    }));

const sections = panelItems
    .map((section, index) => `

        <section
            id="${section.id}"
            class="guide-panel ${index === 0 ? "active" : ""}"
            data-tab="${section.id}">

            <div class="guide-content">

                ${
    section.image
        ? `
        <div class="guide-hero">

            <img
                class="guide-hero-image"
                src="assets/images/${section.image.src}"
                alt="${section.image.alt ?? ""}"
                loading="lazy">

            ${
                section.image.explanation
                    ? `
                    <div class="guide-hero-description">

                        ${MarkdownRenderer.render(section.image.explanation)}

                    </div>
                    `
                    : ""
            }

        </div>
        `
        : ""
}

                ${
                    section.note
                        ? `
                        <div class="guide-note guide-note-${section.note.type ?? "info"}">

                            ${MarkdownRenderer.render(section.note.content)}

                        </div>
                        `
                        : ""
                }

                ${
                    section.table
                        ? GuideTable(section.table)
                        : ""
                }

                ${MarkdownRenderer.render(section.content ?? "")}

            </div>

        </section>

    `)
    .join("");

/* =========================================================
   GUIDE NAVIGATION
========================================================= */

const navigation = panelItems
    .map((section, index) => `
        <button
            class="guide-tab ${index === 0 ? "active" : ""}"
            data-tab="${section.id}"
            type="button">

            ${section.title}

        </button>
    `)
    .join("");

/* =========================================================
   GUIDE LAYOUT
========================================================= */

return `
    <article class="guide">

        <!-- =========================================================
             GUIDE HEADER
        ========================================================= -->

        <header class="guide-header">

            <!-- =========================================================
                 GUIDE TABS
            ========================================================= -->

            <nav class="guide-tabs" aria-label="Panduan">

                ${navigation}

            </nav>

        </header>

        <!-- =========================================================
             GUIDE MAIN
        ========================================================= -->

        <main class="guide-main">

            <!-- =========================================================
                 GUIDE PANELS
            ========================================================= -->

            ${sections}

        </main>

        <!-- =========================================================
             GUIDE PAGINATION
        ========================================================= -->

        <footer class="guide-pagination">

            ${previous ? `
                <a
                    class="guide-prev"
                    href="?guide=${previous.slug}"
                    aria-label="${previous.title}">

                    <span class="arrow">←</span>
                    <span class="title">${previous.title}</span>

                </a>
            ` : `<span></span>`}

            ${next ? `
                <a
                    class="guide-next"
                    href="?guide=${next.slug}"
                    aria-label="${next.title}">

                    <span class="title">${next.title}</span>
                    <span class="arrow">→</span>

                </a>
            ` : ``}

        </footer>

    </article>
`;

}

function formatTitle(text) {

    return text
        .replace(/[-_]/g, " ")
        .replace(/([A-Z])/g, " $1")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase());

}