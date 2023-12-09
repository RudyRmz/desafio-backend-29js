const URL_MONGO_USERS= "http://localhost:3002/users/"

const iconButtonLogin = document.getElementById("icon-index")
iconButtonLogin.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

let userImage = ""
let nameUser = ""
let userName = ""
let userEmail =  ""
let userPassword = ""
let passwordConfirm = ""

validarFormulario = () =>{
    let userImage = document.getElementById("profile_image")
    let nameUser = document.getElementById("Name").value
    let userName = document.getElementById("userName").value
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value
    let passwordConfirm = document.getElementById("passwordConfirm").value

    if (nameUser === "" || userName === "" || userEmail === "" || userPassword === "" || passwordConfirm === "" || userImage === "") {
        alert("Por favor, complete todos los campos.");
        return false; // Evita que el formulario se envíe
    }else if (userPassword != passwordConfirm){
        alert("Verifique que los password sean iguales");
        return false;
    }

      // Si todos los campos están completos, puedes enviar el formulario
    return true;
}

const postUser = async(postUser) =>{
    //console.log(JSON.stringify(postInfo));
    const response = await fetch(URL_MONGO_USERS, {
        method: 'POST',
        headers: { 'Content-type' : 'application/json;charset=UTF-8'},
        body: JSON.stringify(postUser), 
    });
    //console.log(response.body)
    // let data = await response.json()
    // console.log(response)
    // return data
    if (!response.ok) {
        throw new Error(`No se pudo guardar el usuario. Estado: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
};


const signUp = async () => {
    validarFormulario()

    let userImage = document.getElementById("profile_image").value
    let nameUser = document.getElementById("Name").value
    let userName = document.getElementById("userName").value
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value
    let passwordConfirm = document.getElementById("passwordConfirm").value

    let userObject = {
        avatar: userImage,
        name: nameUser,
        user_name: userName,
        email: userEmail,
        password: userPassword
    }

    await postUser(userObject)
};


document.getElementById("signUp_button").addEventListener("click", ()=>{
    //alert("distee click a login")
    signUp()
    window.open("/login/login.html", "_self")
    alert("User created succesfully")
})



