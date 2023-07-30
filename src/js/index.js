import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat_api";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import Notiflix, { Notify } from "notiflix";

const API_KEY = "live_pS5WealZlYdylQIJf3EbFsnlffP93APeTqM7w4F5jMPKEI2WcKUp2VUwZHJtIhMY";
//const BASE_URL = "https://api.thecatapi.com/v1/";

axios.defaults.headers.common["x-api-key"] = API_KEY;

const breedSelectCatElem = document.querySelector('.breed-select')
const loaderElem = document.querySelector('.loader')
const errorElem = document.querySelector('.error')
const catInfoElem = document.querySelector('.cat-info')

//loaderElem.textContent = "";
breedSelectCatElem.addEventListener('change', onChangeSelect);

function createListOfCats() {
    breedSelectCatElem.classList.add('is-hidden');
    loaderElem.classList.remove('is-hidden');
    errorElem.classList.add('is-hidden');

    fetchBreeds()
        .then(data => {
        const paramsList = data.map(({ id, name }) => `<option value="${id}">${name}
        </option>`).join(' ');
        
        breedSelectCatElem.innerHTML = paramsList;
        
            new SlimSelect({
            select: breedSelectCatElem
        })

        loaderElem.classList.add('is-hidden');
        breedSelectCatElem.classList.remove('is-hidden')
    })
    .catch(error => {
        Notify.failure("Oops! Something went wrong! Try reloading the page!")
    });

}

createListOfCats();

function showCatInfoMarkup(data) {
    const { breeds, url } = data[0];
    const { name, temperament, description } = breeds[0];
    const catCard = `
    <img src="${url}" class="cat-img" width="450px" alt="${name}">
    <div class="cat-info-text">
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament">Temperament: ${temperament}</p>
    </div>
    `
    catInfoElem.innerHTML = catCard;
}

function onChangeSelect(event) {
    catInfoElem.classList.add('is-hidden');
    loaderElem.classList.remove('is-hidden');
    
    const selectCatId = event.target.value;
    
    fetchCatByBreed(selectCatId)
        .then(data => {
            showCatInfoMarkup(data);
            loaderElem.classList.add('is-hidden');
            catInfoElem.classList.remove('is-hidden');
        })
        .catch(error => {
            loaderElem.classList.add('is-hidden');
            Notify.failure("Oops! Something went wrong! Try reloading the page!")
    });
}
