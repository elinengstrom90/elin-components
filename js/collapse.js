class Collapse {

    constructor(classname) {
        this.classname = classname;
    }

    collapseHandler() {
        const collapseSelector = document.querySelector(`.${this.classname}`);
        const buttonSelector = collapseSelector.querySelector('[data-fn-collapse-button]');
        const contentSelector = collapseSelector.querySelector('[data-fn-collapse-content]');
        const contentActiveClass = 'js-is-open';
        
        buttonSelector.addEventListener('click', () => {
            contentSelector.classList.toggle(contentActiveClass);

            if (contentSelector.classList.contains(contentActiveClass)) {
                buttonSelector.setAttribute('aria-expanded', true);
                contentSelector.setAttribute('aria-hidden', false);
            } else {
                buttonSelector.setAttribute('aria-expanded', false);
                contentSelector.setAttribute('aria-hidden', true);
            }
        });
    }
}

const exampleCollapseA = new Collapse('c-collapse-example-a');
const exampleCollapseB = new Collapse('c-collapse-example-b');

exampleCollapseA.collapseHandler();
exampleCollapseB.collapseHandler();