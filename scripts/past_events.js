const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

async function callAPI() {

    let data = null;

    try {
        const response = await fetch(urlApi);
        data = await response.json();
    }
    catch (error) {
        const response = await fetch("../amazing.json");
        data = await response.json();
        console.log(error);
    };

    const checkboxesContainer = document.getElementById("checkboxes-container");
    const cardsContainer = document.getElementById("cards-container");
    const searchInput = document.getElementById("search-input")

    searchInput.addEventListener("input", filterUnion);

    checkboxesContainer.addEventListener("change", filterUnion);

    printCheckboxes(data.events);
    printCards(data.events);

    function filterUnion() {
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
            cardsContainer.innerHTML = "<h4 class='noMatch'>No matches</h4>";
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
                    </div>
                    <div class="card-footer border-0">
                            <p style="display: inline-block; margin-right: 2rem;"> Price: $${element.price} </p>
                            <a href="details.html?id=${element._id}" class="btn btn-dark">View More</a>
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
};

callAPI();