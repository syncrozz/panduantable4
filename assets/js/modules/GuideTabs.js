export default class GuideTabs {

    static init() {

        const tabs = document.querySelectorAll(".guide-tab");
        const panels = document.querySelectorAll(".guide-panel");

        if (!tabs.length || !panels.length) {
            return;
        }

        tabs.forEach(tab => {

            tab.addEventListener("click", () => {

                const target = tab.dataset.tab;

                tabs.forEach(item =>
                    item.classList.remove("active")
                );

                panels.forEach(panel =>
                    panel.classList.remove("active")
                );

                tab.classList.add("active");

                const panel = document.querySelector(
                    `.guide-panel[data-tab="${target}"]`
                );

                if (panel) {

                    panel.classList.add("active");

                }

            });

        });

    }

}