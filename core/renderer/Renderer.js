import GuideLayout from "../../components/GuideLayout.js";

console.log("=== RENDERER LOADED ===");

export default class Renderer {

    static renderGuide(guide) {

        console.log("Renderer:", guide);

        const app = document.getElementById("app");

        if (!guide) {

            app.innerHTML = `
                <h1>404</h1>
                <p>Guide not found.</p>
            `;

            return;

        }

        const html = GuideLayout(guide);

        console.log("Generated HTML:", html);

        app.innerHTML = html;

    }

}