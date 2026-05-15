// ===============================
// SOCKET CONNECTION
// ===============================

const socket =
io("http://localhost:5000");

// CONNECTED
socket.on(
  "connect",
  ()=>{

    console.log(
      "Realtime Connected 🚀"
    );
  }
);

// =================================
// FOOD ORDER NOTIFICATION
// =================================

socket.on(
  "foodOrderNotification",
  (data)=>{

    showNotification(
      data.message
    );
  }
);

// =================================
// EVENT NOTIFICATION
// =================================

socket.on(
  "eventNotification",
  (data)=>{

    showNotification(
      data.message
    );
  }
);

// =================================
// NOTIFICATION UI
// =================================

function showNotification(message){

  const notification =
  document.createElement("div");

  notification.classList.add(
    "live-notification"
  );

  notification.innerText =
  message;

  document.body.appendChild(
    notification
  );

  // REMOVE AFTER 4 SEC
  setTimeout(()=>{

    notification.remove();

  }, 4000);
}

// =================================
// SEND DEMO ORDER
// =================================

const sendOrderBtn =
document.getElementById(
  "sendOrderBtn"
);

if(sendOrderBtn){

  sendOrderBtn.addEventListener(
    "click",
    ()=>{

      socket.emit(
        "newFoodOrder",
        {

          item:
          "Burger Combo",

          user:
          "Student"
        }
      );
    }
  );
}

// =====================================
// PREPARE ORDER
// =====================================

function prepareOrder(item){

  socket.emit(
    "orderPreparing",
    {
      item
    }
  );

  showNotification(
    `${item} is being prepared 🍳`
  );
}

// =====================================
// READY ORDER
// =====================================

function readyOrder(item){

  socket.emit(
    "orderReady",
    {
      item
    }
  );

  showNotification(
    `${item} is ready 🚀`
  );
}

// =====================================
// RECEIVE PREPARING STATUS
// =====================================

socket.on(
  "orderPreparingNotification",
  (data)=>{

    showNotification(

      `${data.item} is being prepared 🍳`

    );
  }
);

// =====================================
// RECEIVE READY STATUS
// =====================================

socket.on(
  "orderReadyNotification",
  (data)=>{

    showNotification(

      `${data.item} is ready 🚀 Please collect your order`

    );
  }
);