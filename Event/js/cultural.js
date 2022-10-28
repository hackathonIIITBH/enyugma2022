const url = `https://enyugma.herokuapp.com`
// const url = `http://localhost:2100`

const main = document.getElementById('main');

const technical = () => {
    fetch(`${url}/api/event/cultural`)
        .then(res => res.json())
        .then((res) => {
            if (res.status == 0) {
                setevent(res.event)
            } else {
                window.location.href = '../index.html'
            }
        })
        .catch(() => {
            window.location.href = '../index.html'
        })
}

technical();


const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
};


async function getimage(e) {
    let dataimg = -1;
    await fetch(`${url}/api/event/img/${e}`)
        .then((res) => res.json())
        .then((data) => {
            // imgurl = arrayBufferToBase64(data.postImg[0].data);
            if (data.status == 0) {
                dataimg = data.postImg[0].data
            }
        });
    return dataimg;
}


async function setevent(event) {
    let html = ``;
    for (const i in event) {
        if (event[i].post == 1) {
            imgbuffer = await getimage(event[i].eventname);
            img = arrayBufferToBase64(imgbuffer);
            html += `<a href="../eventDetail/eventabout.html?search=${event[i].eventname
                }" class="container">
                          <img src='data:image/png;base64,${img.toString("base64")}'
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
                            <img src='../assets/images/cultural_banner.jpg'
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
        main.innerHTML = html;
    }

    main.innerHTML = html;
}