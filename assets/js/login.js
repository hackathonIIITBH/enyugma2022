const form = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const url = "https://enyugma.herokuapp.com";
// const url = "http://localhost:2100"
console.log("Running!!!!");

function showError(input, message) {
  // a function that will be called whenever an error is to be printed
  const parent = input.parentElement; // in small
  parent.classList.add("error");
  parent.classList.remove("success");
  const small = parent.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  // a function that will be called whenever an input is successful
  const parent = input.parentElement;
  parent.classList.remove("error");
  parent.classList.add("success");
}

function checkEmail(input) {
  // using regex to check email
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Invalid Email");
  }
}

function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  // used to get Field name in Captial Case.
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function (e) {
  // adding eventListener to form submit
  e.preventDefault(); // prevents the form from submitting
  checkRequired([email, password]);
  checkEmail(email);
});

//Astronaut JS
// $.fn.multiply = function (numCopies) {
//   var newElements = this.clone();
//   for (var i = 1; i < numCopies; i++) {
//     newElements = newElements.add(this.clone());
//   }
//   return newElements;
// };

// $(".star").multiply(80).insertAfter(".star");

// $(".star").each(function () {
//   var top = Math.random() * 100 + "%";
//   var left = Math.random() * 100 + "%";

//   $(this).css({
//     top: top,
//     left: left,
//   });
// });

var stats = document.querySelector(".status");

setTimeout(() => {
  stats.style.display = "none";
}, 3000);

document.forms["login"].onsubmit = (e) => {
  e.preventDefault();
  fetch(`${url}/login`, {
    method: "post",
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        localStorage.setItem("userToken", `${data.auth_token}`);
        window.location.href = "../user/dashboard.html";
      } else {
        stats.style.backgroundColor = "#ff0000bb";
        stats.style.border = "2px solid #de1111";
        stats.style.display = "flex";
        stats.innerHTML = "Invalid Details";
      }
    })
    .catch((err) => {
      stats.style.backgroundColor = "#ff0000bb";
      stats.style.border = "2px solid #de1111";
      stats.style.display = "flex";
      stats.innerHTML = err;
    });
};
