const url = "https://enyugma.herokuapp.com";
// var url = "http://localhost:2100";

var stats = document.querySelector(".status");

setTimeout(() => {
  stats.style.display = "none";
}, 3000);

document.forms["ca-register"].onsubmit = (e) => {
  e.preventDefault();
  fetch(`${url}/caRegister`, {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        window.location.href = "#";
        stats.style.backgroundColor = "#46d381bb";
        stats.style.border = "2px solid #2ecc71";
        stats.style.display = "flex";
        stats.innerHTML = "Registeration Successful";
      } else {
        stats.style.backgroundColor = "#ff0000bb";
        stats.style.border = "2px solid #de1111";
        stats.style.display = "flex";
        stats.innerHTML = "Something Went Wrong!!";
      }
    })
    .catch((err) => {
      stats.style.backgroundColor = "#ff0000bb";
      stats.style.border = "2px solid #de1111";
      stats.style.display = "flex";
      stats.innerHTML = err;
    });
};
