let card = document.getElementById("card-template");

showCard(data.events, card);

function showCard(arr, container) {

    let element = "";

    for (evento of arr) {

        if (data.currentDate <= evento.date) continue

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