const url = `https://enyugma.herokuapp.com`;
// var url = "http://localhost:2100";
// /api/event/getevent

let data = {};
let eventname = document.getElementById("eventname");
let headname = document.getElementById("headname");
let contact = document.getElementById("contact");

const changeDesctoEdit = () => {
  document.getElementById("formDesc").style.display = "block";
  document.getElementById("paragraphDesc").style.display = "none";
  document.getElementById("editDesc").style.display = "none";
  document.getElementById("cancelDesc").style.display = "block";
};

const changeDesctoNormal = () => {
  document.getElementById("formDesc").style.display = "none";
  document.getElementById("paragraphDesc").style.display = "block";
  document.getElementById("editDesc").style.display = "block";
  document.getElementById("cancelDesc").style.display = "none";
};

const userdata = () => {
  fetch(`${url}/api/manager/manageraccess`, {
    method: "POST",
    headers: {
      auth_token: `${localStorage.getItem(`managertoken`)}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        data = res.newdata;
        setvalues();
      } else {
        localStorage.removeItem("managertoken");
        window.location.href = "./mlogin.html";
      }
    })
    .catch(() => {
      alert("unable to fetch");
    });
};

userdata();

function logout() {
  localStorage.removeItem("managertoken");
  window.location.href = "./mlogin.html";
}

const setvalues = () => {
  eventname.innerHTML = `<h1>${data.eventname}</h1>`;
  headname.innerHTML = `<h1>${data.name}</h1> <button onclick='logout()'> Logout</button>`;
  contact.innerHTML = `<h2>${data.email}</h2> <h2>${data.phone}</h2>`;
  getevent();
};

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

const getevent = async () => {
  let post = 0;
  await fetch(`${url}/api/event/getevent`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      eventname: data.eventname,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        post = res.event.post;
        eventshow(res.event);
      } else {
        localStorage.removeItem("managertoken");
        window.location.href = "./mlogin.html";
      }
    })
    .catch(() => {
      alert("unable to fetch");
    });

  if (post === 1) {
    imgbuffer = await getimage(data.eventname);
    img = arrayBufferToBase64(imgbuffer);
    document.getElementById(
      "post-img"
    ).src = `data:image/png;base64,${img.toString("base64")}`;
  }
};


async function getimage(ename) {
  let dataimg = -1;
  await fetch(`${url}/api/event/img/${ename}`)
    .then((res) => res.json())
    .then((data) => {
      // imgurl = arrayBufferToBase64(data.postImg[0].data);
      if (data.status == 0) {
        dataimg = data.postImg[0].data
      }
    });
  return dataimg;
}


function eventshow(event) {
  document.getElementById("paragraphDesc").innerHTML = event.desc;
  document.getElementById("descTextarea").value = event.desc;
  document.getElementById("platform").value = event.platform;
  document.getElementById("date").value = event.date;
  document.getElementById("type").value = event.type;
  document.getElementById("fees").value = event.fees;
  document.getElementById("link").value = event.unstoplink;

  document.getElementById("pplatform").innerHTML = event.platform;
  document.getElementById("pdate").innerHTML = event.date;
  document.getElementById("ptype").innerHTML = event.type;
  document.getElementById("pfees").innerHTML = event.fees;
  document.getElementById("plink").innerHTML = event.unstoplink;

  document.getElementById("judgingTextarea").value = event.judging;
  document.getElementById("paragraphjudging").innerHTML = event.judging;

  document.getElementById("rulesTextarea").value = event.rule;
  document.getElementById("paragraphrules").innerHTML = event.rule;
  
  // document.getElementById(
  //   "post-img"
  // ).src = `data:image/png;base64,${arrayBufferToBase64(
  //   postImg[0].data
  // ).toString("base64")}`;


  for (const i in event.prize) {
    document.getElementById(`pprize${event.prize[i].no}`).innerHTML =
      event.prize[i].prize;
    document.getElementById(`prize${event.prize[i].no}`).value =
      event.prize[i].prize;
  }
}

// Update Description

document
  .getElementById("updateDescriptionForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    // data = new URLSearchParams(new FormData(e.target));
    var desc = document.getElementById("descTextarea").value;
    var password = document.getElementById("DescPasswrod").value;
    if (desc.length === 0) {
      return;
    }

    fetch(`${url}/api/event/desc`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        auth_token: `${localStorage.getItem("managertoken")}`,
      },
      body: JSON.stringify({
        eventname: data.eventname,
        desc: desc,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 0) {
          getevent();
          changeDesctoNormal();
        } else {
          alert("unable to update");
        }
      })
      .catch(() => {
        alert("unable to update");
      });
  });

// details

const editdetail = () => {
  document.getElementById("changeplatform").style.display = "block";
  document.getElementById("pplatform").style.display = "none";

  document.getElementById("changedate").style.display = "block";
  document.getElementById("pdate").style.display = "none";

  document.getElementById("changetype").style.display = "block";
  document.getElementById("ptype").style.display = "none";

  document.getElementById("changefees").style.display = "block";
  document.getElementById("pfees").style.display = "none";

  document.getElementById("changelink").style.display = "block";
  document.getElementById("plink").style.display = "none";

  document.getElementById("detailpassword").style.display = "block";

  document.getElementById("editdetail").style.display = "none";
  document.getElementById("canceldetail").style.display = "block";
  document.getElementById("updatedetail").style.display = "block";
};

const canceldetail = () => {
  document.getElementById("changeplatform").style.display = "none";
  document.getElementById("pplatform").style.display = "block";

  document.getElementById("changedate").style.display = "none";
  document.getElementById("pdate").style.display = "block";

  document.getElementById("changetype").style.display = "none";
  document.getElementById("ptype").style.display = "block";

  document.getElementById("changefees").style.display = "none";
  document.getElementById("pfees").style.display = "block";

  document.getElementById("changelink").style.display = "none";
  document.getElementById("plink").style.display = "block";

  document.getElementById("detailpassword").style.display = "none";

  document.getElementById("editdetail").style.display = "block";
  document.getElementById("canceldetail").style.display = "none";
  document.getElementById("updatedetail").style.display = "none";
};

const updateDetail = () => {
  let platform = document.getElementById("platform").value;
  let date = document.getElementById("date").value;
  let type = document.getElementById("type").value;
  let fees = document.getElementById("fees").value;
  let password = document.getElementById("detailpassword").value;
  let link = document.getElementById("link").value;

  if (
    platform.length == 0 ||
    date.length == 0 ||
    type.length == 0 ||
    fees.length == 0 ||
    link.length == 0
    ) {
      return;
    }
    
  var sendData = {
    eventname: data.eventname,
    platform: platform,
    date: date,
    type: type,
    fees: fees,
    password: password,
    unstoplink: link
  };


  fetch(`${url}/api/event/details`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      auth_token: `${localStorage.getItem("managertoken")}`,
    },
    body: JSON.stringify(sendData),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        getevent();
        canceldetail();
      } else {
        alert("unable to update");
      }
    })
    .catch(() => {
      alert("unable to update");
    });
};

// Judging Criterea

const changejudgingtoEdit = () => {
  document.getElementById("formjudging").style.display = "block";
  document.getElementById("paragraphjudging").style.display = "none";
  document.getElementById("editjudging").style.display = "none";
  document.getElementById("canceljudging").style.display = "block";
};

const changejudgingtoNormal = () => {
  document.getElementById("formjudging").style.display = "none";
  document.getElementById("paragraphjudging").style.display = "block";
  document.getElementById("editjudging").style.display = "block";
  document.getElementById("canceljudging").style.display = "none";
};

document.getElementById("updatejudgingform").addEventListener("submit", (e) => {
  e.preventDefault();
  // data = new URLSearchParams(new FormData(e.target));
  var judging = document.getElementById("judgingTextarea").value;
  var password = document.getElementById("judgingPasswrod").value;
  if (judging.length === 0) {
    return;
  }

  fetch(`${url}/api/event/judging`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      auth_token: `${localStorage.getItem("managertoken")}`,
    },
    body: JSON.stringify({
      eventname: data.eventname,
      judging: judging,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        getevent();
        changejudgingtoNormal();
      } else {
        alert("unable to update");
      }
    })
    .catch(() => {
      alert("unable to update");
    });
});

// Prize

const editprize = () => {
  document.getElementById("changeprize1").style.display = "block";
  document.getElementById("pprize1").style.display = "none";

  document.getElementById("changeprize2").style.display = "block";
  document.getElementById("pprize2").style.display = "none";

  document.getElementById("changeprize3").style.display = "block";
  document.getElementById("pprize3").style.display = "none";

  document.getElementById("changeprize4").style.display = "block";
  document.getElementById("pprize4").style.display = "none";

  document.getElementById("changeprize5").style.display = "block";
  document.getElementById("pprize5").style.display = "none";

  document.getElementById("prizepassword").style.display = "block";

  document.getElementById("editprize").style.display = "none";
  document.getElementById("cancelprize").style.display = "block";
  document.getElementById("updateprize").style.display = "block";
};

const cancelprize = () => {
  document.getElementById("changeprize1").style.display = "none";
  document.getElementById("pprize1").style.display = "block";

  document.getElementById("changeprize2").style.display = "none";
  document.getElementById("pprize2").style.display = "block";

  document.getElementById("changeprize3").style.display = "none";
  document.getElementById("pprize3").style.display = "block";

  document.getElementById("changeprize4").style.display = "none";
  document.getElementById("pprize4").style.display = "block";

  document.getElementById("changeprize5").style.display = "none";
  document.getElementById("pprize5").style.display = "block";

  document.getElementById("prizepassword").style.display = "none";

  document.getElementById("editprize").style.display = "block";
  document.getElementById("cancelprize").style.display = "none";
  document.getElementById("updateprize").style.display = "none";
};

const updateprize = () => {
  let prize1 = document.getElementById("prize1").value;
  let prize2 = document.getElementById("prize2").value;
  let prize3 = document.getElementById("prize3").value;
  let prize4 = document.getElementById("prize4").value;
  let prize5 = document.getElementById("prize5").value;
  let password = document.getElementById("prizepassword").value;
  // if(platform.length==0 || date.length==0 || type.length==0 || fees.length==0){
  //     return ;
  // }
  let arr = new Array();

  arr.push({
    no: 1,
    prize: prize1,
  });

  arr.push({
    no: 2,
    prize: prize2,
  });

  arr.push({
    no: 3,
    prize: prize3,
  });

  arr.push({
    no: 4,
    prize: prize4,
  });

  arr.push({
    no: 5,
    prize: prize5,
  });

  fetch(`${url}/api/event/prize`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      auth_token: `${localStorage.getItem("managertoken")}`,
    },
    body: JSON.stringify({
      eventname: data.eventname,
      password: password,
      prize: arr,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        getevent();
        // canceldetail();
        cancelprize();
      } else {
        alert("unable to update");
      }
    })
    .catch(() => {
      alert("unable to update");
    });
};

// Rules

const changeruletoEdit = () => {
  document.getElementById("formrules").style.display = "block";
  document.getElementById("paragraphrules").style.display = "none";
  document.getElementById("editrule").style.display = "none";
  document.getElementById("cancelrule").style.display = "block";
};

const changeruletoNormal = () => {
  document.getElementById("formrules").style.display = "none";
  document.getElementById("paragraphrules").style.display = "block";
  document.getElementById("editrule").style.display = "block";
  document.getElementById("cancelrule").style.display = "none";
};

document.getElementById("updaterulesForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // data = new URLSearchParams(new FormData(e.target));
  var desc = document.getElementById("rulesTextarea").value;
  var password = document.getElementById("rulesPasswrod").value;
  if (desc.length === 0) {
    return;
  }

  fetch(`${url}/api/event/rule`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      auth_token: `${localStorage.getItem("managertoken")}`,
    },
    body: JSON.stringify({
      eventname: data.eventname,
      rules: desc,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 0) {
        getevent();
        changeruletoNormal();
      } else {
        alert("unable to update");
      }
    })
    .catch(() => {
      alert("unable to update");
    });
});

document.forms["event-img"].addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`${url}/api/event/banner`, {
    method: "POST",
    body: new FormData(e.target),
    headers: {
      auth_token: `${localStorage.getItem("managertoken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        alert("Event Post Successfully!!");
        window.location.reload();
      } else {
        alert("Unable to update the post");
      }
    })
    .catch((err) => {
      alert(err);
    });
});



// event registration

const getregistration = () => {
  fetch(`${url}/api/event/eventregistration`, {
    method: "GET",
    headers: {
      auth_token: `${localStorage.getItem("managertoken")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.status == 0) {
        showregistration(data.reg);
      } else {
        // alert("Unable to update the post");
      }
    })
    .catch((err) => {
      // alert(err);
    });
}

getregistration();

function showregistration(reg) {
  document.getElementById('noofregistration').innerHTML = `Total Registration : ${reg.length}`
  let html = `
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Study</th>
              <th>Contact</th>
              <th>social</th>
              <th>Address</th>
              <th>Txn No</th>
              <th>Verify</th>
            </tr>
  `
  // console.log(reg);
  reg.forEach((e) => {
    html += `
            <tr>
              <td>${e.name}</td>
              <td>${e.appno}<br>${e.email}</td>
              <td><p>${e.course}, year - ${e.graduatingYear}</p><p>${e.college}</p><p>${e.collegeAddress}</p></td>
              <td>${e.contact}</td>
              <td><p><span class="fa-brands fa-instagram"></span>${e.instagram}</p>
                <p><span class="fa-brands fa-linkedin"></span>${e.linkedin}</p>
                <p><span class="fa-brands fa-github"></span>${e.github}</p></td>
              <td>${e.address}</td>
              <td>${e.txnno}</td>`
    if(e.valid==true){
      html += `<td>Verified</td>`
    }else
      html += `<td><button onclick="verifyuser('${e.email}','${e.appno}')">Verify</button></td>`
    html += `</tr>`
  })
  document.getElementById('registershow').innerHTML = html;
}


function verifyuser(mail,appno){
  // console.log(mail);
  // console.log(appno);
  
  fetch(`${url}/api/event/verifyregitered`, {
    method: "POST",
    headers: {
      auth_token: `${localStorage.getItem("managertoken")}`,
      'content-type' : 'application/json'
    },
    body :JSON.stringify({
      email:mail,
      appno : appno
    })
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      if (data.status == 0) {
        // showregistration(data.reg);
        window.location.reload();
      } else {
        // alert("Unable to update the post");
      }
    })
    .catch((err) => {
      // alert(err);
    });

}