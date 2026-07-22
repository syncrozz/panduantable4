import MarkdownRenderer from "../core/renderer/MarkdownRenderer.js";

export default function GuideLayout({
    guide,
    previous,
    next
}) {

    const sections = Object.entries(guide.content)
        .map(([key, value]) => `
            <section id="${key}" class="guide-section">

                <div class="guide-content">
                    ${MarkdownRenderer.render(value)}
                </div>

            </section>
        `)
        .join("");

    const navigation = Object.keys(guide.content)
        .map(key => `
            <li>
                <a href="#${key}">
                    ${formatTitle(key)}
                </a>
            </li>
        `)
        .join("");

    return `
        <article class="guide">

            <header class="guide-header">

                <nav class="guide-nav">

                    <ul>
                        ${navigation}
                    </ul>

                </nav>

                <h1>${guide.title}</h1>

                <!-- Summary disembunyikan.
Digunakan untuk metadata / search sahaja. -->

                ${
                    guide.heroImage ? `
                    <div class="guide-hero">
    <img
    class="guide-hero-image"
    src="assets/images/${guide.heroImage.src}"
    alt="${guide.heroImage.alt}"
    loading="lazy"
>
</div>
                    ` : ""
                }

            </header>

            ${sections}

            <footer class="guide-pagination">

                ${previous ? `
                    <a class="guide-prev" href="?guide=${previous.slug}">
                        ← ${previous.title}
                    </a>
                ` : `<span></span>`}

                ${next ? `
                    <a class="guide-next" href="?guide=${next.slug}">
                        ${next.title} →
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