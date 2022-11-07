const url = `https://enyugma.herokuapp.com`
// const url = `http://localhost:2100`

window.location.href = '../index.html'

let userdetail;
let username = document.getElementById('name');
let email = document.getElementById('email');
let address = document.getElementById('address');
let college = document.getElementById('college');
let course = document.getElementById('course');
let graduating = document.getElementById('graduating');
let eventNameshow = document.getElementById('eventname');
let contact = document.getElementById('contact');
let fees = document.getElementById('fees');
let appno = document.getElementById('appno');
let state = document.getElementById('state');

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// console.log(urlParams.get('register'))

let eventname = urlParams.get('register');
eventNameshow.innerHTML = `${eventname}`
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
                // console.log(res.event);
                fees.innerHTML = `<span>Registeration Fees</span>: Rs ${res.event.fees}`
                if (res.event.fees == "0") {
                    document.getElementById('showornot').style.display = 'none';
                    ableordiable('yes');
                    document.getElementById('txnno').value = 'Null'
                }
            } else {
                window.location.href = `../Event/technical.html`
            }
        }).catch((err) => {
            // console.log(err);
            window.location.href = `../Event/technical.html`
        })
}

getevent();

// User Status
const getuser = () => {

    fetch(`${url}/userDetails`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            auth_token: `${localStorage.getItem("userToken")}`,
        },
    })
        .then((res) => res.json())
        .then((res) => {
            // console.log(res)
            if (res.status === 0) {
                // console.log(res.data)
                if (res.data.profile == 0) {
                    window.location.href = `../user/dashboard.html`
                }
                userdetail = res.data;
                showdata();
            } else {
                localStorage.removeItem('userToken');
                window.location.href = `../auth/login.html`
            }
        })
        .catch((err) => {
            localStorage.removeItem('userToken');
            window.location.href = `../auth/login.html`
        });

}

if (localStorage.getItem('userToken')) {
    // console.log(localStorage.getItem('userToken'));
    getuser();
} else {
    // console.log('Not')
    window.location.href = `../auth/login.html`
}


const showdata = () => {
    // console.log(userdetail);
    username.innerHTML = `<span>Name</span> : ${userdetail.name}`;
    email.innerHTML = `<span>Email</span>: ${userdetail.email}`;
    college.innerHTML = `<span>College</span>: ${userdetail.instName}, ${userdetail.instAddr}`;
    course.innerHTML = `<span>Course</span>: ${userdetail.course}`
    graduating.innerHTML = `<span>Gradguating year</span>: ${userdetail.year}`
    address.innerHTML = `<span>Address</span>: ${userdetail.address}`
    state.innerHTML = `<span>State</span>: ${userdetail.state}`
    appno.innerHTML = `<span>Application No</span>: ${userdetail.appno}`
    contact.value = `${userdetail.contact}`
    document.getElementById('loaderShow').style.display = 'none';

    let st = new Set();
    userdetail.eventreg.forEach(element => {
        st.add(element)
    });
    if (st.has(eventname)) {
        alert('Already Registered for this event')
        window.location.href = `../user/dashboard.html`
    }


    document.getElementById('submitbutton').style.display = "block"
}

document.getElementById('fillform').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('loaderShow').style.display = 'block';
    let contactValue = document.getElementById('contact').value;
    let linkedinValue = document.getElementById('linkedin').value;
    let GithubValue = document.getElementById('Github').value;
    let instaValue = document.getElementById('insta').value;
    let txn = document.getElementById('txnno').value;

    let data = {
        name: userdetail.name,
        email: userdetail.email,
        college: userdetail.instName,
        collegeAddress: userdetail.instAddr,
        course: userdetail.course,
        graduatingYear: userdetail.year,
        address: userdetail.address,
        instagram: instaValue,
        linkedin: linkedinValue,
        github: GithubValue,
        contact: contactValue,
        eventname: eventname,
        state: userdetail.state,
        appno: userdetail.appno,
        txnno: txn,
        valid: false
    }

    // console.log(data);

    fetch(`${url}/api/event/registerforevent`, {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            auth_token: `${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            document.getElementById('loaderShow').style.display = 'none';
            // console.log(res);
            if (res.status == 0) {
                document.getElementById('message').innerHTML = `<p style="color: green; font-size: 20px; font-weight: 900;"> Successful</p>`
                topFunction();
            } else {
                document.getElementById('message').innerHTML = `<p style="color: red; font-size: 20px; font-weight: 900;"> Unsuccessful</p>`
                topFunction()
            }
        }).catch((err) => {
            document.getElementById('message').innerHTML = `<p style="color: red; font-size: 20px; font-weight: 900;"> Server Error</p>`
            topFunction()
            document.getElementById('loaderShow').style.display = 'none';
        })
})


function ableordiable(e) {
    // console.log(e);
    if (e == 'yes') {
        document.getElementById('submitbutton').disabled = false;
        document.getElementById('submitbutton').style.cursor = 'pointer'
    } else {
        document.getElementById('submitbutton').disabled = true;
        document.getElementById('submitbutton').style.cursor = 'not-allowed'
    }
}