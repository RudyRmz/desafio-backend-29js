const URL_FIREBASE= "https://javascript29js-default-rtdb.firebaseio.com/devto"

let queryString = location.search
console.log(queryString)

let params = new URLSearchParams(queryString)
console.log(params)

let postId = params.get("postId")
console.log(postId)

const input_url = document.querySelector("#imageUrl");
const input_tittle = document.querySelector('#postTitle');
const input_post = document.querySelector('#floatingTextarea');
const buttonSave = document.querySelector('#saveChanges');
const iconButton = document.getElementById("icon-index")
iconButton.addEventListener("click", ()=>{
    window.open("/index.html", "_self")
})


const getPostById = async (idPost) =>{
    let reponse = await fetch(`${URL_FIREBASE}/${idPost}/.json`)
    let data = await reponse.json();
    // console.log(data)
    // return(data)
    if(data){
        let {date, description, tags, title, url, reactions, key} = data
        input_url.value = url
        input_tittle.value = title
        input_post.textContent = description
    }
}

getPostById(postId)


const patchPost = async () => {
    const postInfo = {
        url: input_url.value.trim(),
        title: input_tittle.value.trim(),
        //tags: [],
        description: input_post.value,
    }
    let response = await fetch(`${URL_FIREBASE}/${postId}/.json`,
        {
        method: "PATCH",
        body: JSON.stringify(postInfo),
        }
    );
    let data = await response.json();
    console.log(data);
    return data;
    };

    buttonSave.addEventListener('click', () => {
    console.log("Guardando")
    patchPost()
    alert("The post was saved correctly")
    window.open(`/view-post/post.html?postId=${postId}`, "_self");
});

    // const updatePost = async() => {
//     const post = {
//         url : input_url,
//         title: input_tittle,
//         description: input_post,
//     };

//     const url = URL_FIREBASE + ID_POST + '.json';
//     const response = await fetch(url, {
//         method: 'PATCH',
//         body: JSON.stringify(post)
//     });
//     // if(response.status === 200){
//     //   window.location.href = 'http://127.0.0.1:5500/view_post/post.html'
//     // }
// };

    
    // buttonSave.addEventListener('click', async function () {
    //     const newTitle = input_tittle.value.trim();
    //     const newImage = input_url.value.trim();
    //     const newDescription = input_post.value;
    
    //     if (newTitle === "" || newImage ==="" || newDescription ==="") { 
    //         emptyTitleAlert.classList.remove('d-none');
    //     } else {
    //         //emptyTitleAlert.classList.add('d-none');
    //         postInfo.title = newTitle;
    //         postInfo.url = newImage;
    //         postInfo.description = newDescription;
    //         //postInfo.tags = selectedTags; 
    //         // const dateNow = new Date();
    //         // const dateNowString = dateNow.toDateString();
    //         // postInfo.date = dateNowString
    //         // postInfo.dateMiliseconds = tiempoEnMilisegundos
    //         // postInfo.reactions = randomNumber
    //         //console.log(newTitle);
    //         patchPost(postInfo);
    //         // imageUrl.value = ""
    //         // postTitle.value = ""
    //         // description.value = ""
    //         // selectedTagsContainer.value = ""
    //         alert("Post edit correctly")
    //         location.reload()
    //     }
    // });



// const URL_FIREBASE ="https://javascript29js-default-rtdb.firebaseio.com/devto"

// const search = location.search;
// const url = new URLSearchParams(search);
// const ID_POST = url.get('postId');

// const input_url = document.querySelector("#imageUrl");
// const input_tittle = document.querySelector('#postTitle');
// const input_post = document.querySelector('#floatingTextarea');
// const buttonSave = document.querySelector('#saveChanges');


// const updatePost = async() => {
//     const post = {
//         url : input_url,
//         title: input_tittle,
//         description: input_post,
//     };

//     const url = URL_FIREBASE + ID_POST + '.json';
//     const response = await fetch(url, {
//         method: 'PATCH',
//         body: JSON.stringify(post)
//     });
//     // if(response.status === 200){
//     //   window.location.href = 'http://127.0.0.1:5500/view_post/post.html'
//     // }
// };

// buttonSave.addEventListener('click', () => {
//     console.log("Guardando")
//     updatePost()
// });


// const getPostByID = async() => {
//     const url = URL_FIREBASE + ID_POST + '.json';
//     const info = await fetch(url);
//     const parsed = await info.json();
//     console.log(parsed)
//     input_url.value = parsed.url;
//     input_tittle.value = parsed.tittle;
//     input_post.value = parsed.description;
// };

// getPostByID();