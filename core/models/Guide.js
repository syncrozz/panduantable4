export default class Guide {

    constructor(data = {}) {

        this.id = data.id ?? "";
        this.title = data.title ?? "";
        this.slug = data.slug ?? "";
        this.summary = data.summary ?? "";

        // Hero Image
        this.heroImage = data.heroImage ?? null;

        // Content
        this.content = data.content ?? {};

    }

}