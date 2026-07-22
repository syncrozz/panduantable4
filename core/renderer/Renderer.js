export default class Renderer {

    static renderGuide(guide) {

        document.getElementById("app").innerHTML = `
            <h1>${guide.title}</h1>
            <p>${guide.summary}</p>
        `;

    }

}
