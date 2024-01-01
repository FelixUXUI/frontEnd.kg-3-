const modalWindow = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content"); // Add this line
const btnToOpenModal = document.querySelector("#openCounterModalBtn");
const btnToCloseModal = document.querySelector(".modal__close");
const body = document.body;

const hideModal = () => {
    modalWindow.style.display = "none";
    body.style.overflow = "";
};

const showModal = () => {
    modalWindow.style.display = "flex";
    body.style.overflow = "hidden";
};

hideModal();

btnToOpenModal.addEventListener("click", () => {
    showModal();
});

btnToCloseModal.addEventListener("click", () => {
    hideModal();
});

modalContent.addEventListener("click", (event) => {
    // Stop event propagation to prevent closing the modal
    event.stopPropagation();
});

modalWindow.addEventListener("click", () => {
    hideModal();
});

const scrollCheck = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener("scroll", scrollCheck);
    }
}

window.addEventListener("scroll", scrollCheck);
setTimeout(showModal, 3000)