let postsEntries =  [];

const URL_FIREBASE= "https://javascript29js-default-rtdb.firebaseio.com/devto/.json"

let sectionCards =  document.getElementById("section_cards")

let createPostButton =  document.getElementById("create_post__button")
createPostButton.addEventListener("click",()=>{
  window.open("/create_post/create_post.html", "_self");
})

const getAllPosts = async ()=>{
    let reponse  = await fetch(URL_FIREBASE)
    let data = await reponse.json()
    let transformedData =  Object.entries(data).reduce((accum, current)=>{
      return [...accum, {key: current[0], ...current[1]}]
    }, [])
    postsEntries = transformedData;
    if (postsEntries){
      printPosts(postsEntries)
    }
    console.log(postsEntries)
    console.log(data)
// return data
}

const validTokenUser = () =>{
  let token = localStorage.getItem("token");
  //console.log(token)
  if(token){
    document.getElementById("button_dropdown").classList.remove("d-none")
    document.getElementById("create_post__button").classList.remove("d-none")
    document.getElementById("notificationIcon").classList.remove("d-none")
    document.getElementById("login__button").classList.add("d-none")
    
  }else{
    document.getElementById("button_dropdown").classList.add("d-none")
    document.getElementById("create_post__button").classList.add("d-none")
    document.getElementById("notificationIcon").classList.add("d-none")
    document.getElementById("login__button").classList.remove("d-none")
  }
}

validTokenUser()


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

document.getElementById("login__button").addEventListener("click", ()=>{
  window.open("/login/login.html", "_self");
})


const logout = () => {
  localStorage.removeItem("token");
};

const createPost = (postData)=>{
  let {date, description, tags, title, url, reactions, key} = postData

  let post_container = document.createElement("div")
  post_container.classList.add("card", "mb-3")
  post_container.setAttribute("id", "post_container")

  post_container.addEventListener("click", () => {
    window.open(`/view-post/post.html?postId=${key}`, "_self");
  });

  let post_image =  document.createElement("img")
  post_image.setAttribute("id", "post_image")
  post_image.setAttribute("src", url)
  post_image.setAttribute("loading","lazy")
  post_image.classList.add("card-img-top")

  let div_body = document.createElement("div")
  div_body.classList.add("card-body")
  div_body.setAttribute("id", "div_body")

  let div_autor = document.createElement("div")
  div_autor.setAttribute("id", "div_autor")
  div_autor.classList.add("autor__container", "d-flex", "d-row", "align-items-center", "ms-1")

  let autor_image = document.createElement("img")
  autor_image.setAttribute("id", "autor_image")
  autor_image.setAttribute("src", "https://avatars.githubusercontent.com/u/126934315?v=4")
  autor_image.classList.add("autor__pic")

  let divAutor_info = document.createElement("div")
  divAutor_info.setAttribute("id", "autor_info")
  divAutor_info.classList.add("autor-info__container", "d-flex", "flex-column", "ms-2")

  let spanAutor = document.createElement("span")
  spanAutor.classList.add("autor__label")
  spanAutor.innerText = "Rudy Ramírez"

  let spanDate = document.createElement("span")
  spanDate.classList.add("date__label")
  spanDate.innerText = date

  let ancor_title = document.createElement("a")
  ancor_title.setAttribute("id", "title_post")
  //ancor_title.setAttribute("href", "...")
  ancor_title.classList.add("card-title__link", "link-underline-light", "text-dark")

  let postTitle = document.createElement("h3")
  postTitle.classList.add("card-title", "card-title-lg", "mt-3", "ms-md-5", "ms-lg-5", "d-none", "d-md-block", "d-lg-block")
  postTitle.innerText = title

  let spanTitle = document.createElement("span")
  spanTitle.classList.add("card-title", "card-title-sm", "mt-3", "ms-md-5", "ms-lg-5", "d-sm-block", "d-md-none", "d-lg-none")
  spanTitle.innerText = title

  let ulTagsList = document.createElement("ul")
  ulTagsList.setAttribute("id", "tags_list")
  ulTagsList.classList.add("tags__container", "list-unstyled", "d-flex", "flex-wrap", "ms-md-5", "ms-lg-5")

  let tagsFunction = (tags, index) =>{
    let tagResult = ""
  if(!tags || !tags[index]){
    tagResult = " "
    return tagResult
  } else {
    tagResult = `#${tags[index]}`
    return tagResult
  }
  }

  let liTag1 = document.createElement("li")
  liTag1.classList.add("p-1")
  // liTag1.innerText = `#${tags[0]}`
  liTag1.innerText = `${tagsFunction(tags, 0)}`

  let liTag2 = document.createElement("li")
  liTag2.classList.add("ms-3")
  liTag2.innerText = `${tagsFunction(tags, 1)}`

  let liTag3 = document.createElement("li")
  liTag3.classList.add("ms-3")
  liTag3.innerText = `${tagsFunction(tags, 2)}`
  
  let liTag4 = document.createElement("li")
  liTag4.classList.add("ms-3")
  liTag4.innerText = `${tagsFunction(tags, 3)}`

  let divInfoContainer = document.createElement("div")
  divInfoContainer.classList.add("info__container", "d-flex", "justify-content-between", "align-items-center", "ms-md-5", "ms-lg-5")

  let divDetailContainer = document.createElement("div")
  divDetailContainer.classList.add("detail__container", "d-flex", "align-items-center")

  let ancorReactionLink = document.createElement("a")
  ancorReactionLink.setAttribute("id", "reaction_link")
  ancorReactionLink.setAttribute("href", "")
  ancorReactionLink.classList.add("reactions__link", "link-underline-light", "d-flex", "align-items-center")

  let divReactionPicHeart = document.createElement("div")
  divReactionPicHeart.classList.add("reactions-pic__container", "reaction__pic--back", "position-relative")

  let picHeart = document.createElement("img")
  picHeart.setAttribute("src", "/src/heart.svg")
  picHeart.classList.add("reaction__pic")

  let divReactionUnicorn = document.createElement("div")
  divReactionUnicorn.classList.add("reactions-pic__container", "reaction__pic--back", "position-relative")

  let picUnicorn = document.createElement("img")
  picUnicorn.setAttribute("src", "/src/unicorn.svg")
  picUnicorn.classList.add("reaction__pic")

  let divReactionExploding = document.createElement("div")
  divReactionExploding.classList.add("reactions-pic__container", "reaction__pic--back", "position-relative")

  let picExploding = document.createElement("img")
  picExploding.setAttribute("src", "/src/exploding-head.svg")
  picExploding.classList.add("reaction__pic")

  let divReactionPicHands = document.createElement("div")
  divReactionPicHands.classList.add("reactions-pic__container", "reaction__pic--back", "position-relative")

  let picHands = document.createElement("img")
  picHands.setAttribute("src", "/src/raised-hands.svg")
  picHands.classList.add("reaction__pic")

  let divReactionFire = document.createElement("div")
  divReactionFire.classList.add("reactions-pic__container", "reaction__pic--back", "position-relative")

  let picFire = document.createElement("img")
  picFire.setAttribute("src", "/src/fire.svg")
  picFire.classList.add("reaction__pic")

  let spanReaction = document.createElement("span")
  spanReaction.classList.add("reactions__label", "text-primary-emphasis", "d-none", "d-md-inline", "d-lg-inline")
  spanReaction.innerText = `${reactions} Reactions`

  let ancorComments = document.createElement("a")
  ancorComments.classList.add("comments__link", "link-underline-light", "d-flex", "align-items-center", "ms-4")
  ancorComments.setAttribute("href", "")

  let imageComments = document.createElement("img")
  imageComments.setAttribute("src", "/src/comments.svg")
  imageComments.classList.add("comments__pic")

  let spanNumberComments = document.createElement("span")
  spanNumberComments.classList.add("number-comments__label", "text-primary-emphasis")
  spanNumberComments.innerText = "2"

  let spanCommentsCard = document.createElement("span")
  spanCommentsCard.classList.add("comments__label", "text-primary-emphasis", "d-none", "d-md-inline", "d-lg-inline")
  spanCommentsCard.innerText = "Comments"

  let divTimeContainer = document.createElement("div")
  divTimeContainer.classList.add("time__container")

  let spanTimeContainer = document.createElement("span")
  spanTimeContainer.classList.add("min-read__container", "me-2")
  spanTimeContainer.innerText = "2 min read"

  let imgBookmark = document.createElement("img")
  imgBookmark.setAttribute("src", "/src/bookmark.svg")
  imgBookmark.classList.add("bookmark__pic")

  divTimeContainer.append(spanTimeContainer,imgBookmark)
  ancorComments.append(imageComments,spanNumberComments,spanCommentsCard)
  divReactionFire.append(picFire)
  divReactionPicHands.append(picHands)
  divReactionExploding.append(picExploding)
  divReactionUnicorn.append(picUnicorn)
  divReactionPicHeart.append(picHeart)
  ancorReactionLink.append(divReactionPicHeart, divReactionUnicorn,divReactionExploding,divReactionPicHands,divReactionFire,spanReaction)
  divDetailContainer.append(ancorReactionLink,ancorComments)
  divInfoContainer.append(divDetailContainer,divTimeContainer)
  ulTagsList.append(liTag1, liTag2, liTag3, liTag4)
  ancor_title.append(postTitle, spanTitle)
  divAutor_info.append(spanAutor, spanDate)
  div_autor.append(autor_image,divAutor_info)
  div_body.append(div_autor,ancor_title,ulTagsList,divInfoContainer,)
  post_container.append(post_image,div_body)

  return post_container
}

const printPosts = async(posts)=>{
  sectionCards.innerHTML =""
  //let posts = await getAllPosts()
  posts.forEach((post) =>{
    let postEvent = createPost(post)
    sectionCards.append(postEvent)
  })
} 

//printPosts()

getAllPosts()


///codigo para el filtro
let filterDataSearch = document.getElementById("data-search");

filterDataSearch.addEventListener("keyup", (event) => {
  // let filterAlert = document.getElementById("filter-alert");
  // filterAlert.classList.add("d-none");

  let value = event.target.value;
  //console.log(value)
  let filterResult = postsEntries.filter((post) =>
    post.title.toLowerCase().includes(value.toLowerCase())
  );
  if (!filterResult.length) {
    //filterAlert.classList.remove("d-none");
    alert("no hay coincidencias")
  }
  console.log(filterResult);
  printPosts(filterResult);
});

let latestButton = document.getElementById("latestButton")
let relevantButton = document.getElementById("relevantButton")
let topButton = document.getElementById("topButton")

latestButton.addEventListener("click", ()=>{
  //alert("diste click a latest")
  let postToLatest = [...postsEntries.sort(function(a,b){
    return b.dateMiliseconds - a.dateMiliseconds
  })]
  latestButton.style.fontWeight = 'bolder';
  relevantButton.style.fontWeight = '400';
  topButton.style.fontWeight = '400';
  console.log(postToLatest)
  printPosts(postToLatest);
})

topButton.addEventListener("click", ()=>{
  //alert("diste click a top")
  let postTop = [...postsEntries.sort(function(a,b){
    return b.reactions - a.reactions
  })]
  latestButton.style.fontWeight = '400';
  relevantButton.style.fontWeight = '400';
  topButton.style.fontWeight = 'bolder';
  console.log(postTop)
  printPosts(postTop);
})

// const URL_FIREBASE =
//   "https://devs-imparables-default-rtdb.firebaseio.com/.json";

// const renderPost = (post, index) => {
//   const sectionAddCard = document.querySelector("#section_cards");

//   const post_container = document.createElement("div");
//   const post_image = document.createElement("img");
//   const body = document.createElement("div");
//   const autor = document.createElement("div");
//   const autor_image = document.createElement("img");
//   const autor_info = document.createElement("div");
//   const autor_label = document.createElement("span");
//   const date_label = document.createElement("span");
//   const ancor_title = document.createElement("a");
//   const title = document.createElement("h3");
//   const span_mobile = document.createElement("span");
//   const tags_list = document.createElement("ul");
//   const info_container = document.createElement("div");
//   const detail_container = document.createElement("div");
//   const reaction_link = document.createElement("a");
//   const reactions_pic = document.createElement("div");
//   const heart_img = document.createElement("img");
//   const reaction_pic2 = document.createElement("div");
//   const hands_img = document.createElement("img");
//   const reaction_label = document.createElement("span");
//   const comments_link = document.createElement("a");
//   const img_comments = document.createElement("img");
//   const number_coms = document.createElement("span");
//   const label_coms = document.createElement("span");
//   const void_container = document.createElement("div");
//   const time_container = document.createElement("div");
//   const min_read = document.createElement("span");
//   const img_bookmark = document.createElement("img");
//   const delete_container = document.createElement("div");
//   const delete_button = document.createElement("button");
//   const title_text = `${post.titulo}`;
//   const imagensrc = post.url;

//   sectionAddCard.className = "cards__container";
//   post_container.className = "card mt-2";

//   post_image.className = "card-img-top";
//   post_image.setAttribute("id", "post_image");
//   post_image.setAttribute("src", imagensrc);

//   body.setAttribute("id", "body");
//   body.className = "card-body";

//   autor.setAttribute("id", "autor");
//   autor.className = "autor__container d-flex d-row align-items-center ms-1";

//   autor_image.setAttribute("id", "autor_image");
//   autor_image.setAttribute("src", "/src/autor-post-1.webp");
//   autor_image.className = "autor__pic";

//   autor_info.setAttribute("id", "autor_info");
//   autor_info.className = "autor-info__container d-flex flex-column ms-2";

//   autor_label.className = "autor__label";
//   autor_label.textContent = "Chantastic";
//   date_label.className = "date__label";
//   date_label.textContent = "Jul 25";

//   ancor_title.setAttribute("id", "title_post");
//   ancor_title.className = "card-title__link link-underline-light text-dark";
//   ancor_title.setAttribute("href", "./view_post/post.html");

//   title.className =
//     "card-title card-title-lg mt-3 ms-md-5 ms-lg-5 d-none d-md-block d-lg-block";
//   title.textContent = title_text;

//   span_mobile.className =
//     "card-title card-title-sm mt-3 ms-md-5 ms-lg-5 d-sm-block d-md-none d-lg-none";
//   span_mobile.textContent = title_text;

//   tags_list.setAttribute("id", "tags_list");
//   tags_list.className =
//     "tags__container list-unstyled d-flex flex-wrap ms-md-5 ms-lg-5";

//   const tag1_text = `#${post.tags[0]}`;
//   if (tag1_text != "#undefined") {
//     const tag1 = document.createElement("li");
//     tag1.textContent = tag1_text;
//     tags_list.appendChild(tag1);
//   }
//   const tag2_text = `#${post.tags[1]}`;
//   if (tag2_text != "#undefined") {
//     const tag2 = document.createElement("li");
//     tag2.textContent = tag2_text;
//     tags_list.appendChild(tag2);
//   }
//   const tag3_text = `#${post.tags[2]}`;
//   if (tag3_text != "#undefined") {
//     const tag3 = document.createElement("li");
//     tag3.textContent = tag3_text;
//     tags_list.appendChild(tag3);
//   }

//   const tag4_text = `#${post.tags[3]}`;
//   if (tag4_text != "#undefined") {
//     const tag4 = document.createElement("li");
//     tag4.textContent = tag4_text;
//     tags_list.appendChild(tag4);
//   }

//   info_container.setAttribute("id", "info_container");
//   info_container.className =
//     "info__container d-flex justify-content-between align-items-center ms-md-5 ms-lg-5";

//   detail_container.setAttribute("id", "detail_container");
//   detail_container.className = "detail__container d-flex align-items-center";
//   reaction_link.setAttribute("id", "reaction_link");
//   reaction_link.className =
//     "reactions__link link-underline-light d-flex align-items-center";
//   reactions_pic.setAttribute("id", "reactions_pic");
//   reactions_pic.className = "reactions-pic__container z-3";
//   heart_img.setAttribute("id", "heart_img");
//   heart_img.setAttribute("src", "/src/heart.svg");
//   heart_img.className = "reaction__pic";
//   reaction_pic2.setAttribute("id", "reactions_pic2");
//   reaction_pic2.className =
//     "reactions-pic__container reaction__pic--back position-relative";
//   hands_img.setAttribute("id", "hands_img");
//   hands_img.setAttribute("src", "/src/raised-hands.svg");
//   hands_img.className = "reaction__pic";
//   reaction_label.setAttribute("id", "reaction_label");
//   reaction_label.className =
//     "reactions__label text-primary-emphasis d-none d-md-inline d-lg-inline";
//   reaction_label.textContent = "5 Reactions";
//   comments_link.setAttribute("id", "comments_link");
//   comments_link.className =
//     "comments__link link-underline-light d-flex align-items-center ms-4";
//   img_comments.setAttribute("id", "img_comments");
//   img_comments.setAttribute("src", "/src/comments.svg");
//   img_comments.className = "comments__pic";
//   number_coms.setAttribute("id", "number_coms");
//   number_coms.className = "number-comments__label text-primary-emphasis";
//   number_coms.textContent = "2";
//   label_coms.setAttribute("id", "label_coms");
//   label_coms.className =
//     "comments__label text-primary-emphasis d-none d-md-inline d-lg-inline";
//   label_coms.textContent = "Comments";
//   void_container.setAttribute("id", "void_container");
//   void_container.className = "void__container";
//   time_container.setAttribute("id", "time_container");
//   time_container.className = "time__container";
//   min_read.setAttribute("id", "min_read");
//   min_read.className = "min-read__container me-2";
//   min_read.textContent = "2 min read";
//   img_bookmark.setAttribute("id", "img_bookmark");
//   img_bookmark.setAttribute("src", "/src/bookmark.svg");
//   img_bookmark.className = "bookmark__pic";
//   delete_container.setAttribute("id","delete_container");
//   delete_container.className = "deleteButton__container";
//   delete_button.setAttribute("id","delete__button");
//   delete_button.setAttribute("type","button");
//   delete_button.className = "btn btn-outline-danger";
//   delete_button.textContent = "DeletePost";


//   sectionAddCard.appendChild(post_container);
//   post_container.appendChild(post_image);
//   post_container.appendChild(body);
//   body.appendChild(autor);
//   autor.appendChild(autor_image);
//   autor.appendChild(autor_info);
//   autor_info.appendChild(autor_label);
//   autor_info.appendChild(date_label);
//   body.appendChild(ancor_title);
//   ancor_title.appendChild(title);
//   ancor_title.appendChild(span_mobile);
//   body.appendChild(tags_list);
//   body.appendChild(info_container);
//   info_container.appendChild(detail_container);
//   detail_container.appendChild(reaction_link);
//   reaction_link.appendChild(reactions_pic);
//   reactions_pic.appendChild(heart_img);
//   reaction_link.appendChild(reaction_pic2);
//   reaction_pic2.appendChild(hands_img);
//   reaction_link.appendChild(reaction_label);
//   detail_container.appendChild(comments_link);
//   comments_link.appendChild(img_comments);
//   comments_link.appendChild(number_coms);
//   comments_link.appendChild(label_coms);
//   info_container.appendChild(void_container);
//   void_container.appendChild(time_container);
//   time_container.appendChild(min_read);
//   time_container.appendChild(img_bookmark);
//   body.appendChild(delete_container);
//   delete_container.appendChild(delete_button);
// };

// const parserResponseFireBase = (response) => {
//   const parsedResponse = [];
//   for (const key in response) {
//     const element = {
//       id: key,
//       titulo: response[key].titulo,
//       tags: response[key].tags,
//       description: response[key].description,
//       url: response[key].url,
//     };
//     parsedResponse.push(element);
//   }
//   return parsedResponse;
// };

// const renderList = (listToRender) => {
//   console.log(listToRender);
//   listToRender.forEach((post, index) => {
//     renderPost(post, index);
//   });
// };

// const getInfoApi = async () => {
//   try {
//     const response = await fetch(URL_FIREBASE, {
//       method: "GET",
//     });
//     const parsed = await response.json();
//     console.log(parsed);
//     const array_post = parserResponseFireBase(parsed);
//     postList = array_post
//     renderList(array_post);
//   } catch (error) {
//     console.error(error);
//   }
// };

// let postList = []

// getInfoApi();

// const searchButton = document.querySelector("#search__button")

// searchButton.addEventListener('click', (event)=> {
//   const searchInput = document.querySelector("#data-search")
//   const searchValue = searchInput.value

//   const filterList = []

//   for( let index = 0; index<postList.length; index++){
      
//     if (postList[index].titulo.includes(searchValue) ){
//       filterList.push(postList[index])
//     } 

//   }
//   console.log(filterList)
//   renderPost(filterList)

//   console.log(filterList)
//   })

// // const button_delete = document.createElement('#delete__button')

// // button_delete.addEventListener('click', (event) => {
// //     const elementToRemove = event.target.dataset.avatarID
// //     // console.log(event)
// //     renderList.splice(Number(elementToRemove), 1)
// //     // console.log(listAvatar)
// //     cleanList()
// //     // form()
// //     getInfoApi()
// // })

// // const search =document.querySelector('#search__button')

// // search.addEventListener('click',()=>{
// //     const searching = document.querySelector('#search__bar')

// //     console.log(searching)
// // })

// // const search_result =

// // console.log();

