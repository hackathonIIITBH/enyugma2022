var imgUpd = document.querySelector("#img-upd");
var imgShow = document.querySelector("#img-show");
var register = document.querySelector(".Register");
var overlays1 = document.querySelector(".overlays1");
var overlays2 = document.querySelector(".overlays2");

const url = "https://enyugma.herokuapp.com";
// var url = "http://localhost:2100";


function logout() {
  localStorage.removeItem("userToken");
  window.location.href = `../auth/login.html`;
}

if (localStorage.getItem("userToken")) {
  fetch(`${url}/userDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth_token: `${localStorage.getItem("userToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.status == 0) {
        displayDetails(data.data);
        document.title = `${data.data.name} | Enyugma Portal`;
      } else {
        stats.style.backgroundColor = "#ff0000bb";
        stats.style.border = "2px solid #de1111";
        stats.style.display = "flex";
        stats.innerHTML = "Something Went Wrong!!";
        localStorage.removeItem('userToken')
        window.location.href = "../auth/login.html";
      }
    })
    .catch((err) => {
      stats.style.backgroundColor = "#ff0000bb";
      stats.style.border = "2px solid #de1111";
      stats.style.display = "flex";
      stats.innerHTML = err;
    });
} else {
  window.location.href = "../auth/login.html";
}

imgUpd.addEventListener("change", (e) => {
  imgShow.src = URL.createObjectURL(e.target.files[0]);
});

imgShow.addEventListener("load", () => {
  URL.revokeObjectURL(imgShow.src);
});

// register.addEventListener("click", () => {
//   overlays.style.display = "flex";
//   window.location.href = "#";
//   document.body.style.overflow = "hidden";
// });

document.forms["upd-img"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/profileImg`, {
    method: "POST",
    body: new FormData(e.target),
    headers: {
      auth_token: `${localStorage.getItem("userToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        stats.style.backgroundColor = "#46d381bb";
        stats.style.border = "2px solid #2ecc71";
        stats.style.display = "flex";
        stats.innerHTML = "Image Uploaded Successfully";
        overlays2.style.display = "none";
        window.location.reload();
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
});

var userName = document.querySelectorAll("#user-name");
var userAppno = document.querySelector("#user-appno");
var userEmail = document.querySelector("#user-email");
var userAddress = document.querySelector("#user-address");
var userEvents = document.querySelector("#user-events");
var userPic = document.querySelector("#user-pic");
var userevent = document.querySelector("#user-events");
var stats = document.querySelector(".status");

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

const displayDetails = (data) => {
  for (let i = 0; i < userName.length; i++) {
    userName[i].innerHTML = data.name;
  }
  userAppno.innerHTML = data.appno;
  userEmail.innerHTML = data.email;
  userAddress.innerHTML = data.address;
  // var img = arrayBufferToBase64(data.pImg[0].data);
  // console.log(data.pImg);
  // userPic.src = `data:image/png;base64,${img.toString("base64")}`;
  // let html = "";
  // for (let i = 0; i < data.events.length; i++) {
  //   html += `${data.events[i]}, `;
  // }
  // userEvents.innerHTML = html;

  // console.log(data.profile);

  if (data.profile == 1) {
    overlays1.style.display = "none";
    document.getElementById('dobshow').innerHTML = data.dob;
    document.getElementById('courseshow').innerHTML = data.course
    document.getElementById('instshow').innerHTML = `${data.instName}, ${data.instAddr}`
    document.getElementById('stateshow').innerHTML = data.state
    let eventhtml = ``
    data.eventreg.forEach((e) => {
      eventhtml += `<a href="../eventDetail/eventabout.html?search=${e}" style="margin:2px 10px;">${e}</a>`
    })

    userEvents.innerHTML = eventhtml
  } else {
    overlays1.style.display = "flex";
  }

  if (data.profileImg == 1) {
    overlays2.style.display = "none";
    displayimg();
  } else {
    overlays2.style.display = "flex";
  }
};

const displayimg = () => {
  fetch(`${url}/userimg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth_token: `${localStorage.getItem("userToken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 0) {
        var img = arrayBufferToBase64(data.img[0].data);
        userPic.src = `data:image/png;base64,${img.toString("base64")}`;
      }
    })
    .catch()

}

setTimeout(() => {
  stats.style.display = "none";
  // window.location.reload();
}, 3000);

document.forms["data-upd"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/userUpdDetails`, {
    method: "POST",
    headers: {
      auth_token: `${localStorage.getItem("userToken")}`,
    },
    body: new URLSearchParams(new FormData(e.target)),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status == 0) {
        stats.style.backgroundColor = "#46d381bb";
        stats.style.border = "2px solid #2ecc71";
        stats.style.display = "flex";
        stats.innerHTML = "Profile Updated Successfully";
        overlays1.style.display = "none";
        window.location.reload();
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
});



// Events 

const technical = () => {
  let desc = [];
  fetch(`${url}/api/event/technical`)
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        // desc = res.event;
        // console.log(res);

        seteventtechnical(res.event);
      } else {
        window.location.href = "../index.html";
      }
    })
    .catch((err) => {
      window.location.href = "../index.html";
    });
};


technical();


function seteventtechnical(event) {
  let html = ``;
  event.forEach((e) => {
    html += `
    <a href="../eventDetail/eventabout.html?search=${e.eventname}">
        <div class="events">
          <div class="event-strips">
            <div class="event-name"><span id="event-name">${e.eventname}</span></div>
            
          </div>
        </div>
        </a>
        `
  })

  document.getElementById('eventshowtech').innerHTML = html;
}

const cultural = () => {
  let desc = [];
  fetch(`${url}/api/event/cultural`)
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        // desc = res.event;
        // console.log(res);

        seteventcultural(res.event);
      } else {
        window.location.href = "../index.html";
      }
    })
    .catch((err) => {
      window.location.href = "../index.html";
    });
};


cultural();


function seteventcultural(event) {
  let html = ``;
  event.forEach((e) => {
    html += `
    <a href="../eventDetail/eventabout.html?search=${e.eventname}">
        <div class="events">
          <div class="event-strips">
            <div class="event-name"><span id="event-name">${e.eventname}</span></div>
            
          </div>
        </div>
        </a>
        `
  })

  document.getElementById('eventshowcult').innerHTML = html;
}

const workshop = () => {
  let desc = [];
  fetch(`${url}/api/event/workshop`)
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        // desc = res.event;
        // console.log(res);

        seteventworkshop(res.event);
      } else {
        window.location.href = "../index.html";
      }
    })
    .catch((err) => {
      window.location.href = "../index.html";
    });
};


workshop();


function seteventworkshop(event) {
  let html = ``;
  event.forEach((e) => {
    html += `
    <a href="../eventDetail/eventabout.html?search=${e.eventname}">
        <div class="events">
          <div class="event-strips">
            <div class="event-name"><span id="event-name">${e.eventname}</span></div>
            
          </div>
        </div>
        </a>
        `
  })

  document.getElementById('eventshowworkshop').innerHTML = html;
}


// size 

const input = document.getElementById('img-upd')

input.addEventListener('change', (event) => {
  // alert("GET FILE")
  const target = event.target
  validateFileType(target);
  if (target.files && target.files[0]) {

    /*Maximum allowed size in bytes
      5MB Example
      Change first operand(multiplier) for your needs*/
    const maxAllowedSize = 100000;
    // alert(target.files[0].size);
    if (target.files[0].size > maxAllowedSize) {
      // Here you can ask your users to load correct file
      alert("File must be less than 100kb")
      target.value = ''
      imgShow.src = "../assets/images/default-user-image.png";
    }
  }
})

function validateFileType(target) {
  var fileName = input.value;
  var idxDot = fileName.lastIndexOf(".") + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //TO DO
  } else {
    alert("Only jpg/jpeg and png files are allowed!");
    target.value = ''
    imgShow.src = "../assets/images/default-user-image.png";
  }
}