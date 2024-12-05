import { fetchImageUrl } from './fetchPics.js';

let wines = JSON.parse(localStorage.getItem('wines')) || [];

function saveToLocalStorage() {
    localStorage.setItem('wines', JSON.stringify(wines));
}

function togglePreloader(show) {
    const preloader = document.getElementById('preloader');
    preloader.style.display = show ? 'flex' : 'none';
}

function displayCard(wine) {
    const wineCollection = document.getElementById('wine-collection');
    const template = document.getElementById('wine-card-template');

    const card = template.content.cloneNode(true);

    card.querySelector('.wine-name').textContent = wine.name;
    card.querySelector('.wine-country').textContent = wine.country;
    card.querySelector('.wine-type').textContent = wine.type;
    card.querySelector('.wine-price').textContent = wine.price;

    const imageElement = card.querySelector('.wine-image');

    if (wine.image) {
        imageElement.src = wine.image;
    } else {
        imageElement.src = 'images/error.jpg';
    }

    card.querySelector('.delete-btn').addEventListener('click', function () {
        wines = wines.filter(w => w.id !== wine.id);
        saveToLocalStorage();
        this.closest('.wine-card').remove();
    });

    wineCollection.appendChild(card);
}

function displayAllCards() {
    const wineCollection = document.getElementById('wine-collection');
    wineCollection.innerHTML = '';

    wines.forEach((wine) => {
        displayCard(wine);
    });
}

document.getElementById('wine-form').addEventListener('submit', function (e) {
    e.preventDefault();

    togglePreloader(true);

    const wineName = document.getElementById('wine-name').value.trim();
    const errorContainer = document.getElementById('wine-name-error');

    if (!wineName) {
        errorContainer.textContent = 'Введите нормальное название';
        togglePreloader(false);
        return;
    } else {
        errorContainer.textContent = '';
    }

    const wineCountry = document.getElementById('wine-country').value;
    const wineType = document.getElementById('wine-type').value;
    const winePrice = document.getElementById('wine-price').value;

    fetchImageUrl()
        .then((imageUrl) => {
            const newWine = {
                id: Date.now(),
                name: wineName,
                country: wineCountry,
                type: wineType,
                price: winePrice,
                image: imageUrl,
            };

            wines.push(newWine);
            saveToLocalStorage();
            displayCard(newWine);
            document.getElementById('wine-form').reset();
        })
        .finally(() => {
            togglePreloader(false);
        });
});

document.addEventListener('DOMContentLoaded', displayAllCards);
