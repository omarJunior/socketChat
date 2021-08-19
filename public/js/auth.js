//console.log(window.location.hostname.includes('localhost'))
const miFormulario = document.querySelector("form");

const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


miFormulario.addEventListener("submit", function(e){
    e.preventDefault();
    const formData = {};
    for(let el of miFormulario.elements){
        if(el.name.length > 0){
            formData[el.name] = el.value;
        }
    }
    fetch(url + 'login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formData)
    })
    .then( resp => resp.json() )
    .then( ({msg, token}) => {
        if(msg){
            return console.error(msg);
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( error => console.error(error) );
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    const data = { id_token };

    fetch( url + 'google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
    })
    .then( resp => resp.json() )
    .then( ({token}) => {
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    } )
    .catch( console.log );
    
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}