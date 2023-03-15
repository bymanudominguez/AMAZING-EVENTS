const checkboxesContainer = document.getElementById("checkboxes-container");
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input")

searchInput.addEventListener("input", superFiltro);

checkboxesContainer.addEventListener("change", superFiltro);

printCheckboxes(data.events);
printCards(data.events);

function superFiltro() {
    let filteredArr1 = filteredByName(data.events, searchInput.value);
    let filteredArr2 = filteredByCategory(filteredArr1);
    printCards(filteredArr2);
};

function printCheckboxes(arr) {
    let checkboxes = "";
    let repeatedCategories = arr.map(element => element.category);
    let categories = new Set(repeatedCategories.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }));
    categories.forEach(element => {
        checkboxes += `
        <div class="form-check form-check-inline checkboxes">
        <label><input class="form-check-input" type="checkbox" value="${element}">${element}</label></div>
        `;
    });
    checkboxesContainer.innerHTML = checkboxes;
};

function printCards(arr) {
    if (arr.length == 0) {
        cardsContainer.innerHTML = "<h4 class='display-1 fw-bolder'> No matches :( </h2>";
        return;
    };
    let cards = "";
    arr.filter(i => i.date < data.currentDate).forEach(element => {
        cards += `
            <div class="col">
                <div class="card h-100 text-center">
                    <img src="${element.image}" class="card-img-top" alt="${element.name}">
                    <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <p style="display: inline-block; margin-right: 2rem;"> Price: ${element.price} </p>
                    <a href="details.html?id=${element.id}" class="btn btn-dark">View More</a>
                    </div>
                </div>
            </div>
            `;
    });
    cardsContainer.innerHTML = cards;
};

function filteredByName(arr, text) {
    let filteredArr = arr.filter(element => element.name.toLowerCase().includes(text.toLowerCase()));
    return filteredArr;
};

function filteredByCategory(arr) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let arrCheckboxes = Array.from(checkboxes);
    let checkedCheckboxes = arrCheckboxes.filter(checkbox => checkbox.checked);
    if (checkedCheckboxes.length == 0) {
        return arr;
    };
    let checkboxValue = checkedCheckboxes.map(checkbox => checkbox.value);

    let filteredArr = arr.filter(element => checkboxValue.includes(element.category));
    return filteredArr;
};


/*
let card = document.getElementById("card-template");

data.events.filter(i => i.date < data.currentDate).forEach( i => { 
    card.innerHTML += `
    <div class="col">
        <div class="card h-100 text-center">
            <img src="${i.image}" class="card-img-top" alt="${i.name}">
            <div class="card-body">
            <h5 class="card-title">${i.name}</h5>
            <p class="card-text">${i.description}</p>
            <p style="display: inline-block; margin-right: 2rem;"> Price: ${i.price} </p>
            <a href="details.html" class="btn btn-dark">View More</a>
            </div>
        </div>
    </div>
    `;
});
*/

// TASK 2

/*

let card = document.getElementById("card-template");

showCard(data.events, card);

function showCard(arr, container) {

    let element = "";

    for (evento of arr) {

        if (evento.date > data.currentDate) continue

        element += `
        <div class="col">
            <div class="card h-100 text-center">
                <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                <div class="card-body">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">${evento.description}</p>
                <p style="display: inline-block; margin-right: 2rem;"> Price: ${evento.price} </p>
                <a href="details.html" class="btn btn-dark">View More</a>
                </div>
            </div>
        </div>`

    };

    container.innerHTML = element;

};

*/