export default class Guide {

    constructor(data = {}) {

        this.id = data.id ?? "";
        this.title = data.title ?? "";
        this.slug = data.slug ?? "";
        this.summary = data.summary ?? "";

        // Hero Image
        this.heroImage = data.heroImage ?? null;

        // Sections (Schema v2)
        this.sections = Array.isArray(data.sections)
            ? data.sections
            : [];

        // Legacy Content (Schema v1)
        this.content = data.content ?? {};

        // Metadata
        this.keywords = data.keywords ?? [];
        this.related = data.related ?? [];
        this.references = data.references ?? [];
        this.category = data.category ?? "";
        this.order = data.order ?? 0;
        this.version = data.version ?? "";
        this.lastUpdated = data.lastUpdated ?? "";
        this.status = data.status ?? "";

    }

}