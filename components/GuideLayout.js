export default function GuideLayout(guide) {

    return `
        <article class="guide">

            <header class="guide-header">

                <h1>${guide.title}</h1>

                <p>${guide.summary}</p>

            </header>

            <section>

                <h2>Pengenalan</h2>

                <p>${guide.content.introduction}</p>

            </section>

            <section>

                <h2>Konsep</h2>

                <p>${guide.content.concept}</p>

            </section>

        </article>
    `;

}