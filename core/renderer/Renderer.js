export default class Renderer {

    static renderGuide(guide) {

        const app = document.getElementById("app");

        if (!guide) {

            app.innerHTML = `
                <h1>404</h1>
                <p>Guide not found.</p>
            `;

            return;

        }

        app.innerHTML = `
            <h1>${guide.title}</h1>
            <p>${guide.summary}</p>
        `;

    }

}