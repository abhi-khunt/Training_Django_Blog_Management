document.getElementById('loginForm').addEventListener('submit', async function(e){
    e.preventDefault();

    // Clear previous errors
    document.getElementById('usernameError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('responseMsg').innerText = '';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let hasError = false;
    if(!username){
        document.getElementById('usernameError').innerText = 'Username is required';
        hasError = true;
    }
    if(!password){
        document.getElementById('passwordError').innerText = 'Password is required';
        hasError = true;
    }

    if(hasError) return;

    // Send POST request to backend API
    try {
        const response = await fetch("/api/users/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')  // helper function
            },
            body: JSON.stringify({username, password})
        });

        const data = await response.json();
        console.log(data)
        if(response.ok){
            if (data.role === 'admin') {
                window.location.href = '/admin-dashboard/';
            }
            else{
                window.location.href ='/'
            }
            
        } else {
            document.getElementById('responseMsg').innerText = data.detail || 'Login failed';
            document.getElementById('responseMsg').classList.add('text-danger');
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMsg').innerText = 'Server error, try again later';
        document.getElementById('responseMsg').classList.add('text-danger');
    }
});

// Helper to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i=0; i<cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}