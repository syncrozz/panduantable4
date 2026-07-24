console.log("✅ ConceptLinks Module Loaded");

export default class ConceptLinks {

    static init() {

    console.log("✅ ConceptLinks.init()");

    document.addEventListener("click", (e) => {

        console.log("CLICK:", e.target);

        const link = e.target.closest(".concept-link");

        if (!link) return;

        console.log("FOUND:", link.dataset.concept);

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        this.showPopup(link.dataset.concept);

    }, true);

}

    static showPopup(concept) {

        console.log("🚀 showPopup()", concept);

        this.closePopup();

        const popup = document.createElement("div");

        popup.className = "concept-popup-overlay";

        popup.innerHTML = `
            <div class="concept-popup">

                <div class="concept-popup-header">

                    <h3>📘 ${concept.toUpperCase()}</h3>

                    <button class="concept-popup-close">&times;</button>

                </div>

                <div class="concept-popup-body">

                    <p><strong>Concept:</strong> ${concept}</p>

                    <p>This is Concept Popup v1.</p>

                    <p>Knowledge Hub akan dipaparkan di sini nanti.</p>

                </div>

            </div>
        `;

        document.body.appendChild(popup);
        console.log(document.querySelector(".concept-popup-overlay"));
        console.log("✅ Popup Added To DOM");

        popup.querySelector(".concept-popup-close")
            .addEventListener("click", () => this.closePopup());

        popup.addEventListener("click", (e) => {

            if (e.target === popup) {

                this.closePopup();

            }

        });

    }

    static closePopup() {

        console.log("❌ closePopup()");

        document
            .querySelector(".concept-popup-overlay")
            ?.remove();

    }

}