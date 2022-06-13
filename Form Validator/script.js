const form = document.querySelector('#form');
const userName = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// show input error message
showError =(input , message)=>{
    const formControl = input.parentElement;
    formControl.className = "form-control error"
    const small = formControl.querySelector('small');
    small.innerText = message
}

// show input Success 
showSuccess =(input)=>{
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

// check email is valid
checkEmail = (input) =>{
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input , 'Email is not valid')
    }
}

// check required
checkRequired = (inputArr) =>{
    inputArr.forEach( (input) => {
        if(input.value.trim() === ''){
            showError(input , `${getFieldName(input)}  is required`)
        }else{
            showSuccess(input)
        }
    });
}

// check input Length
checkLength = (input , min , max) =>{
    if(input.value.length < min){
        showError(
        input ,
        `${getFieldName(input)} must be at least ${min} characters`)
    }else if(input.value.length > max){
        showError(
            input , 
            ` ${getFieldName(input)} must be less than ${max} characters`)
    }else{
        showSuccess(input);
    }
}

// check password match
checkPasswordMatch =(input1 , input2)=>{
    if(input1.value !== input2.value ){
        showError(input2 , 'password not match')
    }

}

// get field Name
getFieldName = (input) =>{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listener
form.addEventListener('submit' , (e)=>{
    e.preventDefault();

    checkRequired([ userName , email , password , password2 ]);
    checkLength(userName , 3 , 15)
    checkLength(password , 6 , 25)
    checkEmail(email)
    checkPasswordMatch(password ,password2)
})