export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="email" id="email-input" required>
                    <label for="email-input">Email</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="password" id="password-input" required>
                    <label for="password-input">Password</label>
                </div>
                <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Log in</button>
            </form>
    `
}

export function authWithEmailAndPassword(email, password) {
    let apiKey = 'AIzaSyAVBoGSosUzxU2YQnnKzStIKAdPvs7s-TI';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email, password: password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken);
}