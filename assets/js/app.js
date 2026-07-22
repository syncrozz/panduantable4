import CONFIG from "../../config/config.js";
import GuideService from "../../core/services/GuideService.js";
import Renderer from "../../core/renderer/Renderer.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.log(`${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`);

    try {

        const params = new URLSearchParams(window.location.search);

const slug = params.get("guide") || "table4";

const guide = await GuideService.getGuide(slug);

        Renderer.renderGuide(guide);

    } catch (error) {

    console.error("Application Error:", error);

    Renderer.renderGuide(null);

}

    

});