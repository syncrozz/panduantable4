import MarkdownRenderer from "../core/renderer/MarkdownRenderer.js";

export default function GuideLayout({
    guide,
    previous,
    next
}) {

/* =========================================================
   GUIDE PANELS
========================================================= */

const sections = Object.entries(guide.content)
    .map(([key, value], index) => `
        <section
            id="${key}"
            class="guide-panel ${index === 0 ? "active" : ""}"
            data-tab="${key}">

            <div class="guide-content">

                ${MarkdownRenderer.render(value)}

            </div>

        </section>
    `)
    .join("");

/* =========================================================
   GUIDE NAVIGATION
========================================================= */

const navigation = Object.keys(guide.content)
    .map((key, index) => `
        <button
            class="guide-tab ${index === 0 ? "active" : ""}"
            data-tab="${key}"
            type="button">

            ${formatTitle(key)}

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

                ${
                    guide.heroImage ? `
                    <!-- =========================================================
                         GUIDE HERO
                    ========================================================= -->

                    <div class="guide-hero">

                        <img
                            class="guide-hero-image"
                            src="assets/images/${guide.heroImage.src}"
                            alt="${guide.heroImage.alt}"
                            loading="lazy">

                    </div>
                    ` : ""
                }

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