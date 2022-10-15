const url = `https://enyugma.herokuapp.com`
// const url = `http://localhost:2100`

const main = document.getElementById('main');

const technical = ()=>{
    fetch(`${url}/api/event/cultural`)
    .then(res=>res.json())
    .then((res)=>{
        // console.log(res)
        if(res.status==0){
            setevent(res.event)
        }else{
            window.location.href='../index.html'
        }
    })
    .catch(()=>{
        window.location.href='../index.html'
    })
}

technical();

function setevent(event){
    // console.log(event)
    let html = ``;
    for(const i in event){
        console.log(i)
        html += `<a href="../eventDetail/eventabout.html?search=${event[i].eventname}" class="container">
                    <img src="../assets/images/Indian_Institute_of_Information_Technology,_Bhagalpur_logo.png"
                        alt="event name here">
                    <div class="alltext">
                        <h1 class="eventname"> ${event[i].eventname}
                        </h1>
                        <div class="eventdetails">${event[i].desc}</div>
                        <div>
                            <button class="button">Explore</button>
                        </div>
                    </div>
                </a>`
    }

    main.innerHTML = html;
}