import CONFIG from "../config/config.js";

export default class SearchService {

    /**
     * Search guides by keyword.
     * @param {Array} guides
     * @param {string} keyword
     * @returns {Array}
     */
    static search(guides, keyword) {

        if (!keyword) return [];

        keyword = keyword.trim().toLowerCase();

        if (keyword.length < CONFIG.SEARCH.MIN_KEYWORD_LENGTH) {
            return [];
        }

        return guides.filter(guide => {

            const title = (guide.title || "").toLowerCase();
            const summary = (guide.summary || "").toLowerCase();
            const keywords = (guide.keywords || []).join(" ").toLowerCase();

            return (
                title.includes(keyword) ||
                summary.includes(keyword) ||
                keywords.includes(keyword)
            );

        }).slice(0, CONFIG.SEARCH.MAX_RESULTS);

    }

}