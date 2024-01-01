const createProductCard = (name, age, position, photoUrl) => {
    return `
        <div class="cards__content__card">
            <img src="${photoUrl}" alt="${name}" class="cards__content__card__image">
            <div class="cards__content__card__info">
                <h3>${name}</h3>
                <p>Age: ${age}</p>
                <p>Position: ${position}</p>
            </div>
        </div>
    `;
};

const generateProductCards = async () => {
    try {
        const response = await fetch('../data/card.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const container = document.querySelector('.cards__content');

        data.forEach(({ name, age, position, photoUrl }) => {
            const cardHtml = createProductCard(name, age, position, photoUrl);
            container.innerHTML += cardHtml;
        });
    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
};

// Call the function to generate product cards
generateProductCards();
console.log(createProductCard)