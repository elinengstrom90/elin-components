class Accordion {

    constructor(classname) {
        this.classname = classname;
    }

    handleAccordion() {
        const accordionSelector = document.querySelector(`${this.classname}`);
        const itemElements = accordionSelector.querySelectorAll('[data-fn-accordion-item]');

        itemElements.forEach(elem => {
            const buttonSelector = elem.querySelector('[data-fn-accordion-button]');
            
            buttonSelector.addEventListener('click', () => {
                const panelSelector = buttonSelector.nextElementSibling;
                const itemSelector = buttonSelector.parentElement;
                const toggleClass = 'js-is-active';

                buttonSelector.parentElement.classList.toggle(toggleClass);

                if (itemSelector.classList.contains(toggleClass)) {
                    buttonSelector.setAttribute('aria-expanded', true);
                    panelSelector.setAttribute('aria-hidden', false);
                } else {
                    buttonSelector.setAttribute('aria-expanded', false);
                    panelSelector.setAttribute('aria-hidden', true);
                }
            });
        });
    }
}

const exampleAccordionA = new Accordion('.c-accordion-example-a');
const exampleAccordionB = new Accordion('.c-accordion-example-b');

exampleAccordionA.handleAccordion();
exampleAccordionB.handleAccordion();