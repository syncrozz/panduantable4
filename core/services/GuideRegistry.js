import GuideService from "./GuideService.js";

export default class GuideRegistry {

    static guides = [];

    static async init() {

        if (this.guides.length > 0) {
            return;
        }

        this.guides = await GuideService.getAllGuides();

    }

    static getAll() {

        return this.guides;

    }

    static getBySlug(slug) {

        return this.guides.find(
            guide => guide.slug === slug
        );

    }

    static getIndex(slug) {

        return this.guides.findIndex(
            guide => guide.slug === slug
        );

    }

    static getPrevious(slug) {

        const index = this.getIndex(slug);

        if (index <= 0) {
            return null;
        }

        return this.guides[index - 1];

    }

    static getNext(slug) {

        const index = this.getIndex(slug);

        if (index === -1 || index >= this.guides.length - 1) {
            return null;
        }

        return this.guides[index + 1];

    }

}