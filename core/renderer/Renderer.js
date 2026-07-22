import GuideLayout from "../../components/GuideLayout.js";

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

        app.innerHTML = GuideLayout(guide);

    }

}