const url = `https://enyugma.herokuapp.com`
// const url = `http://localhost:2100`

let eventdata = {}
const desc = document.getElementById('description');
const judging = document.getElementById('judging');
const rules = document.getElementById('rules');
const detail = document.getElementById('detail');
const eventnameshow = document.getElementById('eventNameshow');

queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// console.log(urlParams.get('search'))

let eventname = urlParams.get('search');

// /console.log(eventname);

const getevent = () => {
    fetch(`${url}/api/event/getevent`, {
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventname: `${eventname}`
        })
    })
        .then(res => res.json())
        .then((res) => {
            // console.log(res);
            if (res.status == 0) {
                eventdata = res.event
                eventnameshow.innerHTML = eventdata.name
                showevent();
            }else{
                window.location.href=`../Event/technical.html`
            }
        }).catch((err) => {
            console.log(err);
            window.location.href=`../Event/technical.html`
        })
}


function showevent() {
    desc.innerHTML = eventdata.desc
    judging.innerHTML = eventdata.judging
    rules.innerHTML = eventdata.rule
    detail.innerHTML = `<p>Platform : ${eventdata.platform}</p>
                        <p>Date : ${eventdata.date}</p>
                        <p>Registration Fees : ${eventdata.fees}</p>`

    let arr = eventdata.prize;
    let mp = new Map();
    // console.log(arr);
    for (const i in arr) {
        // console.log(i)
        mp[arr[i].no] = arr[i].prize
    }
    // console.log(mp);

    let html = ``;
    if (mp[1].length != 0) {
        // <li></li>
        html += `<p>First Prize : ${mp[1]}</p>`
    }
    if (mp[2].length != 0) {
        // <li></li>
        html += `<p>Second Prize : ${mp[2]}</p>`
    } 
    if (mp[3].length != 0) {
        // <li></li>
        html += `<p>Third Prize : ${mp[3]}</p>`
    } 
    if (mp[4].length != 0) {
        // <li></li>
        html += `<p>Fourth Prize : ${mp[4]}</p>`
    } 
    if (mp[5].length != 0) {
        // <li></li>
        html += `<p>Five Prize : ${mp[5]}</p>`
    }
    prize.innerHTML = html;

}

getevent();


function display(e,id) {
    let data = document.getElementById('about_area').children
    // console.log(data)
    for (let index = 0; index < 5; index++) {
        data[index].style.display = "none";
    }

    let over = document.getElementById('title_nav').children;
    // console.log()
    for (let index = 0; index < 5; index++) {
        over[index].classList = 'text_settle'
    }
    
    over[id-1].classList = 'text_settle hereitis'

    document.getElementById(`${e}`).style.display = "block";
}

function register(){
    window.location.href = `../register/eventregister.html?register=${eventname}`
}