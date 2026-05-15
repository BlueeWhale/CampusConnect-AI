// ====================================
// BACKEND API URL
// ====================================

const API_URL =
"http://localhost:5000/api/auth";

// ====================================
// SIGNUP SYSTEM
// ====================================

const signupForm =
document.getElementById(
  "signupForm"
);

if(signupForm){

  signupForm.addEventListener(
    "submit",
    async (e)=>{

      e.preventDefault();

      const name =
      signupForm.querySelector(
        'input[type="text"]'
      ).value;

      const email =
      signupForm.querySelector(
        'input[type="email"]'
      ).value;

      const password =
      signupForm.querySelector(
        'input[type="password"]'
      ).value;

      const role =
      signupForm.querySelector(
        "select"
      ).value;

      try {

        const response =
        await fetch(
          `${API_URL}/register`,
          {

            method: "POST",

            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({

              name,
              email,
              password,
              role

            })

          }
        );

        const data =
        await response.json();

        if(data.success){

          alert(
            "Signup Successful 🚀"
          );

          window.location.href =
          "login.html";

        }else{

          alert(
            data.message
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Server Error"
        );
      }

    }
  );
}

// ====================================
// LOGIN SYSTEM
// ====================================

const loginForm =
document.getElementById(
  "loginForm"
);

if(loginForm){

  loginForm.addEventListener(
    "submit",
    async (e)=>{

      e.preventDefault();

      const email =
      loginForm.querySelector(
        'input[type="email"]'
      ).value;

      const password =
      loginForm.querySelector(
        'input[type="password"]'
      ).value;

      try {

        const response =
        await fetch(
          `${API_URL}/login`,
          {

            method: "POST",

            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({

              email,
              password

            })

          }
        );

        const data =
        await response.json();

        // SUCCESS
        if(data.success){

          // SAVE TOKEN
          localStorage.setItem(
            "token",
            data.token
          );

          // SAVE USER
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          alert(
            "Login Successful ✅"
          );

          // ROLE BASED REDIRECT
          if(
            data.user.role ===
            "student"
          ){

            window.location.href =
            "student-dashboard.html";
          }

          else if(
            data.user.role ===
            "organizer"
          ){

            window.location.href =
            "organizer-dashboard.html";
          }

          else if(
            data.user.role ===
            "stall"
          ){

            window.location.href =
            "stall-dashboard.html";
          }

        }else{

          alert(
            data.message
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Server Error"
        );
      }

    }
  );
}

