import CONFIG from "../config/config.js";

export default class SearchService {

    /**
     * Sinonim kata kunci.
     */
    static SYNONYMS = {
        "obe": [
            "outcome based education",
            "outcome-based education"
        ],
        "slt": [
            "student learning time"
        ],
        "clo": [
            "course learning outcome",
            "course learning outcomes"
        ],
        "plo": [
            "programme learning outcome",
            "program learning outcome",
            "programme learning outcomes",
            "program learning outcomes"
        ],
        "nf2f": [
            "non face to face",
            "non-face-to-face"
        ],
        "f2f": [
            "face to face",
            "face-to-face"
        ],
        "pdp": [
            "pengajaran dan pembelajaran",
            "teaching and learning"
        ]
    };

    /**
     * Normalize text.
     */
    static normalize(text = "") {

        return text
            .toLowerCase()
            .replace(/[-_]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    }

    /**
     * Expand keyword with synonyms.
     */
    static expandKeyword(keyword) {

        keyword = this.normalize(keyword);

        const words = [keyword];

        if (this.SYNONYMS[keyword]) {
            words.push(...this.SYNONYMS[keyword]);
        }

        return words;

    }

    /**
 * Extract searchable text from a guide.
 */
static extractSearchText(guide) {

    const parts = [];

    parts.push(guide.title);
    parts.push(guide.summary);

    (guide.keywords || []).forEach(v => parts.push(v));
    (guide.related || []).forEach(v => parts.push(v));
    (guide.references || []).forEach(v => parts.push(v));

    (guide.sections || []).forEach(section => {

        parts.push(section.title);

        if (section.content) {
            parts.push(section.content);
        }

        if (section.note?.content) {
            parts.push(section.note.content);
        }

        if (section.image?.alt) {
            parts.push(section.image.alt);
        }

        (section.blocks || []).forEach(block => {

            if (block.content) {
                parts.push(block.content);
            }

            if (block.image?.alt) {
                parts.push(block.image.alt);
            }

        });

    });

    return this.normalize(
        parts.filter(Boolean).join(" ")
    );

}

/**
 * Find the best matching section for a keyword.
 */
static findBestSection(guide, terms) {

    if (!guide.sections?.length) {
        return null;
    }

    let best = null;
    let bestScore = 0;

    guide.sections.forEach(section => {

        const parts = [];

        if (section.title) {
            parts.push(section.title);
        }

        if (section.content) {
            parts.push(section.content);
        }

        if (section.note?.content) {
            parts.push(section.note.content);
        }

        (section.blocks || []).forEach(block => {

            if (block.content) {
                parts.push(block.content);
            }

        });

        const text = this.normalize(parts.join(" "));

        let score = 0;

        terms.forEach(term => {

            if (this.fuzzyIncludes(text, term)) {
                score++;
            }

        });

        if (score > bestScore) {

            bestScore = score;

            const snippet =
                parts.join(" ")
                    .replace(/\*\*/g, "")
                    .replace(/\s+/g, " ")
                    .trim()
                    .substring(0, 160);

            best = {

                id: section.id,
                title: section.title,
                snippet

            };

        }

    });

    return best;

}
    /**
 * Calculate search score.
 */
static scoreGuide(guide, terms) {

    let score = 0;

    const title = this.normalize(guide.title);
    const keywords = this.normalize((guide.keywords || []).join(" "));
    const summary = this.normalize(guide.summary);

    const text = this.extractSearchText(guide);

    terms.forEach(term => {

        if (this.fuzzyIncludes(title, term)) {
            score += 100;
        }

        if (this.fuzzyIncludes(keywords, term)) {
            score += 60;
        }

        if (this.fuzzyIncludes(summary, term)) {
            score += 30;
        }

        if (this.fuzzyIncludes(text, term)) {
            score += 20;
        }

    });

    return score;

}

    /**
     * Search guides.
     */
    static search(guides, keyword) {

        if (!keyword) return [];

        keyword = this.normalize(keyword);

        if (keyword.length < CONFIG.SEARCH.MIN_KEYWORD_LENGTH) {
            return [];
        }

        const terms = this.expandKeyword(keyword);

        return guides
    .map(guide => ({

    ...guide,

    __score: this.scoreGuide(guide, terms),

    __matchedSection: this.findBestSection(
        guide,
        terms
    ),

    __highlightTitle: this.highlight(
        guide.title,
        keyword
    ),

    __highlightSummary: this.highlight(
        guide.summary,
        keyword
    )

}))
    .filter(guide => guide.__score > 0)
    .sort((a, b) => b.__score - a.__score)
    .slice(0, CONFIG.SEARCH.MAX_RESULTS);

    }

    /**
 * Calculate Levenshtein distance.
 */
static levenshtein(a = "", b = "") {

    const matrix = Array.from(
        { length: b.length + 1 },
        (_, i) => [i]
    );

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {

        for (let j = 1; j <= a.length; j++) {

            if (b[i - 1] === a[j - 1]) {

                matrix[i][j] = matrix[i - 1][j - 1];

            } else {

                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );

            }

        }

    }

    return matrix[b.length][a.length];

}

/**
 * Check fuzzy match.
 */
static fuzzyIncludes(text, term) {

    text = this.normalize(text);

    if (text.includes(term)) {
        return true;
    }

    const words = text.split(/\s+/);

    return words.some(word => {

        return this.levenshtein(word, term) <= 2;

    });

}

/**
 * Highlight matched keyword.
 */
static highlight(text = "", keyword = "") {

    if (!text || !keyword) {
        return text;
    }

    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`(${escaped})`, "ig");

    return text.replace(regex, "<mark>$1</mark>");

}

/**
 * Get search suggestions.
 */
static suggestions(guides, keyword) {

    if (!keyword) return [];

    keyword = this.normalize(keyword);

    const suggestions = new Set();

    guides.forEach(guide => {

        const fields = [
            guide.title,
            ...(guide.keywords || [])
        ];

        fields.forEach(value => {

            if (!value) return;

            const text = this.normalize(value);

            if (text.startsWith(keyword)) {
                suggestions.add(value);
            }

        });

    });

    return [...suggestions].slice(0, 8);

}

}