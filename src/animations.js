function fadeIn(element) {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s ease-in';
    element.style.opacity = 1;
}

function fadeOut(element, callback) {
    element.style.opacity = 1;
    element.style.transition = 'opacity 0.5s ease-out';
    element.style.opacity = 0;
    element.addEventListener('transitionend', function handleTransitionEnd() {
        element.removeEventListener('transitionend', handleTransitionEnd);
        if (callback) callback();
    });
}

function slideIn(element) {
    element.style.transform = 'translateY(-20px)';
    element.style.opacity = 0;
    element.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
    requestAnimationFrame(() => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = 1;
    });
}

function slideOut(element, callback) {
    element.style.transform = 'translateY(0)';
    element.style.opacity = 1;
    element.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    requestAnimationFrame(() => {
        element.style.transform = 'translateY(-20px)';
        element.style.opacity = 0;
    });
    element.addEventListener('transitionend', function handleTransitionEnd() {
        element.removeEventListener('transitionend', handleTransitionEnd);
        if (callback) callback();
    });
}

export { fadeIn, fadeOut, slideIn, slideOut };