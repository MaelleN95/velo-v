const delay = 400;

// Class names for various states of carousel elements.
const classSelectors = {
    selected: 'selected',
    prev: 'prev',
    next: 'next',
    prevSecond: 'prevLeftSecond',
    nextSecond: 'nextRightSecond',
    hideRight: 'hideRight',
    hideLeft: 'hideLeft',
};

// Get all carousel items.
const carouselItems = Array.from(document.querySelectorAll('#carousel div'));

/**
 * Clones a node without copying its classes.
 * @param {Element} node - The node to clone.
 * @returns {Element} - The cloned node without classes.
 */
const cloneNodeWithoutClasses = (node) => {
    const clonedNode = node.cloneNode(true);
    clonedNode.className = ''; // Remove all classes from the cloned node
    return clonedNode;
};

// Create an array of carousel items to loop through.
const items = [
    ...carouselItems
        .slice(carouselItems.length - 7)
        .map((item) => cloneNodeWithoutClasses(item)),
    ...carouselItems,
    ...carouselItems.slice(0, 7).map((item) => cloneNodeWithoutClasses(item)),
];

// Initialize the carousel by appending items to the carousel element.
const initCarousel = () => {
    const carousel = document.getElementById('carousel');
    items.forEach((item) => carousel.appendChild(item));
    updateClasses(carouselItems[0], classSelectors);
};

// Flag to prevent multiple transitions from occurring simultaneously.
let isTransitioning = false;
const setTransitioning = () => {
    isTransitioning = true;
    setTimeout(() => {
        isTransitioning = false;
    }, delay);
};

// Add transitions to all elements in the carousel.
const addTransitions = () => {
    const images = document.querySelectorAll('#carousel div img');
    images.forEach((image) => {
        image.style.transition = `all ${delay - 5}ms`;
    });
    const divs = document.querySelectorAll('#carousel div');
    divs.forEach((div) => {
        div.style.transition = `transform ${delay - 5}ms, left ${
            delay - 5
        }ms, opacity ${delay - 5}ms, z-index 0s`;
    });
};

// Remove transitions from all elements in the carousel.
const removeTransitions = () => {
    const images = document.querySelectorAll('#carousel div img');
    images.forEach((image) => {
        image.style.transition = 'none';
    });
    const divs = document.querySelectorAll('#carousel div');
    divs.forEach((div) => {
        div.style.transition = 'none';
    });
};

/**
 * Gets the index of the currently selected element.
 * @param {string} selectedClass - The CSS class name for the selected element.
 * @returns {number} - The index of the selected element.
 */
const getSelectedIndex = (selectedClass) => {
    const selected = document.querySelector(`.${selectedClass}`);
    return items.indexOf(selected);
};

/**
 * Gets the element based on the given direction relative to the currently selected element.
 * @param {string} direction - The direction ('next' or 'prev') to move from the selected element.
 * @param {string} selectedClass - The CSS class name for the selected element.
 * @returns {Element} - The element in the specified direction.
 */
const getElementByDirection = (direction, selectedClass) => {
    const selectedIndex = getSelectedIndex(selectedClass);
    let newIndex;
    addTransitions();
    if (direction === 'next') {
        if (selectedIndex < items.length - 4) {
            newIndex = selectedIndex + 1;
        } else {
            newIndex = selectedIndex + 1;
            setTimeout(() => {
                removeTransitions();
                newIndex = 4;
                updateClasses(items[newIndex], classSelectors);
            }, delay);
        }
    } else if (direction === 'prev') {
        if (selectedIndex > 3) {
            newIndex = selectedIndex - 1;
        } else {
            newIndex = selectedIndex - 1;
            setTimeout(() => {
                removeTransitions();
                newIndex = items.length - 5;
                updateClasses(items[newIndex], classSelectors);
            }, delay);
        }
    }
    return items[newIndex];
};

/**
 * Updates the class name of the given element.
 * @param {Element} element - The DOM element to update.
 * @param {string} className - The new class name to set.
 */
const updateClass = (element, className) => {
    if (element) element.className = className;
};

/**
 * Updates the classes of the selected element and its neighboring elements.
 * @param {Element} selected - The currently selected element.
 * @param {Object} classes - An object containing class names for various states.
 */
const updateClasses = (selected, classes) => {
    const next = selected?.nextElementSibling;
    const prev = selected?.previousElementSibling;
    const nextSecond = next?.nextElementSibling;
    const prevSecond = prev?.previousElementSibling;

    updateClass(selected, classes.selected);
    updateClass(prev, classes.prev);
    updateClass(next, classes.next);
    updateClass(prevSecond, classes.prevSecond);
    updateClass(nextSecond, classes.nextSecond);

    hideElements(nextSecond?.nextElementSibling, classes.hideRight, 'next');
    hideElements(prevSecond?.previousElementSibling, classes.hideLeft, 'prev');
};

/**
 * Hides elements in a specified direction starting from a given element.
 * @param {Element} startElement - The starting element for hiding.
 * @param {string} hideClass - The class name to set for hiding elements.
 * @param {string} direction - The direction ('next' or 'prev') to move from the start element.
 */
const hideElements = (startElement, hideClass, direction) => {
    let current = startElement;
    while (current) {
        updateClass(current, hideClass);
        current =
            direction === 'next'
                ? current.nextElementSibling
                : current.previousElementSibling;
    }
};

/**
 * Moves the focus to the specified element and updates the class names of surrounding elements.
 * @param {string|Element} element - The direction ('next' or 'prev') or the specific element to select.
 */
const moveToSelected = (element) => {
    if (isTransitioning) return;

    setTransitioning(true);

    const selected = getElementByDirection(element, classSelectors.selected);

    updateClasses(selected, classSelectors);
};

// Initialize the carousel.
initCarousel();

// Event listeners for keyboard navigation.
document.getElementById('carousel').addEventListener('focus', () => {
    document.addEventListener('keydown', handleKeydown);
});

document.getElementById('carousel').addEventListener('blur', () => {
    document.removeEventListener('keydown', handleKeydown);
});

/**
 * Handles keydown events for carousel navigation.
 * @param {KeyboardEvent} e - The keyboard event.
 */
const handleKeydown = (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveToSelected('prev');
            break;
        case 'ArrowRight':
            moveToSelected('next');
            break;
        default:
            return;
    }
    e.preventDefault();
};

// Event listeners for clicking on carousel items.
document.querySelectorAll('#carousel div').forEach((div, i) => {
    div.addEventListener('click', () => {
        const selectedIndex = getSelectedIndex(classSelectors.selected);
        if (i > selectedIndex) {
            moveToSelected('next');
        } else if (i < selectedIndex) {
            moveToSelected('prev');
        } else {
            return;
        }
    });
});

// Event listeners for clicking on carousel navigation buttons.
document.getElementById('prev').addEventListener('click', () => {
    moveToSelected('prev');
});

document.getElementById('next').addEventListener('click', () => {
    moveToSelected('next');
});

// Function to start the auto-slide feature
const startAutoSlide = () => {
    return setInterval(() => {
        moveToSelected('next');
    }, 4000);
};

// Function to stop the auto-slide feature
const stopAutoSlide = (intervalId) => {
    clearInterval(intervalId);
};

/**
 * Replaces the old class with the new class in the given element.
 * @param {Element} element - The element to update.
 * @param {string} oldClass - The class to remove.
 * @param {string} newClass - The class to add.
 */
const replaceClass = (element, oldClass, newClass) => {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
};

// Start auto-slide when the page loads
let autoSlideIntervalId = startAutoSlide();

const carouselSection = document.getElementById('carousel-section');
const pause = document.getElementById('pause');
// Pause auto-slide on mouse over, resume on mouse out
carouselSection.addEventListener('mouseover', () => {
    stopAutoSlide(autoSlideIntervalId);
    replaceClass(pause, 'fa-play', 'fa-pause');
});
carouselSection.addEventListener('mouseout', () => {
    autoSlideIntervalId = startAutoSlide();
    replaceClass(pause, 'fa-pause', 'fa-play');
});
