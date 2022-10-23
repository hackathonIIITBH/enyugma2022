const url = `https://enyugma.herokuapp.com`
// const url = `http://localhost:2100`;

const main = document.getElementById("main");

const technical = () => {
  let desc = [];
  fetch(`${url}/api/event/technical`)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      if (res.status == 0) {
        desc = res.event;
      } else {
        window.location.href = "../index.html";
      }
    })
    .catch((err) => {
      console.log(err);
      window.location.href = "../index.html";
    });
  fetch(`${url}/api/event/img/technical`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 0) {
        setevent(desc, data.eventImg);
      }
    });
};

technical();

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

function setevent(event,eventImg) {
  // console.log(event)
  let html = ``;
  for (const i in event) {
    // console.log(i);
    if (event[i].post == 1) {
      html += `<a href="../eventDetail/eventabout.html?search=${
        event[i].eventname
      }" class="container">
                    <img src='data:image/png;base64,${arrayBufferToBase64(
                      event[i].postImg[0].data
                    ).toString("base64")}'
                        alt="event name here">
                    <div class="alltext">
                        <h1 class="eventname"> ${event[i].eventname}
                        </h1>
                        <div class="eventdetails">${event[i].desc}</div>
                        <div>
                            <button class="button">Explore</button>
                        </div>
                    </div>
                </a>`;
    } else {
      html += `<a href="../eventDetail/eventabout.html?search=${event[i].eventname}" class="container">
                      <img src='../assets/images/Indian_Institute_of_Information_Technology,_Bhagalpur_logo.png'
                          alt="event name here">
                      <div class="alltext">
                          <h1 class="eventname"> ${event[i].eventname}
                          </h1>
                          <div class="eventdetails">${event[i].desc}</div>
                          <div>
                              <button class="button">Explore</button>
                          </div>
                      </div>
                  </a>`;
    }
  }

  main.innerHTML = html;
}
