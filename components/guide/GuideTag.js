export default function GuideTag(value) {

    if (!value) return "";

    let text = "";
    let color = "gray";

    if (typeof value === "string") {

        text = value;

    } else {

        text = value.tag ?? "";
        color = value.color ?? "gray";

    }

    return `
        <span class="guide-tag guide-tag-${color}">
            ${text}
        </span>
    `;

}