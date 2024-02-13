let formElement = document.getElementById("mainForm");

let nameInputElement = document.getElementById("formName");
let emailInputElement = document.getElementById("formEmail");

let statusElement = document.getElementById("formStatus");
let maleGenderElement = document.getElementById("genderMale");
let femaleGenderElement = document.getElementById("genderFemale");

let nameErrMsg = document.getElementById("nameError");
let emailErrMsg = document.getElementById("emailError");

let successMsgEl = document.getElementById("successMsg");

let bodyElement = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
}

function checkForName(event){
    if(event.target.value === ""){
        nameErrMsg.textContent = "Required*";
    }
    else{
        nameErrMsg.textContent = "";
        bodyElement.name = event.target.value;
    }
}

function checkForEmail(event){
    if(event.target.value === ""){
        emailErrMsg.textContent = "Required*";
    }
    else{
        emailErrMsg.textContent = "";
        bodyElement.email = event.target.value;
    }
}

function checkForStatus(event){
    bodyElement.status = event.target.value;
}

function checkForGender(event){
    bodyElement.gender = event.target.value;
}

function validateForm(){

    let checkForErr = 0;

    if(nameInputElement.value === ""){
        nameErrMsg.textContent = "Required*";
        checkForErr = 1;
    }
    else{
        nameErrMsg.textContent = "";
    }

    if(emailInputElement.value === ""){
        emailErrMsg.textContent = "Required*";
        checkForErr = 1 ;
    }
    else{
        emailErrMsg.textContent = "";
    }

    return checkForErr;

}

function submitForm(){

    successMsgEl.textContent = "";

    let url = "https://gorest.co.in/public-api/users";

    let options = {

        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",

            // add your own autorization bearer code
            Authorization: "Bearer "
        },
        body: JSON.stringify(bodyElement)

    }

    let fetchedResponse = fetch(url, options);

    let checkCalledResponse = async () =>  {
        
        try{
            let response = await fetchedResponse;
            let jsonData = await response.json();
            console.log(jsonData);

            // this below code will check if email already exist or not 
            // this below code will check any default in form filling or if email already exist or not 
            if(jsonData.code === 422){
                if(jsonData.data[0].message === "has already been taken"){
                        emailErrMsg.textContent = "This email has already been taken";
                }
                else if(jsonData.data[0].message === "is invalid"){
                        emailErrMsg.textContent = "Please provide valid email";
                }
            }
            else if(jsonData.code === 201){
                emailErrMsg.textContent = "";
                successMsgEl.textContent = "Form submitted successfully";
            }
        
        }
        catch(err){
            console.log(err);
        }
    }

    checkCalledResponse();

}

function finalSubmission(event){
    event.preventDefault();

    let checkForErr = validateForm();

    if(checkForErr === 1){
        return true;
    }
    
    submitForm();
    
}

nameInputElement.addEventListener("blur",checkForName);
emailInputElement.addEventListener("blur",checkForEmail);
statusElement.addEventListener("change",checkForStatus);
maleGenderElement.addEventListener("change",checkForGender);
femaleGenderElement.addEventListener("change",checkForGender);
formElement.addEventListener("submit",finalSubmission);