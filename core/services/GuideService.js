import JsonLoader from "../loader/JsonLoader.js";
import Guide from "../models/Guide.js";
import CONFIG from "../../config/config.js";

export default class GuideService {

    /**
     * Load a single guide.
     */
    static async getGuide(slug) {

        const path = `${CONFIG.PATHS.GUIDES}${slug}/guide.json`;

        const data = await JsonLoader.load(path);

        if (!data) {
            return null;
        }

        return new Guide(data);

    }

    /**
     * Load guide index.
     */
    static async getGuideIndex() {

        return await JsonLoader.load(
            `${CONFIG.PATHS.GUIDES}index.json`
        );

    }

    /**
     * Load all guides.
     */
    static async getAllGuides() {

        const index = await this.getGuideIndex();

        if (!index || !Array.isArray(index)) {
            return [];
        }

        const guides = await Promise.all(

            index.map(async item => {

                return await this.getGuide(item.slug);

            })

        );

        return guides.filter(Boolean);

    }

}