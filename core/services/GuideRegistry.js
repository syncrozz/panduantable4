import JsonLoader from "../loader/JsonLoader.js";

export default class GuideRegistry {

    static async getAll() {

        return await JsonLoader.load("data/guides.json");

    }

}