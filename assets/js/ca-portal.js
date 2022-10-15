const url = "http://localhost:2100";

var userName = document.querySelector("#user-name");
var userDisp = document.querySelector("#user-disp");

const displayDetails = (data) => {
  var html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<tr>
                <td class="sno" id="sno">${i + 1}</td>
                <td class="name" id="name">${
                  data[i]._fieldsProto.name.stringValue
                }</td>
                <td class="email" id="email">${
                  data[i]._fieldsProto.email.stringValue
                }</td>
                <td class="gender" id="gender">${
                  data[i]._fieldsProto.gender.stringValue
                }</td>
                <td class="cno" id="cno">${
                  data[i]._fieldsProto.contact.stringValue
                }</td>
                <td class="inst" id="inst">${
                  data[i]._fieldsProto.inst.stringValue
                }</td>
                <td class="prog" id="prog">${
                  data[i]._fieldsProto.program.stringValue
                }</td>
                <td class="gYear" id="gYear">${
                  data[i]._fieldsProto.gdYear.stringValue
                }</td>
                <td class="social" id="social"><a href="${
                  data[i]._fieldsProto.fb.stringValue
                }">${data[i]._fieldsProto.fb.stringValue}</a><a href="${
      data[i]._fieldsProto.insta.stringValue
    }">${data[i]._fieldsProto.insta}</a><a href="${
      data[i]._fieldsProto.twitter.stringValue
    }">${data[i]._fieldsProto.twitter.stringValue}</a><a href="${
      data[i]._fieldsProto.linkedin.stringValue
    }">${data[i]._fieldsProto.linkedin.stringValue}</a><a href="${
      data[i]._fieldsProto.others.stringValue
    }">${data[i]._fieldsProto.others.stringValue}</a></td>
                <td class="q1" id="q1">${
                  data[i]._fieldsProto.wCA.stringValue
                }</td>
                <td class="q2" id="q2">${
                  data[i]._fieldsProto.eCA.stringValue
                }</td>
                <td class="query" id="query">${
                  data[i]._fieldsProto.others.stringValue
                }</td>
            </tr>`;
  }
  userDisp.innerHTML = html;
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
    //   displayDetails(data.data);
    //   userName.innerHTML = data.user;
      console.log(data.user)
    } else {
      localStorage.removeItem("caToken");
    }
    // console.log(data);
  })
  .catch((err) => {
    alert(err);
  });
