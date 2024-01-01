const hoverTexts = document.querySelectorAll('.header__content__right__links__link');
const hoverLines = document.querySelectorAll('.header__content__right__links__link__line');
const animationDuration = 100; // Adjust the duration as needed


const animateLine = (index, positionX, increasing) => {
    if (increasing && positionX <= 100) {
        hoverLines[index].style.width = `${positionX}%`;
        positionX++;
    } else if (!increasing && positionX >= 0) {
        hoverLines[index].style.width = `${positionX}%`;
        positionX--;
    }

    if (positionX >= 0 && positionX <= 100) {
        setTimeout(() => animateLine(index, positionX, increasing),
            animationDuration / 100);
    }
};

const startAnimation = (index) => {
    animateLine(index, 0, true);
};

const resetLine = (index) => {
    animateLine(index, 100, false);
};

hoverTexts.forEach((hoverText, index) => {
    resetLine(index);
    hoverText.addEventListener('mouseover', () => startAnimation(index));
    hoverText.addEventListener('mouseout', () => resetLine(index));
});

const carousel = document.querySelectorAll('.main__content__right__content');

let degree = -180;
const degreeAnimation = 1;
let rotation = 1
const carouselIntervalDuration = 10
const carouselTimeout = 1500
let positionDegree = 0;
let carouselInterval;

const degreeBlock = () => {
    if (positionDegree > degree) {
        positionDegree -= degreeAnimation;
        // positionDegree -= 1;
        carousel.forEach(element => {
            element.style.transform = `rotate(${positionDegree}deg)`;
        });
    }
    else if (positionDegree <= degree && rotation === 1) {
        clearInterval(carouselInterval)
        rotation = 2
        degree = -360;
        setTimeout(startCarouselRotation, carouselTimeout)
    } else if (positionDegree <= degree && rotation === 2) {
        clearInterval(carouselInterval)
        rotation = 1
        positionDegree = 0
        degree = -180;
        setTimeout(startCarouselRotation, carouselTimeout)
    }
};

const startCarouselRotation = () => {
    carouselInterval = setInterval(degreeBlock, carouselIntervalDuration);
}

startCarouselRotation()



