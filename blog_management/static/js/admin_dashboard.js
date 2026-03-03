document.addEventListener("DOMContentLoaded", function () {

loadUsers();

document.getElementById("logoutBtn")
.addEventListener("click", logout);

});


/* LOAD USERS */

async function loadUsers(){

const response =
await fetch("/api/admin/users/");

const data =
await response.json();

const users =
data.results;

const userGrid =
document.getElementById("userGrid");

userGrid.innerHTML = "";


users.forEach(user=>{


let roleButton = "";


/* Role Button Logic */

if(user.role === "sub-admin"){

roleButton = `

<button
class="btn btn-warning btn-sm"

onclick="updateRole(${user.id}, 'user')">

Demote

</button>

`;

}
else{

roleButton = `

<button
class="btn btn-success btn-sm"

onclick="updateRole(${user.id}, 'sub-admin')">

Promote

</button>

`;

}



/* Bootstrap Card */

const card = `

<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">

<div class="card shadow-sm h-100">

<div class="card-body d-flex flex-column">

<h6 class="text-muted mb-1">

${user.email}

</h6>


<h5 class="card-title">

${user.username}

</h5>


<p class="mb-3">

<span class="badge bg-secondary">

${user.role}

</span>

</p>


<div class="mt-auto d-flex gap-2">

${roleButton}


<button
class="btn btn-danger btn-sm"

onclick="deleteUser(${user.id})">

Delete

</button>

</div>

</div>

</div>

</div>

`;

userGrid.innerHTML += card;

});

}



/* UPDATE ROLE */

async function updateRole(id, role){

await fetch(

`/api/admin/user-edit/${id}/`,

{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
role:role
})

}

);

loadUsers();

}



/* DELETE */

async function deleteUser(id){

if(!confirm("Delete user?"))
return;


await fetch(

`/api/admin/user-edit/${id}/`,

{
method:"DELETE"
}

);

loadUsers();

}



/* LOGOUT */

async function logout(){

await fetch("/logout/",{
method:"POST"
});

window.location.replace("/login/");

}