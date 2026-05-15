// =====================================
// LOAD EVENT DETAILS
// =====================================

async function loadEventDetails(){

  const eventId =
  localStorage.getItem(
    "selectedEvent"
  );

  if(!eventId) return;

  try {

    const response =
    await fetch(
      "http://localhost:5000/api/events/all"
    );

    const data =
    await response.json();

    // FIND EVENT
    const event =
    data.events.find(
      (e)=> e._id === eventId
    );

    if(event){

      document.getElementById(
        "eventTitle"
      ).innerText =
      event.title;

      document.getElementById(
        "eventDate"
      ).innerText =
      "📅 " + event.date;

      document.getElementById(
        "eventLocation"
      ).innerText =
      "📍 " + event.location;

      document.getElementById(
        "eventDescription"
      ).innerText =
      event.description;

      document.getElementById(
        "eventPrice"
      ).innerText =
      "₹" + event.price;

      document.getElementById(
        "eventImage"
      ).src =
      event.image;
    }

  } catch (error) {

    console.log(error);
  }
}

// LOAD EVENT
loadEventDetails();

// =====================================
// BUY TICKET
// =====================================

const buyTicketBtn =
document.getElementById(
  "buyTicketBtn"
);

if(buyTicketBtn){

  buyTicketBtn.addEventListener(
    "click",
    ()=>{

      alert(
        "Ticket Purchased 🎫"
      );

      window.location.href =
      "qr-ticket.html";
    }
  );
}

const downloadBtn =
document.getElementById("downloadBtn");

if(downloadBtn){

  downloadBtn.addEventListener(
    "click",
    ()=>{

      const ticket =
        document.querySelector(
          ".ticket-card"
        );

      html2canvas(ticket).then(canvas => {

        const link =
          document.createElement("a");

        link.download =
          "CampusConnect_Ticket.png";

        link.href =
          canvas.toDataURL("image/png");

        link.click();

      });

    }
  );

}