async function loadFoods(){

  try {

    const res = await fetch("http://localhost:5000/api/food/all");

    const data = await res.json();

    console.log("FOODS DATA:", data);

    const container = document.getElementById("foodContainer");

    if(!container){
      console.log("foodContainer NOT FOUND");
      return;
    }

    container.innerHTML = "";

    const foods = data.foods || [];

    foods.forEach(food => {

      container.innerHTML += `

        <div class="event-card">

          <img src="${food.image}" />

          <div class="card-content">

            <h3>${food.name}</h3>
            <p>₹${food.price}</p>

            <div class="qty-box">

  <button onclick="decreaseQty('${food._id}')">
    -
  </button>

  <span id="qty-${food._id}">
    1
  </span>

  <button onclick="increaseQty('${food._id}')">
    +
  </button>

</div>

<button
  onclick="
    addToCart(
      '${food._id}',
      '${food.name}',
      ${food.price},
      '${food.image}'
    )
  "
>
  Add To Cart 🛒
</button>



          </div>

        </div>

      `;
    });

  } catch(err){
    console.log("FOOD LOAD ERROR:", err);
  }
}

loadFoods();

const quantities = {};

// ==========================
// INCREASE QTY
// ==========================
function increaseQty(id){

  if(!quantities[id]){
    quantities[id] = 1;
  }

  quantities[id]++;

  document.getElementById(
    `qty-${id}`
  ).innerText = quantities[id];
}

// ==========================
// DECREASE QTY
// ==========================
function decreaseQty(id){

  if(!quantities[id]){
    quantities[id] = 1;
  }

  if(quantities[id] > 1){
    quantities[id]--;
  }

  document.getElementById(
    `qty-${id}`
  ).innerText = quantities[id];
}

// ==========================
// ADD TO CART
// ==========================

function addToCart(
  id,
  name,
  price,
  image
){

  const qty =
    quantities[id] || 1;

  let cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  // CHECK EXISTING ITEM
  const existingItem =
    cart.find(item => item.id === id);

  if(existingItem){

    existingItem.qty += qty;

  } else {

    cart.push({

      id,
      name,
      price,
      image,
      qty

    });

  }

  localStorage.setItem(

    "cart",

    JSON.stringify(cart)

  );

  alert("Added To Cart 🛒");

}

// ==========================
// LOAD ORDER STATUS
// ==========================

async function loadOrderStatus(){

  // GET ORDER ID
  const orderId =
    localStorage.getItem(
      "currentOrderId"
    );

  if(!orderId){

  const box =
    document.getElementById(
      "orderStatus"
    );

  if(box){

    box.innerHTML = `

      <p>
        No Active Orders 🍔
      </p>

    `;
  }

  return;
}

  try {

    const res = await fetch(

      `http://localhost:5000/api/orders/${orderId}`

    );

    const data = await res.json();

    const box =
      document.getElementById(
        "orderStatus"
      );

    if(!box) return;

    // =========================
    // ITEMS HTML
    // =========================

    let itemsHTML = "";

    data.items.forEach(item => {

      itemsHTML += `

        <div class="status-item">

          <img
            src="${item.image}"
            style="
              width:60px;
              height:60px;
              object-fit:cover;
              border-radius:10px;
            "
          >

          <div>

            <h4>
              ${item.name}
            </h4>

            <p>
              Qty: ${item.qty}
            </p>

          </div>

        </div>

      `;
    });

    // =========================
    // STATUS MESSAGE
    // =========================

    let statusMessage =
      "⏳ Order Pending";

    let statusClass =
      "pending";

    if(data.status === "Preparing"){

      statusMessage =
        "🍳 Your food is being prepared";

      statusClass =
        "preparing";
    }

    if(data.status === "Ready"){

      statusMessage =
        "✅ Your food is ready! Please collect it.";

      statusClass =
        "ready";
    }

    // =========================
    // FINAL HTML
    // =========================

    box.innerHTML = `

      <h3>
        Your Order 🍔
      </h3>

      <div class="status-items">

        ${itemsHTML}

      </div>

      <h4>
        Total: ₹${data.total}
      </h4>

      <p class="live-status ${statusClass}">

        ${statusMessage}

      </p>

    `;

  } catch(err){

    console.log(
      "STATUS ERROR:",
      err
    );

  }

}

// AUTO LOAD
loadOrderStatus();

// AUTO REFRESH
setInterval(loadOrderStatus, 3000);