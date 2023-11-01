const addBtn = document.querySelector("#add-btn");
const moviesContainer = document.querySelector("#movies");
const inputText = document.querySelector("#input-name");
const deleteBtns = document.querySelectorAll(".deleteBtn");
const randomBtn = document.querySelector("#random-btn")
const offCanvasTitle = document.querySelector(".offcanvas-title")
const offCanvasBody = document.querySelector(".offcanvas-body")
const watchButton = document.querySelector("#watch-btn")
const canvasText = document.querySelector(".offcanvas-body-text")


let movies = [];


addBtn.addEventListener("click",addItem);

    if (localStorage.getItem("movies") !== null) {
        movies = JSON.parse(localStorage.getItem("movies"));
    }

    inputText.addEventListener("keypress",function(e){
    if (e.key === "Enter") {
      addBtn.click();
      }
})


function addItem(){

    if(inputText.value!=""){
        movies.push(inputText.value);
    }
    inputText.value = "";
    showMovies();
    localStorage.setItem("movies", JSON.stringify(movies));
}


showMovies();
function showMovies(){
    
    moviesContainer.innerHTML="";
    
    for (const movie of movies) {
        let movieCard = `
        <li class="list-group-item mb-3 d-flex justify-content-between"><span>${movie}</span>
        <i onclick="deleteItem(this)" class="fa-solid fa-xmark deleteBtn"></i></li>
        `;
        moviesContainer.insertAdjacentHTML("beforeend",movieCard);
    };
};


function deleteItem(input){

    let movieName = input.previousElementSibling.textContent;
    const index = movies.indexOf(movieName);
    if(index > -1) {
        movies.splice(index, 1);
    }

    showMovies();
    localStorage.setItem("movies", JSON.stringify(movies));
}


randomBtn.addEventListener("click",function(){

    const random = Math.floor(Math.random() * movies.length);

    for (const movie of moviesContainer.children) {
        if(movie.firstChild.textContent===movies[random]){

            movie.classList.add("active")
            offCanvasTitle.innerText = movie.firstChild.innerText
            // offCanvasBody.firstChild.innerText = `"Seçilen film ${movie.firstChild.innerText}. If you press the watch button the movie will be removed from the list.`
            canvasText.innerHTML = `Selected movie is <strong>${movie.firstChild.innerText}</strong>. If you press the watch button the movie will be removed from the list.`
        }
    }
})


watchButton.addEventListener("click",function(){

    for (const movie of moviesContainer.children) {
    
        if(movie.classList.contains("active")){
         
            let movieName = movie.firstChild.textContent;

            const index = movies.indexOf(movieName);
            if(index > -1) {
                movies.splice(index, 1);
            }
 
            showMovies();
            localStorage.setItem("movies", JSON.stringify(movies));
     
        }
    }       
})
   
