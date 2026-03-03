const form = document.getElementById("registerForm");
const alertBox = document.getElementById("alertBox");


function showAlert(message, type="danger"){

    alertBox.innerHTML =

    `<div class="alert alert-${type} alert-dismissible fade show">

        ${message}

        <button type="button"
                class="btn-close"
                data-bs-dismiss="alert"></button>

    </div>`;
}



form.addEventListener("submit", async function(e){

    e.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const first_name =
        document.getElementById("first_name").value.trim();

    const last_name =
        document.getElementById("last_name").value.trim();

    const password =
        document.getElementById("password").value;

    const confirm_password =
        document.getElementById("confirm_password").value;

    const profile_picture =
        document.getElementById("profile_picture").files[0];



    if(!email || !username || !first_name || !last_name || !password){

        showAlert("All fields are required");
        return;
    }


    if(password.length < 6){

        showAlert("Password must be at least 6 characters");
        return;
    }


    if(password !== confirm_password){

        showAlert("Passwords do not match");
        return;
    }



    const formData = new FormData();

    formData.append("email", email);
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("password", password);

    if(profile_picture){

        formData.append("profile_picture", profile_picture);
    }



    try{

        const response = await fetch("/api/users/register/",{

            method:"POST",

            headers:{
                "X-CSRFToken": getCSRFToken()
            },

            body:formData

        });


        const data = await response.json();


        if (!response.ok) {
        // data could be {email: [...], password: [...]} etc.
            let errorMessage = "";
            for (const key in data) {
                errorMessage += `${data[key].join(" ")} `;
            }
            alert(errorMessage.trim());  // Shows the real error message
        } else {
            alert("User registered successfully!");
            window.location.href="/login"
        }

    }
    catch{

        showAlert("Server error");

    }

});



function getCSRFToken(){

    return document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken"))
        ?.split("=")[1];

}