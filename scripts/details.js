const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const evento = data.events.find(i => i.id == id);

const detailsCard = document.getElementById("details-card");

detailsCard.innerHTML += `
        <div class="card card-details col-lg-12">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${evento.image}" class="img-fluid" alt="${evento.name}">
                </div>
                <div class="col-md-6">
                    <div class="card-body card-body-details">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}</p>
                        <p class="card-text">Date: ${evento.date}</p>
                        <p class="card-text">Place: ${evento.place}</p>
                        <p class="card-text">Price: ${evento.place}</p>
                        <p class="card-text">Capacity: ${evento.capacity}</p>
                        <p class="card-text">Assistance: ${evento.assistance}</p>
                    </div>
                </div>
            </div>
        </div>
`;

console.log("id: ", id);