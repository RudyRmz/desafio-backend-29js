
const URL_FIREBASE= "https://javascript29js-default-rtdb.firebaseio.com/devto"

let queryString = location.search
console.log(queryString)

let params = new URLSearchParams(queryString)
console.log(params)

let postId = params.get("postId")
console.log(postId)


const getPostById = async (idPost) =>{
    let reponse = await fetch(`${URL_FIREBASE}/${idPost}/.json`)
    let data = await reponse.json();
    console.log(data)
    // let {date, description, tags, title, url, reactions, key} = data;

    if (data){
        let {date, description, tags, title, url, reactions, key} = data;
        document.getElementById("head-title").textContent = title;
        document.getElementById("post-cover").src = url
        document.getElementById("date-post").textContent = `Posted on ${date}`
        document.getElementById("post-title").textContent = title
        document.getElementById("post-description").textContent = description

        document.getElementById("buttonEdit")
        buttonEdit.addEventListener("click", () => {
            window.open(`/edit_post/edit_post.html?postId=${postId}`, "_self");
        });
        
        document.getElementById("buttonDelete")
        buttonDelete.addEventListener("click", ()=>{
            const respuesta = confirm("Are you sure you want to delete the post?");

            if (respuesta) {
                // La opción Aceptar fue seleccionada
                alert("You deleted the post")
                deleteUser(postId)
                window.open("/index.html", "_self")
                // Aquí puedes agregar la lógica para guardar los cambios o realizar las acciones necesarias.
            } else {
                // La opción Cancelar fue seleccionada
                console.log("Se seleccionó Cancelar.");
                // Aquí puedes manejar la situación en la que se cancela la acción.
            }
            //alert("le diste click a delete")
            
        })
    }

    const deleteUser = async (userId) => {
        let response = await fetch(
        `${URL_FIREBASE}/${userId}/.json`,
        {
            method: "DELETE",
        }
        );
        let data = await response.json();
        console.log(data);
        return data;
    };

const iconButton = document.getElementById("icon-index")
iconButton.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

let createPostButton =  document.getElementById("create_post__button")
createPostButton.addEventListener("click",()=>{
  window.open("/create_post/create_post.html", "_self");
})

    // else {
    //     document.getElementById("detail-wrapper").innerHTML = `
    //     <div class="alert alert-secondary" role="alert">
    //   No se encontró el contenido de esta entrada
    // </div>
    // <img class="w-100" src="https://thumbs.dreamstime.com/z/page-not-found-error-hand-drawn-vector-doodle-illustration-internet-connection-problem-concept-cat-holds-computer-mouse-119417440.jpg" alt="" />
    //     `;
    //   }
}

getPostById(postId)

////////Codigo botones navbar
document.getElementById("login__button").addEventListener("click", ()=>{
    window.open("/login/login.html", "_self");
})

const logout = () => {
    localStorage.removeItem("token");
};

document.getElementById("signOutButton").addEventListener("click", ()=>{
    const respuesta = confirm("Are you sure you want to sign out?")
    if (respuesta) {
      // La opción Aceptar fue seleccionada
      alert("You sign out")
      // document.getElementById("button_dropdown").classList.add("d-none")
      // document.getElementById("create_post__button").classList.add("d-none")
      // document.getElementById("notificationIcon").classList.add("d-none")
      // document.getElementById("login__button").classList.remove("d-none")
  
      logout()
      location.reload();
      //location.reload();
  
      // Aquí puedes agregar la lógica para guardar los cambios o realizar las acciones necesarias.
  } else {
      // La opción Cancelar fue seleccionada
      console.log("Se seleccionó Cancelar.");
      // Aquí puedes manejar la situación en la que se cancela la acción.
  }
    //alert("diste click a sign out")
  
  })

//codigo para validar si hay token de inicio de sesion de usuario y renderizar o no ciertos elementos
  const validTokenUser = () =>{
    let token = localStorage.getItem("token");
    //console.log(token)
    if(token){
      document.getElementById("button_dropdown").classList.remove("d-none")
      document.getElementById("create_post__button").classList.remove("d-none")
      document.getElementById("notificationIcon").classList.remove("d-none")
      document.getElementById("buttonEdit").classList.remove("d-none")
      document.getElementById("buttonDelete").classList.remove("d-none")
      document.getElementById("login__button").classList.add("d-none")
    }else{
      document.getElementById("button_dropdown").classList.add("d-none")
      document.getElementById("create_post__button").classList.add("d-none")
      document.getElementById("notificationIcon").classList.add("d-none")
      document.getElementById("buttonEdit").classList.add("d-none")
      document.getElementById("buttonDelete").classList.add("d-none")
      document.getElementById("login__button").classList.remove("d-none")
    }
  }
  
validTokenUser()

// const URL_FIREBASE= "https://javascript29js-default-rtdb.firebaseio.com/devto/.json"

// let sectionCards =  document.getElementById("section_cards")

// const getAllPosts = async ()=>{
//     let reponse  =  fetch(URL_FIREBASE)
//     let data = await reponse.json()
//     console.log(data)
//     return data
// }

// const search = window.location.search
// //console.log(search);
// const url = new URLSearchParams(search)
// const ID_POST = url.get('id');

// const postImg = document.querySelector('#post-cover')
// const postTitle = document.querySelector('#post-title');
// const postDescription = document.querySelector('#post-description');

// const buttonEdit = document.querySelector('#buttonEdit')

//buttonEdit.dataset.post = ID_POST

//const sectionContainer = document.querySelector('#section-Container');

// const renderPost = (cardInfo) => {
//     const cardDiv = document.createElement('div');
//     const coverImg = document.createElement('img');
//     const sectionFisrt = document.createElement('section');
//     const divButton = document.createElement('div');
//     const buttonEdit = document.createElement('button');
//     const divCardBody = document.createElement('div');
//     const title = document.createElement('h1');
//     const sectionTags = document.createElement('section');
//     const ulTags = document.createElement('ul');
//     const liTags = document.createElement('li');
//     const description = document.createElement('p');

//     cardDiv.className = 'card';
//     coverImg.className = 'card-img-top';
//     coverImg.src = '/src/mago.webp'
//     sectionFisrt.className = 'poster-information__container d-flex mb-3 ps-4 pt-3 gap-3';
//     divButton.className = 'button-edit ms-auto pe-4';
//     buttonEdit.className = 'button-edit-color';
//     buttonEdit.id = 'buttonEdit';
//     // buttonEdit.dataset.post = ID_POST;
//     divCardBody.className = 'card-body';
//     title.className = 'card-title ps-4';
//     title.id = 'post-title';
//     sectionTags.className = 'hashtag__container';
//     sectionTags.id = 'post-hashtag';
//     ulTags.className = 'd-flex flex-wrap list-unstyled';
//     liTags.className = 'ps-4 me-2';
//     description.className = 'card-text ps-4';
//     description.id = 'post-description';

//     ulTags.appendChild(liTags);
//     sectionTags.appendChild(ulTags);
//     divCardBody.appendChild(title);
//     divCardBody.appendChild(sectionTags);
//     divCardBody.appendChild(description);
//     divButton.appendChild(buttonEdit);
//     sectionFisrt.appendChild(divButton);
//     sectionFisrt.appendChild(cardDiv);
//     cardDiv.appendChild(coverImg);
//     cardDiv.appendChild(sectionFisrt);
//     cardDiv.appendChild(divCardBody);

//     sectionContainer.appendChild(cardDiv);
// }

// Boton editar
// buttonEdit.addEventListener('click', (event) => {
//     console.log(window);
//     const elementToEdit = event.target.dataset.post

//     // para cambiar de vista
//     //window.location.href = 'http://127.0.0.1:5500/17-Crud/update/'
//     //window.location.href = 'http://127.0.0.1:5500/17-Crud/update/?id=' + elementToEdit + '&test=hola';
//     window.location.href = 'http://127.0.0.1:5500/edit_post/?id=' + elementToEdit
//     //window.location.pathname = '17-CRUD/update/'
// })

// // Traer informacion de ese hash
// const getInfoById = async () => {
//     //const url = URL_FIREBASE + ID_POST + '.json'
//     const url = URL_FIREBASE + '-NeugAeo2dr-wmPly7s0' + '.json'
//     console.log(url);
//     const info = await fetch(url)
//     console.log(info);

//     const parsed = await info.json()
//     console.log(parsed);

//     // Para que se muestren en los inputs
//     postImg.src = parsed.url
//     postTitle.textContent = parsed.titulo
//     postDescription.textContent = parsed.description
// }

// // console.log(getInfoById());
// getInfoById()