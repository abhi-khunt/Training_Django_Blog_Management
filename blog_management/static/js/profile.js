
const form = document.getElementById("profileForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

const profilePicture = document.getElementById("profilePicture");

const profilePreview = document.getElementById("profilePreview");

const alertBox = document.getElementById("alertBox");



/* ======================
LOAD PROFILE
====================== */

window.onload = async function(){

    const response = await fetch("/api/users/profile/");

    const data = await response.json();


    firstName.value = data.first_name;

    lastName.value = data.last_name;

    if(data.profile_picture){

        profilePreview.src =
        data.profile_picture;

    }

}



/* ======================
IMAGE PREVIEW
====================== */

profilePicture.onchange = function(){

    const file = profilePicture.files[0];

    if(file){

        profilePreview.src =
        URL.createObjectURL(file);

    }

}



/* ======================
SAVE PROFILE
====================== */

form.addEventListener("submit", async function(e){

    e.preventDefault();


    const formData = new FormData();

    formData.append(
        "first_name",
        firstName.value
    );


    formData.append(
        "last_name",
        lastName.value
    );


    if(profilePicture.files[0]){

        formData.append(
            "profile_picture",
            profilePicture.files[0]
        );

    }


    const response = await fetch(
        "/api/users/profile/",
        {
            method:"PUT",
            body:formData
        }
    );


    if(response.ok){

        alertBox.innerHTML=`

        <div class="alert alert-success">

        Profile Updated Successfully

        </div>
        `;

    }

    else{

        alertBox.innerHTML=`

        <div class="alert alert-danger">

        Error Updating Profile

        </div>
        `;

    }

});