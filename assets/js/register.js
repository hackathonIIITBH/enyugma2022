const form=document.getElementById('form');
const name=document.getElementById('name');
const email=document.getElementById('email');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirm-password');

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

function checkPasswordMatch(input1,input2){    // checking if confirm password is same
    if (input1.value===input2.value && input1.value !==''){
        showSuccess(input2);
    } else  if(input1.value===''){
        showError(input2, 'Please enter password');
    } else {    
        showError(input2, 'Passwords don\'t match');
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

function checkLength(input,min,max){
    if(input.value.length<min || input.value.length>max){
        showError(input, `${getFieldName(input)} should be between ${min} and ${max}`);
    } else{
        showSuccess(input);
    }
}

form.addEventListener('submit',function(e){     // adding eventListener to form submit
    e.preventDefault();    // prevents the form from submitting
    checkRequired([name,email,password,confirmPassword]);
    checkLength(name,3,15);
    checkLength(password,6,25);
    checkPasswordMatch(password,confirmPassword);
    checkEmail(email);
});

//Astronaut JS
$.fn.multiply = function(numCopies) {
    var newElements = this.clone();
    for(var i = 1; i < numCopies; i++)
    {
        newElements = newElements.add(this.clone());
    }
    return newElements;
  };
  
  $('.star').multiply(80).insertAfter('.star');
  
  
  $('.star').each(function() {
    var top = (Math.random() * 100) + '%';
    var left = (Math.random() * 100) + '%';
    
    $(this).css({
      "top": top,
      "left": left
    });
  });