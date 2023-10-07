let formEl = document.getElementById("addUserForm");

let nameEl = document.getElementById("name");
let emailEl = document.getElementById("email");

let nameErrMsg = document.getElementById("nameErr");
let emailErrMsg = document.getElementById("emailErr");

let statusEl = document.getElementById("status");
let genderM = document.getElementById("genderM");
let genderF = document.getElementById("genderF");

let resultEl = document.getElementById("resultEl");

let formData = {
    name:"",
    email:"",
    gender:"Male",
    status:"Active"
}

function getNameDetails(event){
    let inputName = event.target.value;
    formData.name = inputName;
}

function getEmailDetails(event){
    let inputEmail = event.target.value;
    formData.email = inputEmail;
}

function getStatusDetails(event){
    formData.status = event.target.value;
}

function getGenderDetails(event){
    formData.gender = event.target.value;
}

function validateForm(){
    if(nameEl.value === ""){
        nameErrMsg.textContent = "Required*";
    }
    else{
        nameErrMsg.textContent = "";
    }

    if(emailEl.value === ""){
        emailErrMsg.textContent = "Required*";
    }
    else{
        emailErrMsg.textContent = "";
    }
}

function fetchData(){
    resultEl.textContent = "";

    let url = "https://gorest.co.in/public-api/users";
    let options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",

            //use your bearer token after bearer below

            Authorization:"Bearer "
        },
        body:JSON.stringify(formData)
    }

    fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){

        console.log(jsonData);

        if(jsonData.code === 422){
            if(jsonData.data[0].message === "has already been taken"){
                emailErrMsg.textContent = "Email already taken";

                resultEl.textContent = "Failed";
                resultEl.classList.remove("result-style");
                resultEl.classList.add("err-msg");
            }
        }

        if(jsonData.code === 201){
            resultEl.textContent = "success";
            resultEl.classList.remove("err-msg");
            resultEl.classList.add("result-style");
        }
        else{
            resultEl.textContent = "Failed";
            resultEl.classList.remove("result-style");
            resultEl.classList.add("err-msg");
        }
    })

    
}

function finalSubmission(event){
    event.preventDefault();
    validateForm();
    fetchData();
}

nameEl.addEventListener("change",getNameDetails);
emailEl.addEventListener("change",getEmailDetails);
statusEl.addEventListener("change",getStatusDetails);
genderM.addEventListener("change",getGenderDetails);
genderF.addEventListener("change",getGenderDetails);
formEl.addEventListener("submit",finalSubmission);