const form=document.getElementById('form');
const email=document.getElementById('email');
const password=document.getElementById('password');
const url="https://enyugma.herokuapp.com";
console.log('Running!!!!');

function showError(input,message){      // a function that will be called whenever an error is to be printed 
    const parent=input.parentElement;   // in small
    parent.classList.add('error');
    parent.classList.remove('success');
    const small=parent.querySelector('small');
    small.innerText=message;
}

function showSuccess(input){    // a function that will be called whenever an input is successful
    const parent=input.parentElement;
    parent.classList.remove('error');
    parent.classList.add('success');
}

function checkEmail(input){     // using regex to check email
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(String(input.value).toLowerCase())){
        showSuccess(input);
    } else {
        showError(input, 'Invalid Email');
    }
}

function checkRequired(inputArray){
    inputArray.forEach((input) => {
        if(input.value.trim()===''){
            showError(input,`${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function getFieldName(input){       // used to get Field name in Captial Case.
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit',function(e){     // adding eventListener to form submit
    e.preventDefault();    // prevents the form from submitting
    checkRequired([email,password]);
    checkEmail(email);
});
document.forms["#login"].addEventListener("submit",(e)=>{
e.preventDefault();
fetch(`${url}/login`,{
    method:"post",
    body:URLSearchParams(FormData(e.target))

})
.then((res)=>res.json()).then((data)=>{
    if(data.status==0){
        localStorage.setItem(data.auth_token)
        window.location.href="./dashboard.html"
    }
    else{
        alert("something went wrong")
    }
    
})
.catch((err)=>{
    alert(err)
})
})
