import GuideBadge from "./GuideBadge.js";
import GuideTag from "./GuideTag.js";

export default function GuideTable(table) {

    if (!table) return "";

    const headers = table.columns
        .map(column => `
            <th ${column.width ? `style="width:${column.width}"` : ""}>
                ${column.label}
            </th>
        `)
        .join("");

    const rows = table.rows
        .map(row => {

            const cells = table.columns
                .map(column => {

                    const value = row[column.key];

                    return `
                        <td>
                            ${renderCell(value)}
                        </td>
                    `;

                })
                .join("");

            return `
                <tr>
                    ${cells}
                </tr>
            `;

        })
        .join("");

    return `

        <div class="guide-table-wrapper">

            <table class="guide-table">

                <thead>

                    <tr>

                        ${headers}

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

        </div>

    `;

}

function renderCell(value) {

    if (value == null) return "";

    if (typeof value === "string") {

        return value;

    }

    if (value.badge) {

        return GuideBadge(value);

    }

    if (value.tag) {

        return GuideTag(value);

    }

    return "";

}