const URL_FIREBASE_USERS= "https://javascript29js-default-rtdb.firebaseio.com/users"

const iconButtonLogin = document.getElementById("icon-index")
iconButtonLogin.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

let tokenId = ""
let emailId = ""
let passwordId = ""

const getUserId = async () =>{
    let reponse = await fetch(`${URL_FIREBASE_USERS}/.json`)
    let data = await reponse.json();
    console.log(data)
    //let token = data.user1.token
    //console.log(token)
    tokenId = data.user1.token
    emailId = data.user1.email
    passwordId = data.user1.password
}

getUserId()

const login = () => {
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value

    if (userEmail === "" || userPassword === "") {
        alert("Please complete all fields.");
        return false; // Evita que el formulario se envíe
    } else if (userEmail === emailId && userPassword == passwordId){
            localStorage.setItem("token", tokenId);
            window.open("/index.html", "_self")
    } else {
        alert("Invalid email or password, try again.")
        location.reload();
    }
};

document.getElementById("login_button").addEventListener("click", ()=>{
    //alert("distee click a login")
    login()
})

validarFormulario = () =>{
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value

    if (userEmail === "" || userPassword === "") {
        alert("Por favor, complete todos los campos.");
        return false; // Evita que el formulario se envíe
    }
    
      // Si todos los campos están completos, puedes enviar el formulario
    return true;
}


// const logout = () => {
//     localStorage.removeItem("token");
// };

