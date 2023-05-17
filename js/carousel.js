class Carousel {

    constructor(classname) {
        this.classname = classname;
    }

    carouselHandler() {
        const carouselSelector = document.querySelector(`.${this.classname}`);
        const buttonPrevSelector = carouselSelector.querySelector('[data-fn-carousel-prev]');
        const buttonNextSelector = carouselSelector.querySelector('[data-fn-carousel-next]');
        const itemElements = carouselSelector.querySelectorAll('[data-slide]');
        let index = 1;
        
        // Prev button
        buttonPrevSelector.addEventListener('click', () => {
            this.setActiveClass(--index, itemElements);
            this.setDisabled(index, itemElements, buttonPrevSelector, buttonNextSelector);
        });

        // Next button
        buttonNextSelector.addEventListener('click', () => {
            this.setActiveClass(++index, itemElements);
            this.setDisabled(index, itemElements, buttonPrevSelector, buttonNextSelector);
        });
    }

    setActiveClass(index, itemElements) {
        const activeClass = 'js-is-active';
        
        itemElements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (index == elem.getAttribute('data-slide')) {
                elem.classList.add(activeClass);
            }
        });
    }

    setDisabled(index, itemElements, buttonPrevSelector, buttonNextSelector) {
        
        itemElements.forEach(() => {
            if (index >= itemElements.length) {
                buttonNextSelector.setAttribute('disabled', true);
            } else if (index > 1) {
                buttonPrevSelector.removeAttribute('disabled');
            } else {
                buttonNextSelector.removeAttribute('disabled');
                buttonPrevSelector.setAttribute('disabled', true);
            }
        });
    }
}

const exampleCarouselA = new Carousel('c-carousel-example-a');

exampleCarouselA.carouselHandler();