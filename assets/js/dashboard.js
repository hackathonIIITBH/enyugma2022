var imgUpd = document.querySelector("#img-upd");
var imgShow = document.querySelector("#img-show");
var register = document.querySelector(".Register");
var overlays = document.querySelector(".overlays");

function openForm1() {
  document.getElementById("myOverlay1").style.display = "block";
}
function closeForm1() {
  document.getElementById("myOverlay1").style.display = "none";
}

imgUpd.addEventListener("change", (e) => {
  imgShow.src = URL.createObjectURL(e.target.files[0]);
});

imgShow.addEventListener("load", () => {
  URL.revokeObjectURL(imgShow.src);
});

register.addEventListener("click", () => {
  overlays.style.display = "flex";
  window.location.href = "#";
  document.body.style.overflow = "hidden";
});

document.forms["upd-img"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/profileImg`, {
    method: "POST",
    body: new FormData(e.target),
    headers: {
      "content-type": "application/json",
      "auth_token": `${localStorage.getItem(userToken)}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("Image Uploaded Sucessfully");
      }
    });
});
