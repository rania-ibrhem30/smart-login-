var baseURL = "";

onload = () => {
  if (JSON.parse(localStorage.getItem("login")) == true) {
    if (window.location.pathname != "/home.html") {
      location.replace(baseURL + "/home.html");
    }
  }
};

//***************** login in  **************//
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var testBtn = document.querySelector(".btn-Login");
var alert = document.getElementById("alert");
try {
  testBtn.addEventListener("click", () => {
    if (loginEmail.value == "" || loginPassword.value == "") {
      alert.style.display = "block";
    } else {
      var users = JSON.parse(localStorage.getItem("users"));
      if (users) {
        var usercheck = users.filter((user) => {
          if (user.email == loginEmail.value) {
            if (user.password == loginPassword.value) {
              return user;
            }
          }
        });
        if (usercheck) {
          //alert.style.display = "none";
          localStorage.setItem("login", true);
          location.replace(baseURL + "/home.html");
          localStorage.setItem("user", JSON.stringify(usercheck[0]));
        } else {
          console.log("error");
        }
      }
    }
  });
} catch (e) {}

/**************** sign in **************/ //

var singinName = document.getElementById("singinName");
var singinPassword = document.getElementById("singinPassword");
var singEmail = document.getElementById("singEmail");
var myBtnS = document.querySelector(".btn-sign");
var alerts = document.getElementById("alert-2");
var users = [];
var emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var usersLocal = localStorage.getItem("users");
usersLocal ? (users = JSON.parse(usersLocal)) : users;
var user;
try {
  myBtnS.addEventListener("click", () => {
    if (
      singinName.value == "" ||
      singinPassword.value == "" ||
      singEmail.value == ""
    ) {
      alerts.style.display = "block";
    } else {
      if (emailRegx.test(singEmail.value)) {
        if (usersLocal) {
          var usercheck = JSON.parse(usersLocal).filter((user) => {
            if (user.email == singEmail.value) {
              return user;
            }
          });
          if (usercheck.length > 0) {
            console.log("هذا الحساب موجود من قبل");
          } else {
            alerts.style.display = "none";
            location.replace(baseURL + "/home.html");
            user = {
              username: singinName.value,
              password: singinPassword.value,
              email: singEmail.value,
            };
            localStorage.setItem("user", JSON.stringify(user));
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("login", true);
          }
        } else {
          alerts.style.display = "none";
          location.replace(baseURL + "/home.html");
          user = {
            username: singinName.value,
            password: singinPassword.value,
            email: singEmail.value,
          };
          localStorage.setItem("user", JSON.stringify(user));
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("login", true);
        }
      } else {
        console.log("يرجي التحقق من البريد الالكتروني");
      }
    }
  });
} catch (e) {}

/* Logout */
