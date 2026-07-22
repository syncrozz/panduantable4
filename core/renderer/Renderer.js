import GuideLayout from "../../components/GuideLayout.js";
import GuideRegistry from "../services/GuideRegistry.js";

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

        const previous = GuideRegistry.getPrevious(guide.slug);
        const next = GuideRegistry.getNext(guide.slug);

        console.log("Previous:", previous);
        console.log("Next:", next);

        const html = GuideLayout({
            guide,
            previous,
            next
        });

        console.log("Generated HTML:", html);

        app.innerHTML = html;

    }

}