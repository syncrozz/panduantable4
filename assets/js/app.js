import CONFIG from "../../config/config.js";
import GuideService from "../../core/services/GuideService.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.log(`${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`);

    try {

        const guide = await GuideService.getGuide("table4");

        console.log("Guide Loaded:", guide);

    } catch (error) {

        console.error(error);

    }

});