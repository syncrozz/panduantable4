import JsonLoader from "../loader/JsonLoader.js";
import CONFIG from "../../config/config.js";

export default class GuideService {

    static async getGuide(slug) {

        const path = `${CONFIG.PATHS.GUIDES}${slug}/guide.json`;

        return JsonLoader.load(path);

    }

}
