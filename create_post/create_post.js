const imageUrl = document.getElementById('imageUrl');
const postTitle = document.getElementById('postTitle');
const description = document.getElementById('postDescription');
const saveInfo = document.getElementById('saveInfo');
const emptyTitleAlert = document.getElementById('emptyTitleAlert');
const selectElement = document.getElementById('tags'); 
const selectedTagsContainer = document.getElementById('selectedTagsContainer'); 
const maxSelectedTags = 4;
let selectedTags = [];

const iconButton = document.getElementById("icon-index")
iconButton.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

const cancelButton = document.getElementById("cancelBtn")
cancelButton.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})

// ETIQUETAS
const tagsArray = [
    "webdev", "javascript", "beginners", "programming", "tutorial", "react", "python", "css", "frontend"
];

for (let i = 0; i < tagsArray.length; i++) {
    const tag = tagsArray[i];
    const option = document.createElement('option');
    option.value = tag;
    option.text = tag;
    selectElement.appendChild(option);
}


selectElement.addEventListener('change', function () {
    const selectedTag = selectElement.value;

    if (selectedTag && selectedTags.length < maxSelectedTags) {
        if (selectedTags.length < maxSelectedTags) {
            addSelectedTag(selectedTag);
            selectedTags.push(selectedTag);
            selectElement.value = 'Add up to 4 tags...'; 
        }
    }
});

/**
 * Agrega una etiqueta seleccionada al contenedor de etiquetas y almacena la etiqueta 
 * en el arreglo de etiquetas seleccionadas.
 *
 * @param {string} tag - La etiqueta que se va a agregar.
 */
function addSelectedTag(tag) {
    const tagDiv = document.createElement('div');
    tagDiv.classList.add('alert', 'alert-primary', 'd-inline-block');

    const tagText = document.createElement('span');
    tagText.textContent = tag;
    tagText.classList.add('me-2');

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn-close');

    removeButton.addEventListener('click', function () {
        const index = selectedTags.indexOf(tag);
        if (index !== -1) {
            selectedTags.splice(index, 1);
        }

        selectedTagsContainer.removeChild(tagDiv);
    });

    tagDiv.appendChild(tagText);
    tagDiv.appendChild(removeButton);

    selectedTagsContainer.appendChild(tagDiv);
}


const postInfo = {
    url: '',
    title: '',
    tags: [],
    description: '',
    date: '',
    reactions: '',
    dateMiliseconds: '',
}

const fechaActual = new Date();
const tiempoEnMilisegundos = fechaActual.getTime();
console.log(tiempoEnMilisegundos);

let randomNumber = Math.floor(Math.random()*50)

const postSave = async(postInfo) =>{
    const response = await fetch(URL_FIREBASE, {
        method: 'POST',
        // headers: { 'Content-type' : 'application/json;charset=UTF-8'},
        body: JSON.stringify(postInfo), 
    });
    let data = await response.json()
    console.log(response)
    return data
};




/**
 * Este evento se activa cuando el usuario hace clic en el botón "Save Changes".
 * Verifica si el campo de título no está vacío y muestra una alerta si lo está.
 * @param {Event} event - El evento click.
 */
saveInfo.addEventListener('click', async function () {
    const newTitle = postTitle.value.trim();
    const newImage = imageUrl.value.trim();
    const newDescription = description.value;

    if (newTitle === "" || newImage ==="" || newDescription ==="") { 
        emptyTitleAlert.classList.remove('d-none');
    } else {
        emptyTitleAlert.classList.add('d-none');
        postInfo.title = newTitle;
        postInfo.url = newImage;
        postInfo.description = newDescription;
        postInfo.tags = selectedTags; 
        const dateNow = new Date();
        const dateNowString = dateNow.toDateString();
        postInfo.date = dateNowString
        postInfo.dateMiliseconds = tiempoEnMilisegundos
        postInfo.reactions = randomNumber
        //console.log(newTitle);
        postSave(postInfo);
        imageUrl.value = ""
        postTitle.value = ""
        description.value = ""
        selectedTagsContainer.value = ""
        alert("Post save correctly")
        location.reload()
        // try {
        //     window.location.href = "../index.html";
        // } catch (error) {
        //     console.error("Error al guardar la información:", error);
        // }
    }
});

const URL_FIREBASE= "https://javascript29js-default-rtdb.firebaseio.com/devto/.json"



//Información INPUTS

const inputTitle = document.getElementById("postTitle");
const inputTags = document.getElementById("tags");
const inputDescription = document.getElementById("postDescription");
const textInfo = document.getElementById("textInfo");


function mostrarInformacionPorDefecto() {
    textInfo.innerHTML = `
      <span class="fw-semibold">Writing a Great Post Title</span>
      <p class="text-secondary">Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.
      Use keywords where appropriate to help ensure people can find your post by search.</p>
    `;
  }
  
  mostrarInformacionPorDefecto();

inputTitle.addEventListener("click", function() {

  textInfo.innerHTML = `
    <span class="fw-semibold">Writing a Great Post Title</span>
    <p class="text-secondary">Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.
    Use keywords where appropriate to help ensure people can find your post by search.</p>
  `;
});


inputTags.addEventListener("click", function() {

    textInfo.innerHTML = `
      <span class="fw-semibold">Tagging Guidelines</span>
      <p class="text-secondary">Tags help people find your post.
      Think of tags as the topics or categories that best describe your post.
      Add up to four comma-separated tags per post. Combine tags to reach the appropriate subcommunities.
      Use existing tags whenever possible.
      Some tags, such as “help” or “healthydebate”, have special posting guidelines.</p>
    `;
});

inputDescription.addEventListener("click", function() {

    textInfo.innerHTML = `
      <span class="fw-semibold">Editor Basics</span>
      <p class="text-secondary">Use Markdown to write and format posts.
      Commonly used syntax
      Embed rich content such as Tweets, YouTube videos, etc. Use the complete URL: {% embed https://... %}. See a list of supported embeds.
      In addition to images for the post's content, you can also drag and drop a cover image.</p>
    `;
  });

//Boton de cancelar

// const cancelBtn = document.getElementById("cancelBtn");

// cancelBtn.addEventListener("click", () => {
//     window.location.href = "../index.html";
// });

