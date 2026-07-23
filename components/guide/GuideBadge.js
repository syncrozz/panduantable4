export default function GuideBadge(value) {

    if (!value) return "";

    const text =
        typeof value === "string"
            ? value
            : value.badge ?? "";

    return `
        <span class="guide-badge">
            ${text}
        </span>
    `;

}