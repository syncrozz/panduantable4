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
    .map((section, index) => {

        // =========================================================
        // NEW FORMAT (blocks[])
        // =========================================================

        const blocks = section.blocks
            ? section.blocks.map(block => `

                ${block.image ? `
                <div class="guide-hero">

                    <img
                        class="guide-hero-image"
                        src="assets/images/${block.image.src}"
                        alt="${block.image.alt ?? ""}"
                        loading="lazy">

                    ${block.image.explanation ? `
                    <div class="guide-hero-description">

                        ${MarkdownRenderer.render(block.image.explanation)}

                    </div>
                    ` : ""}

                </div>
                ` : ""}

                ${block.note ? `
                <div class="guide-note guide-note-${block.note.type ?? "info"}">

                    ${MarkdownRenderer.render(block.note.content)}

                </div>
                ` : ""}

                ${block.table ? GuideTable(block.table) : ""}

                ${block.html ?? ""}

                ${MarkdownRenderer.render(block.content ?? "")}

            `).join("")

            // =========================================================
            // BACKWARD COMPATIBLE (image + content)
            // =========================================================

            : `

                ${section.image ? `
                <div class="guide-hero">

                    <img
                        class="guide-hero-image"
                        src="assets/images/${section.image.src}"
                        alt="${section.image.alt ?? ""}"
                        loading="lazy">

                    ${section.image.explanation ? `
                    <div class="guide-hero-description">

                        ${MarkdownRenderer.render(section.image.explanation)}

                    </div>
                    ` : ""}

                </div>
                ` : ""}

                ${section.note ? `
                <div class="guide-note guide-note-${section.note.type ?? "info"}">

                    ${MarkdownRenderer.render(section.note.content)}

                </div>
                ` : ""}

                ${section.table ? GuideTable(section.table) : ""}

                ${section.html ?? ""}

                ${MarkdownRenderer.render(section.content ?? "")}

            `;

        return `

            <section
                id="${section.id}"
                class="guide-panel ${index === 0 ? "active" : ""}"
                data-tab="${section.id}">

                <div class="guide-content">

                    ${blocks}

                </div>

            </section>

        `;

    })
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

    <div class="guide-title">

        <h1>${guide.title}</h1>

    </div>

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
                    class="guide-pagination-card guide-prev"
                    href="?guide=${previous.slug}"
                    aria-label="${previous.title}">

                    <span class="guide-pagination-label" aria-hidden="true">

                        ← 

                    </span>

                    <span class="guide-pagination-tooltip">

                        ${previous.title}

                    </span>

                </a>
            ` : `<div></div>`}

            ${next ? `
                <a
                    class="guide-pagination-card guide-next"
                    href="?guide=${next.slug}"
                    aria-label="${next.title}">

                    <span class="guide-pagination-label" aria-hidden="true">

                         →

                    </span>

                    <span class="guide-pagination-tooltip">

                        ${next.title}

                    </span>

                </a>
            ` : `<div></div>`}

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