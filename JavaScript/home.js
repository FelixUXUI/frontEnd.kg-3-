const CreatColorBtn = document.querySelectorAll('.create-color__content__buttons__button')
const CreatColorText = document.querySelector('.color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    CreatColorBtn.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            CreatColorText.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}


//slider-block
const sliderHandler = (prevBtn, nextBtn, contentBlock) => {
    let jsonData = null;
    let currentIndex = 0;

    const fetchSliderData = async () => {
        try {
            const response = await fetch('data/slider.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            jsonData = await response.json();
            renderData(currentIndex);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderData = (index) => {
        contentBlock.innerHTML = `
            <h3>${jsonData[index].name}</h3>
            <p>${jsonData[index].p}</p>
        `;
    };

    const handlePrevButtonClick = () => {
        currentIndex = (currentIndex - 1 + jsonData.length) % jsonData.length;
        renderData(currentIndex);
    };

    const handleNextButtonClick = () => {
        currentIndex = (currentIndex + 1) % jsonData.length;
        renderData(currentIndex);
    };

    fetchSliderData();

    prevBtn.addEventListener('click', handlePrevButtonClick);
    nextBtn.addEventListener('click', handleNextButtonClick);
};

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const contentBlock = document.querySelector('.slider-block__content__block');

sliderHandler(prevBtn, nextBtn, contentBlock);
