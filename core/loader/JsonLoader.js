import CONFIG from "../../config/config.js";

export default class JsonLoader {

    static async load(path) {

        try {

            const response = await fetch(path);

            if (!response.ok) {
                return null;
            }

            const data = await response.json();

            if (CONFIG.DEBUG) {
                console.log(data);
            }

            return data;

        } catch (error) {

            console.error("Failed to load JSON:", path, error);

            return null;

        }

    }

}