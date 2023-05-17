class Tabs {

    constructor(classname) {
        this.classname = classname;
    }

    tabsHandler() {
        const tabSelector = document.querySelector(`.${this.classname}`);
        const buttonElements = tabSelector.querySelectorAll('[data-fn-tabs-button]');
        const panelElements = tabSelector.querySelectorAll('[data-fn-tabs-panel]');
        const itemElements = tabSelector.querySelectorAll('[data-fn-tabs-item]');

        buttonElements.forEach(elem => {

            elem.addEventListener('click', () => {
                const activeClass = 'js-is-active';
                const item = elem.parentElement;
                const buttonUniqueId = elem.getAttribute('id');

                // Active class - Item
                if (item.classList.contains(activeClass)) {
                    item.classList.remove(activeClass);
                    elem.setAttribute('aria-selected', false);
                } else {
                    itemElements.forEach(elem => elem.classList.remove(activeClass));
                    item.classList.add(activeClass);
                    // Aria
                    buttonElements.forEach(elem => elem.setAttribute('aria-selected', false));
                    elem.setAttribute('aria-selected', true);
                }

                // Active class - Panel
                panelElements.forEach(elem => {
                    const panelActiveClass = 'js-is-active';
                    const panelUniqueId = elem.getAttribute('aria-labelledby');

                    if (panelUniqueId == buttonUniqueId) {
                        elem.classList.add(panelActiveClass);
                        elem.setAttribute('aria-hidden', false)
                    } else {
                        elem.classList.remove(panelActiveClass);
                        elem.setAttribute('aria-hidden', true)
                    }
                });

            });
        });
    }
}

const exampleTabsA = new Tabs('c-tabs-example-a');
const exampleTabsB = new Tabs('c-tabs-example-b');

exampleTabsA.tabsHandler();
exampleTabsB.tabsHandler();
