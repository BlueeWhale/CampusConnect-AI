async function loadEvents(){

  try{

    const res =
    await fetch("http://localhost:5000/api/events/all");

    const data = await res.json();

    const container =
    document.getElementById("eventsContainer");

    container.innerHTML = "";

    data.events.forEach(event => {

      container.innerHTML += `

        <div class="event-card">

          <img src="${event.image}" />

          <div class="card-content">

            <h3>${event.title}</h3>

            <p>${event.location}</p>

            <button onclick="viewEvent('${event._id}')">
              View Details
            </button>

          </div>

        </div>

      `;
    });

  }catch(err){
    console.log(err);
  }
}

function viewEvent(id){
  localStorage.setItem("selectedEvent", id);
  window.location.href = "event-detail.html";
}

loadEvents();