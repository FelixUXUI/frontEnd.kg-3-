const photoInput = document.querySelector("#phone_input"),
    photoButton = document.querySelector("#phone_button"),
    photoResult = document.querySelector("#phone_result")

const regExp = /\+996 [2574]\d{2} \d{2}-\d{2}-\d{2}/

photoButton.onclick = () => {
    if (regExp.test(photoInput.value)) {
        photoResult.innerHTML = 'ok'
        photoResult.style.color = '#00ff00'
        photoInput.style.color = '#ffffff'
    } else {
        photoResult.innerHTML = 'not ok'
        photoResult.style.color = '#ff0000'
        photoInput.style.color = '#ffffff'
    }
}


const tabContentBlock = document.querySelectorAll('.tab-slider__content__contents__block'),
    itemContentBlock = document.querySelector('.tab-slider__content__contents__items'),
    tabBlock = document.querySelectorAll('.tab-slider__content__contents__items__item')


const hideContentBlock = () => {
    tabContentBlock.forEach(tabContentBlock => {
        tabContentBlock.style.display = 'none'
    })
    tabBlock.forEach(tabBlocks => {
        tabBlocks.classList.remove('tab-slider__content__items__item__active')
    })
}

const showContent = (indexElement = 0) => {
    tabContentBlock[indexElement].style.display = 'flex'
    tabBlock[indexElement].classList.add('tab-slider__content__items__item__active')
}

hideContentBlock()
showContent()

itemContentBlock.onclick = (event) => {
    if (event.target.classList.contains('tab-slider__content__contents__items__item')) {
        tabBlock.forEach((tabBlocks, tabIndex) => {
            if (event.target === tabBlocks) {
                hideContentBlock()
                showContent(tabIndex)
            }
        })
    }
}

let slaiderIndex = 0

const autoSlider = () => {
    hideContentBlock()
    slaiderIndex = (slaiderIndex + 1) % tabContentBlock.length
    showContent(slaiderIndex)
}
setInterval(autoSlider, 3000)


const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const converter = (element, targetElement, targetElement2, current) => {
    element.addEventListener('input', async () => {
        try {
            const xhr = await fetch(`../data/convertor.json`);
            const data = await xhr.json()

            switch (current) {
                case 'som':
                    targetElement.value = (element.value * data.SOM.ToUSD).toFixed(2);
                    targetElement2.value = (element.value * data.SOM.ToEUR).toFixed(2);
                    targetElement.style.color = '#ffffff'
                    targetElement2.style.color = '#ffffff'
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.USD.ToSOM).toFixed(2);
                    targetElement2.value = (element.value * data.USD.ToEUR).toFixed(2);
                    targetElement.style.color = '#ffffff'
                    targetElement2.style.color = '#ffffff'
                    break;
                case 'eur':
                    targetElement.value = (element.value * data.EUR.ToSOM).toFixed(2);
                    targetElement2.value = (element.value * data.EUR.ToUSD).toFixed(2);
                    targetElement.style.color = '#ffffff'
                    targetElement2.style.color = '#ffffff'
                    break;
                default:
                    break;
            }
            element.value === "" ? (targetElement.value = targetElement2.value = "") : null
        } catch (e) {
            console.log(e)
        }
    });
};
// const converter = (element, targetElement, targetElement2, current) => {
//     element.addEventListener('input', () => {
//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', '../data/convertor.json');
//         xhr.setRequestHeader('Content-type', 'application/json');
//         xhr.send();
//
//         xhr.onload = () => {
//             if (xhr.status === 200) {
//                 const data = JSON.parse(xhr.response);
//
//             } else {
//                 console.error('Error loading data:', xhr.statusText);
//             }
//         };
//     });
// };

converter(som, usd, eur, 'som');
converter(usd, som, eur, 'usd');
converter(eur, som, usd, 'eur');

const card = document.querySelector('.card-switcher__content__switcher__card'),
    prevBtn = document.querySelector('#btn-prev'),
    nextBtn = document.querySelector('#btn-next')

let count = 1;
const maxCount = 200;

const updateCard = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        card.innerHTML = `
            <p>
                Card ${count}: ${data.title}
            </p>
            <span style="color: ${data.completed ? "green" : "red"}">${data.completed}</span>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

updateCard();

nextBtn.addEventListener('click', () => {
    count++
    if (count > 200) {
        count = 1
    }
    updateCard();
});

prevBtn.addEventListener('click', () => {
    count--
    if (count < 1) {
        count = 200
    }
    updateCard();
});

const fetchData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Raw response:");
        console.log(response); // Log the raw response
        console.log("Processed data:");
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();



const cityNameInput = document.querySelector('#weather-forecast'),
    resultCityName = document.querySelector('.result-city'),
    resultForecastNumber = document.querySelector('.result-forecast')

const BASE_URL = 'http://api.openweathermap.org'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

cityNameInput.addEventListener('input', async (event) => {
    try {
        const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        resultCityName.textContent = data.name;
        resultForecastNumber.textContent = `Temperature: ${Math.round(data?.main?.temp - 273.15)} °C`;
    } catch (error) {
        resultCityName.textContent = 'City not found';
        resultForecastNumber.textContent = '';
    }
});

