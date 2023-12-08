const URL_FIREBASE_USERS= "https://javascript29js-default-rtdb.firebaseio.com/users"

const iconButtonLogin = document.getElementById("icon-index")
iconButtonLogin.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

let nameUser = ""
let userName = ""
let userEmail =  ""
let userPassword = ""
let passwordConfirm = ""

validarFormulario = () =>{

    let nameUser = document.getElementById("Name").value
    let userName = document.getElementById("userName").value
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value
    let passwordConfirm = document.getElementById("passwordConfirm").value

    if (nameUser === "" || userName === "" || userEmail === "" || userPassword === "" || passwordConfirm === "") {
        alert("Por favor, complete todos los campos.");
        return false; // Evita que el formulario se envíe
    }else if (userPassword != passwordConfirm){
        alert("Verifique que los password sean iguales");
        return false;
    }

      // Si todos los campos están completos, puedes enviar el formulario
    return true;
}


const signUp = () => {
    validarFormulario()

    let nameUser = document.getElementById("Name").value
    let userName = document.getElementById("userName").value
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value
    let passwordConfirm = document.getElementById("passwordConfirm").value


};


document.getElementById("signUp_button").addEventListener("click", ()=>{
    //alert("distee click a login")
    signUp()
})



