const url = "https://enyugma.herokuapp.com";
// var url = "http://localhost:2100";

var userName = document.querySelector("#user-name");
var userDisp = document.querySelector(".response-table");

const displayDetails = (data) => {
  var html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<tr>
                <td class="sno" id="sno">${i + 1}</td>
                <td class="name" id="name">${data[i].name}</td>
                <td class="email" id="email">${data[i].email}</td>
                <td class="gender" id="gender">${data[i].gender}</td>
                <td class="cno" id="cno">${data[i].contact}</td>
                <td class="inst" id="inst">${data[i].inst}</td>
                <td class="prog" id="prog">${data[i].program}</td>
                <td class="gYear" id="gYear">${data[i].gdYear}</td>
                <td class="social" id="social"><a href="${
                  data[i].fb
                }"><i class="fa-brands fa-facebook"></i></a><a href="${
      data[i].insta
    }"><i class="fa-brands fa-instagram"></i></a><a href="${
      data[i].twitter
    }"><i class="fa-brands fa-twitter"></i></a><a href="${
      data[i].linkedin
    }"><i class="fa-brands fa-linkedin"></i></a><a href="${data[i].others}">${
      data[i].others
    }</a></td>
                <td class="q1" id="q1">${data[i].wCA}</td>
                <td class="q2" id="q2">${data[i].eCA}</td>
                <td class="query" id="query">${data[i].others}</td>
            </tr>`;
  }
  userDisp.innerHTML += html;
};

fetch(`${url}/caDetails`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    auth_token: `${localStorage.getItem("caToken")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.status == 0) {
      displayDetails(data.data);
      userName.innerHTML = data.user;
      document.title = `${data.user} | CA-Portal`;
      console.log(data.user);
    } else {
      localStorage.removeItem("caToken");
      window.location.href = "./ca-login.html";
    }
    console.log(data);
  })
  .catch((err) => {
    alert(err);
    localStorage.removeItem("caToken");
    window.location.href = "./ca-login.html";
  });
