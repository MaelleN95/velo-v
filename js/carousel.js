let isTransitioning = false;
const transitionDelay = 400;

const moveToSelected = (element) => {
    if (isTransitioning) return;

    isTransitioning = true;
    setTimeout(() => {
        isTransitioning = false;
    }, transitionDelay);

    const selectedClass = 'selected';
    const prevClass = 'prev';
    const nextClass = 'next';
    const prevSecondClass = 'prevLeftSecond';
    const nextSecondClass = 'nextRightSecond';
    const hideRightClass = 'hideRight';
    const hideLeftClass = 'hideLeft';

    const getElementByDirection = (direction) => {
        if (direction === 'next') {
            return (
                document.querySelector(`.${selectedClass}`)
                    .nextElementSibling ||
                document.querySelector(`.${selectedClass}`).parentElement
                    .firstElementChild
            );
        } else if (direction === 'prev') {
            return (
                document.querySelector(`.${selectedClass}`)
                    .previousElementSibling ||
                document.querySelector(`.${selectedClass}`).parentElement
                    .lastElementChild
            );
        } else {
            return direction;
        }
    };

    const updateClass = (element, className) => {
        if (element) element.className = className;
    };

    const selected = getElementByDirection(element);

    const next = selected ? selected.nextElementSibling : null;
    const prev = selected ? selected.previousElementSibling : null;
    const nextSecond = next ? next.nextElementSibling : null;
    const prevSecond = prev ? prev.previousElementSibling : null;

    updateClass(selected, selectedClass);
    updateClass(prev, prevClass);
    updateClass(next, nextClass);
    updateClass(prevSecond, prevSecondClass);
    updateClass(nextSecond, nextSecondClass);

    let current = nextSecond ? nextSecond.nextElementSibling : null;
    while (current) {
        updateClass(current, hideRightClass);
        current = current.nextElementSibling;
    }

    current = prevSecond ? prevSecond.previousElementSibling : null;
    while (current) {
        updateClass(current, hideLeftClass);
        current = current.previousElementSibling;
    }
};

document.getElementById('carousel').addEventListener('focus', () => {
    document.addEventListener('keydown', handleKeydown);
});

document.getElementById('carousel').addEventListener('blur', () => {
    document.removeEventListener('keydown', handleKeydown);
});

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

document.querySelectorAll('#carousel div').forEach((div) => {
    div.addEventListener('click', () => {
        moveToSelected(div);
    });
});

document.getElementById('prev').addEventListener('click', () => {
    moveToSelected('prev');
});

document.getElementById('next').addEventListener('click', () => {
    moveToSelected('next');
});
