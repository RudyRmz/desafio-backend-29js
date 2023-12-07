//const URL_MONGODB= "https://javascript29js-default-rtdb.firebaseio.com/users"
const URL_MONGODB= "http://localhost:3002/users/" 


const iconButtonLogin = document.getElementById("icon-index")
iconButtonLogin.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

// let tokenId = ""
// let emailId = ""
// let passwordId = ""

const getUserId = async () =>{
    let reponse = await fetch(URL_MONGODB)
    let data = await reponse.json();
    console.log(data)
    let usersData = data.data
    console.log(usersData)
    //let token = data.user1.token
    //console.log(token)
    //tokenId = data.user1.token
    //emailId = data[0]
    //passwordId = data.password

    // let userLog = validUser(usersData, "user6@mail.com")
    // console.log(userLog)
    //console.log(userLog[0].password)
    document.getElementById("login_button").addEventListener("click", ()=>{
        //alert("distee click a login")
        login(usersData)
    })
}

getUserId()

const validUser = (usersData, email)=>{
    let result = (usersData.filter((user)=>{
            return user.email === email
    }))
    return result
}

const login = (usersData) => {
    let userEmail =  document.getElementById("userEmail").value
    let userPassword = document.getElementById("userPassword").value
    let userLog = validUser(usersData, `${userEmail}`)
    // if (userEmail === "" || userPassword === "") {
    //     alert("Please complete all fields.");
    //     return false; // Evita que el formulario se envíe
    // } else if (userEmail === emailId && userPassword == passwordId){
    //         localStorage.setItem("token", tokenId);
    //         window.open("/index.html", "_self")
    // } else {
    //     alert("Invalid email or password, try again.")
    //     location.reload();
    // }

    if (userEmail === "" || userPassword === "") {
        alert("Please complete all fields.");
        return false; // Evita que el formulario se envíe
    } else if(!userLog){
        alert("There is no account associated with this email")
        location.reload();
        return false;
    } else if (userLog && userPassword == userLog[0].password){
            localStorage.setItem("token", userLog[0].user_name);
            window.open("/index.html", "_self")
    } else {
        alert("Invalid email or password, try again.")
        location.reload();
    }
};

// document.getElementById("login_button").addEventListener("click", ()=>{
//     //alert("distee click a login")
//     login(usersData)
// })

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

