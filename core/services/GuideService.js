import JsonLoader from "../loader/JsonLoader.js";
import CONFIG from "../../config/config.js";

export default class GuideService {

    static async getGuide(slug) {

        const path = `${CONFIG.PATHS.GUIDES}${slug}/guide.json`;

        const data = await JsonLoader.load(path);

return new Guide(data);

    }

}

import Guide from "../models/Guide.js";
