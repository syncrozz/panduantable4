import JsonLoader from "../loader/JsonLoader.js";
import Guide from "../models/Guide.js";
import CONFIG from "../../config/config.js";

export default class GuideService {

    static async getGuide(slug) {

        const path = `${CONFIG.PATHS.GUIDES}${slug}/guide.json`;

        console.log(path);

        const data = await JsonLoader.load(path);
        

if (!data) {

    return null;

}

console.log(new Guide(data));

return new Guide(data);

    }

}