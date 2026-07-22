import MarkdownRenderer from "../core/renderer/MarkdownRenderer.js";

export default function GuideLayout(guide) {

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

                    <h3>Kandungan</h3>

                    <ul>
                        ${navigation}
                    </ul>

                </nav>

                <h1>${guide.title}</h1>

                <p>${guide.summary}</p>

            </header>

            ${sections}

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