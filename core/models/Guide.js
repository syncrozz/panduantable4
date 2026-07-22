export default class Guide {

    constructor(data = {}) {

        this.id = data.id ?? "";
        this.title = data.title ?? "";
        this.slug = data.slug ?? "";
        this.summary = data.summary ?? "";
        this.content = data.content ?? {};

    }

}