import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";
//const API_KEY = "live_pS5WealZlYdylQIJf3EbFsnlffP93APeTqM7w4F5jMPKEI2WcKUp2VUwZHJtIhMY"

function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
        // == через fetch ==
    // return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(response => {
            // return response.json();
            return response.data;
        })
        .catch(error => {
            throw new Error("Request  Error:", error.message);
        });
}

function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    // return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(response => {
            return response.data;
            // return response.json();
        })
        .catch(error => {
            throw newError("Request Error:", error.message);
        });
}

export { fetchBreeds, fetchCatByBreed };