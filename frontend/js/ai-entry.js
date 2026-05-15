// ==============================
// CAMERA ACCESS
// ==============================

const video =
document.getElementById(
  "video"
);

const canvas =
document.getElementById(
  "canvas"
);

const captureBtn =
document.getElementById(
  "captureBtn"
);

const resultDiv =
document.getElementById(
  "result"
);

// START CAMERA
navigator.mediaDevices
.getUserMedia({
  video: true
})
.then((stream)=>{

  video.srcObject = stream;

})
.catch((err)=>{

  console.log(err);

  alert(
    "Camera access denied"
  );
});

// ==============================
// VERIFY FACE
// ==============================

captureBtn.addEventListener(
  "click",
  async ()=>{

    const context =
    canvas.getContext("2d");

    canvas.width =
    video.videoWidth;

    canvas.height =
    video.videoHeight;

    // CAPTURE FRAME
    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // IMAGE DATA
    canvas.toBlob(
      async (blob)=>{

        const formData =
        new FormData();

        formData.append(
          "image",
          blob,
          "capture.jpg"
        );

        try {

          resultDiv.innerHTML =
          "Verifying Face...";

          const response =
          await fetch(
            "http://localhost:5002/verify-face",
            {

              method: "POST",

              body: formData
            }
          );

          const data =
          await response.json();

          // RESULT
          if(data.success){

            resultDiv.innerHTML =
            "✅ Access Granted";

            resultDiv.style.color =
            "lime";

          }else{

            resultDiv.innerHTML =
            "❌ Access Denied";

            resultDiv.style.color =
            "red";
          }

        } catch (error) {

          console.log(error);

          resultDiv.innerHTML =
          "Server Error";
        }

      },
      "image/jpeg"
    );

  }
);