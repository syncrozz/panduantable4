export default class MarkdownRenderer {

    static render(text = "") {

        if (!text) return "";

        let html = text;

        // -----------------------------
        // Horizontal Rule
        // -----------------------------
        html = html.replace(/^---$/gm, "<hr>");

        // -----------------------------
        // Headings
        // -----------------------------
        html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
        html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
        html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

        // -----------------------------
        // Blockquote
        // -----------------------------
        html = html.replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>");

        // -----------------------------
        // Bold & Italic
        // -----------------------------
        html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // -----------------------------
        // Bullet List
        // -----------------------------
        html = html.replace(/(?:^- .*(?:\r?\n|$))+?/gm, match => {

            const items = match
                .trim()
                .split(/\r?\n/)
                .map(item => `<li>${item.replace(/^- /, "")}</li>`)
                .join("");

            return `<ul>${items}</ul>`;

        });

        // -----------------------------
        // Numbered List
        // -----------------------------
        html = html.replace(/(?:^\d+\. .*(?:\r?\n|$))+?/gm, match => {

            const items = match
                .trim()
                .split(/\r?\n/)
                .map(item => `<li>${item.replace(/^\d+\.\s/, "")}</li>`)
                .join("");

            return `<ol>${items}</ol>`;

        });

        // -----------------------------
        // Line Break
        // -----------------------------
        html = html.replace(/\n/g, "<br>");

        return html;

    }

}