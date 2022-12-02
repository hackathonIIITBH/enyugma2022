// const url = `https://enyugma.herokuapp.com`
// // const url = `http://localhost:2100`;

// const main = document.getElementById("main");

// const technical = () => {
//   let desc = [];
//   fetch(`${url}/api/event/technical`)
//     .then((res) => res.json())
//     .then((res) => {
//       if (res.status == 0) {
//         desc = res.event;

//         setevent(desc);
//       } else {
//         window.location.href = "../index.html";
//       }
//     })
//     .catch((err) => {
//       window.location.href = "../index.html";
//     });
// };

// technical();

// const arrayBufferToBase64 = (buffer) => {
//   var binary = "";
//   var bytes = [].slice.call(new Uint8Array(buffer));
//   bytes.forEach((b) => (binary += String.fromCharCode(b)));
//   return window.btoa(binary);
// };

// async function getimage(e) {
//   let dataimg=-1;
//   await fetch(`${url}/api/event/img/${e}`)
//     .then((res) => res.json())
//     .then((data) => {
//       // imgurl = arrayBufferToBase64(data.postImg[0].data);
//       if (data.status == 0) {
//         dataimg = data.postImg[0].data
//       }
//     });
//     return dataimg;
//   }

// async function setevent(event) {
//   let html = ``;
//   for (const i in event) {
//     if (event[i].post == 1) {
//       imgbuffer = await getimage(event[i].eventname);
//       img = arrayBufferToBase64(imgbuffer);
//       html += `<a href="../eventDetail/eventabout.html?search=${event[i].eventname
//         }"  target="_blank" class="container">
//                     <img src='data:image/png;base64,${img.toString("base64")}'
//                         alt="event name here">
//                     <div class="alltext">
//                         <h1 class="eventname"> ${event[i].eventname}
//                         </h1>
//                         <div class="eventdetails">${event[i].desc}</div>
//                         <div>
//                             <button class="button">Explore</button>
//                         </div>
//                     </div>
//                 </a>`;
//     } else {
//       html += `<a href="../eventDetail/eventabout.html?search=${event[i].eventname}"  target="_blank" class="container">
//                       <img src='../assets/images/cultural_banner.jpg'
//                           alt="event name here">
//                       <div class="alltext">
//                           <h1 class="eventname"> ${event[i].eventname}
//                           </h1>
//                           <div class="eventdetails">${event[i].desc}</div>
//                           <div>
//                               <button class="button">Explore</button>
//                           </div>
//                       </div>
//                   </a>`;
//     }
//     main.innerHTML = html;
//     main.innerHTML += `
//       <div style="margin: auto; width: 100%; height: fit-content; display:flex; justify-content:center;" id="loaderShow">
//         <div class="loader" style="--width: 20%"><span></span></div>
//       </div>
//       `
//     // console.log("load");
//   }

//   main.innerHTML = html;
// }
