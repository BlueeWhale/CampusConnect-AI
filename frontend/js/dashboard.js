// =====================================
// CREATE EVENT API
// =====================================

const eventCreateBtn =
document.querySelector(
  ".create-event-box button"
);

if(eventCreateBtn){

  eventCreateBtn.addEventListener(
    "click",
    async ()=>{

      const inputs =
      document.querySelectorAll(
        ".create-event-box input"
      );

      const textarea =
      document.querySelector(
        ".create-event-box textarea"
      );

      const title =
      inputs[0].value;

      const date =
      inputs[1].value;

      const location =
      inputs[2].value;

      const image =
      inputs[3].files[0];

      const description =
      textarea.value;

      const formData =
      new FormData();

      formData.append("title", title);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("price", 499);
      formData.append("image", image);

      try {

        const response =
        await fetch(
          "http://localhost:5000/api/events/create",
          {
            method: "POST",
            body: formData
          }
        );

        const data =
        await response.json();

        if(data.success){

          alert(
            "Event Created 🚀"
          );

          loadEvents();
        }

      } catch (error) {

        console.log(error);
      }

    }
  );
}

// =====================================
// LOAD EVENTS
// =====================================

async function loadEvents(){

  try {

    const response =
    await fetch(
      "http://localhost:5000/api/events/all"
    );

    const data =
    await response.json();

    const cards =
    document.querySelector(
      ".cards"
    );

    if(cards){

      cards.innerHTML = "";

      data.events.forEach(
        (event)=>{

          cards.innerHTML += `

          <div class="event-card">

            <img src="${event.image}">

            <div class="card-content">

              <h3>
                ${event.title}
              </h3>

              <p>
                ${event.location}
              </p>

              <button
                onclick="viewEvent('${event._id}')"
              >
                View Event
              </button>

            </div>

          </div>

          `;
        }
      );
    }

  } catch (error) {

    console.log(error);
  }
}

loadEvents();

// =====================================
// CREATE FOOD ITEM
// =====================================

const addFoodBtn =
document.getElementById(
  "addFoodBtn"
);

if(addFoodBtn){

  addFoodBtn.addEventListener(
    "click",
    async ()=>{

      const inputs =
      document.querySelectorAll(
        ".create-event-box input"
      );

      const textarea =
      document.querySelector(
        ".create-event-box textarea"
      );

      const name =
      inputs[0].value;

      const price =
      inputs[1].value;

      const description =
      textarea.value;

      const image =
      document.getElementById(
        "foodImageInput"
      ).files[0];

      const formData =
      new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      try {

        const response =
        await fetch(
          "http://localhost:5000/api/food/create",
          {
            method: "POST",
            body: formData
          }
        );

        const data =
        await response.json();

        if(data.success){

          alert(
            "Food Added 🍔"
          );

        }

      } catch (error) {

        console.log(error);
      }

    }
  );
}

// =====================================
// LOAD LIVE ORDERS
// =====================================

async function loadOrders(){

  try {

    const res = await fetch(
      "http://localhost:5000/api/orders/all"
    );

    const data = await res.json();

    const ordersBox =
      document.querySelector(".food-orders");

    if(!ordersBox) return;

    ordersBox.innerHTML = "";

    data.orders.forEach(order => {

      // =========================
      // ITEMS HTML
      // =========================

      let itemsHTML = "";

      const items = order.items || [];

      items.forEach(item => {

        itemsHTML += `

          <div class="ordered-item">

            <img
              src="${item.image}"
              style="
                width:70px;
                height:70px;
                object-fit:cover;
                border-radius:10px;
                margin-bottom:10px;
              "
            >

            <h4>
              ${item.name}
            </h4>

            <p>
              Qty: x${item.qty}
            </p>

            <p>
              ₹${item.price}
            </p>

          </div>

        `;
      });

      // =========================
      // STATUS
      // =========================

      let statusText = "⏳ Pending";
      let statusClass = "pending";

      if(order.status === "Preparing"){

        statusText = "🍳 Preparing";
        statusClass = "preparing";
      }

      if(order.status === "Ready"){

        statusText = "✅ Ready";
        statusClass = "ready";
      }

      // =========================
      // FINAL ORDER CARD
      // =========================

      ordersBox.innerHTML += `

        <div class="food-card">

          <h3>
            Order #${order._id.slice(-5)}
          </h3>

          <div class="ordered-items">

            ${itemsHTML}

          </div>

          <h4>
            Total: ₹${order.total}
          </h4>

          <p class="status ${statusClass}">

            ${statusText}

          </p>

          <div class="order-actions">

            <button
              class="prepare-btn"
              onclick="
                updateStatus(
                  '${order._id}',
                  'Preparing'
                )
              "
            >
              Preparing 🍳
            </button>

            <button
              class="ready-btn"
              onclick="
                updateStatus(
                  '${order._id}',
                  'Ready'
                )
              "
            >
              Ready ✅
            </button>

          </div>

        </div>

      `;
    });

  } catch(err){

    console.log(
      "LOAD ORDER ERROR:",
      err
    );

  }

}

// AUTO LOAD
loadOrders();

// AUTO REFRESH
setInterval(loadOrders, 3000);

// =====================================
// UPDATE STATUS
// =====================================

async function updateStatus(id, status){

  try {

    const res = await fetch(

      `http://localhost:5000/api/orders/update/${id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          status
        })
      }

    );

    const data = await res.json();

    if(data.success){

      alert(`Order ${status} ✅`);

      loadOrders();

    }

  } catch(err){
    console.log(err);
  }

}

window.updateStatus = updateStatus;

// =====================================
// VIEW EVENT DETAILS
// =====================================

function viewEvent(eventId){

  localStorage.setItem(
    "selectedEvent",
    eventId
  );

  window.location.href =
  "event-detail.html";
}

// =====================================
// IMAGE PREVIEW
// =====================================

const foodImageInput =
document.getElementById(
  "foodImageInput"
);

const foodPreviewImage =
document.getElementById(
  "foodPreviewImage"
);

if(foodImageInput){

  foodImageInput.addEventListener(
    "change",
    ()=>{

      const file =
      foodImageInput.files[0];

      if(file){

        foodPreviewImage.src =
        URL.createObjectURL(file);

        foodPreviewImage.style.display =
        "block";
      }

    }
  );
}

async function loadStudentProfile(){

  try {

    const userId =
      localStorage.getItem(
        "userId"
      );

    if(!userId) return;

    const res = await fetch(

      `http://localhost:5000/api/users/${userId}`

    );

    const data = await res.json();

    if(data.success){

      document.getElementById(
        "studentName"
      ).innerText =
        data.user.name;

      document.getElementById(
        "studentId"
      ).innerText =
        "User ID: " +
        data.user._id.slice(-6);

      document.getElementById(
        "studentImage"
      ).src =
        data.user.image;

    }

  } catch(err){

    console.log(err);

  }

}

loadStudentProfile();