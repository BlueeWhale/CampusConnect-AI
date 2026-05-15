const cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

const container =
  document.getElementById("cartItems");

let total = 0;

cart.forEach(item => {

  total += item.price * item.qty;

  container.innerHTML += `

    <div class="event-card">

      <img src="${item.image}" />

      <h3>${item.name}</h3>

      <p>
        ₹${item.price}
      </p>

      <p>
        Qty: ${item.qty}
      </p>

    </div>

  `;
});

document.getElementById(
  "totalPrice"
).innerText = `Total: ₹${total}`;

// ==========================
// CHECKOUT
// ==========================
async function checkout(){

  try {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    if(cart.length === 0){

      alert("Cart Empty 🛒");

      return;
    }

    let total = 0;

    cart.forEach(item => {

      total +=
        item.price * item.qty;

    });

    const res = await fetch(

      "http://localhost:5000/api/orders/create",

      {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          items: cart,

          total

        })

      }

    );

    const data =
      await res.json();

    if(data.success){

      localStorage.setItem(

        "currentOrderId",

        data.order._id

      );

      localStorage.removeItem(
        "cart"
      );

      alert(
        "Order Placed 🎉"
      );

      window.location.href =
        "food.html";
    }

  } catch(err){

    console.log(err);

  }

}