document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = passwordInput.value;

        // Simulated authentication (replace with actual authentication logic)
        authenticateUser(username, password)
            .then(response => {
                if (response.success) {
                    window.location.href = 'index.html';
                } else {
                    errorMessage.textContent = response.message;
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred. Please try again.';
                console.error('Login error:', error);
            });
    });

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Simulated authentication function (replace with actual API call)
function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'safaa@gmail.com' && password === '12') {
                resolve({ success: true });
            } else {
                resolve({ success: false, message: 'Invalid username or password' });
            }
        }, 1000); // Simulate network delay
    });
}