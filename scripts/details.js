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

    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const evento = data.events.find(i => i._id == id);

    const detailsCard = document.getElementById("details-card");

    detailsCard.innerHTML += `
        <div class="card card-details col-lg-12">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${evento.image}" class="img-fluid details-card-img" alt="${evento.name}">
                </div>
                <div class="col-md-6">
                    <div class="card-body card-body-details">
                        <h2 class="card-title">${evento.name}</h2>
                        <p class="card-text">${evento.description}</p>
                        <p class="card-text"><strong>Place:</strong> ${evento.place}</p>
                        <p class="card-text"><strong>Date:</strong> ${evento.date}</p>
                        <p class="card-text"><strong>Price:</strong> $${evento.price}</p>
                        <p class="card-text"><strong>Capacity:</strong> ${evento.capacity}</p>
                        <p class="card-text"><strong>${typeof evento.assistance === "number" ? 'Attendance:':'Estimated attendance:'}</strong> ${evento.assistance ?? evento.estimate}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

callAPI();