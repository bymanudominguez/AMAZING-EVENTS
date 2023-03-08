let card = document.getElementById("card-template");

showCard(data.events, card);

function showCard(arr, container) {

    let element = "";


    for (evento of arr) {

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

/* 

let card = document.getElementById("card-template");

data.events.map( i => {
    card.innerHTML += `
    <div class="col">
        <div class="card h-100 text-center">
            <img src="${i.image}" class="card-img-top" alt="${i.name}">
            <div class="card-body">
            <h5 class="card-title">${i.name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content.</p>
            <p style="display: inline-block; margin-right: 2rem;"> Price: $1000 </p>
            <a href="details.html" class="btn btn-dark">View More</a>
            </div>
        </div>
    </div>
    `;
}); 

*/