export default function GuideLayout(guide) {

    return `
        <article class="guide">

            <header class="guide-header">

                <h1>${guide.title}</h1>

                <p>${guide.summary}</p>

            </header>

        </article>
    `;

}