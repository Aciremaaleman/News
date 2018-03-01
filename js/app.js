//traer elementos
const form = document.getElementById("search-form");
const searchField = document.getElementById("search-keyword");
const responseContainer = document.getElementById("response-container");
let searchedForText;

//agregando evento al formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value;
    getNews();
});

//funcion para crear las peticiones
function getNews() {
    const articleRequest = new XMLHttpRequest(); //crear objeto
    // Hacemos uso del método .open() y es aquí donde debemos poner la clave que llegó a nuestro correo, sustituyendo < TU KEY > por tu clave 
    articleRequest.open("GET", `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=24813fd5207a41c6a23886b02b63c07a`); //metodo open para iniciar request
    // Las propiedades .onload y .onerror tienen asignadas sus funciones correspondientes
    articleRequest.onload = addNews; // funcion ejecutada abajo en la que funciona la peticion
    articleRequest.onerror = handleError; //funcion ejecutada abajo para mostrar en consola mensaje de error
    // Enviamos la petición con el método .send()
    articleRequest.send(); //envia peticion al servidor
};

// funcion error
function handleError() {
    console.log("se ha producido un error");
};

//funcion para agregar noticias 
function addNews() {
    const data = JSON.parse(this.responseText); //objeto de la data
    const response = data.response.docs; //arreglo de objetos 
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;
    const arraySplice = response.splice(0, 5); // array con los objetos seleccionados de acuerdo a los indices 

    response.forEach((element, index, array) => {

        const snippet = element.snippet; //accediendo a la propiedad snippet del arreglo
        // const multiMedia = element.multimedia; //accediendo a los objetos multimedia del arreglo
        // const img = element.web_url;//accediendo a la imagen

        let li = document.createElement("li");
        li.className = "articleClass";
        li.innerText = snippet;

        responseContainer.appendChild(li);
    });

    // let li = document.createElement('li');
    // li.className = 'articleClass';
    // li.innerText = snippet;
    // responseContainer.appendChild(li);
};
