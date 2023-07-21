const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) {
        return (c / 2) * t * t + b;
    }
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

const move = (el, amount) => {
    el.scrollTop = amount;
};

export const scrollTo = ({ el, to, duration = 500, callback }) => {
    const start = el.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    duration = duration ? duration : 500;

    const animateScroll = function () {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        move(el, val);
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            if (callback) {
                callback();
            }
        }
    };
    animateScroll();
};
