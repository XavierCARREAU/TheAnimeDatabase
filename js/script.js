const url = `https://api.jikan.moe/v3`;


//logique de la barre de recherche
function searchAnime(event){
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search"); //entrée de l'utilisateur

    // console.table(query);
    
    //emission et retour recherche
    if(document.getElementById("anime").checked) {
        fetch(`${url}/search/anime?q=${query}`)
            .then((res) => res.json())
            .then(updateDom)
            .catch((err) => console.warn(err.message));
            console.log("anime");
        
    }else if(document.getElementById("manga").checked) {
        fetch(`${url}/search/manga?q=${query}`)
            .then((res) => res.json())
            .then(updateDom)
            .catch((err) => console.warn(err.message)); 
            console.log("manga")
    };
}


//affichache des resultats de la recherche
function updateDom(data){
    const searchResults = document.getElementById("search-results");
    
    searchResults.innerHTML = data.results
      .sort()
      .map((anime) => {
        return `
            <div class="card">
                <a href="${anime.url}" target="_blank">
                    <img src="${anime.image_url}" alt="Affiche de ${anime.title}">
                    <h3>${anime.title}</h3>
                </a>
            </div>
        `;
    });
}
  

    //vérification du form
function pageLoaded(){
    const form = document.getElementById("search-form");
    form.addEventListener("keyup", searchAnime);
    form.addEventListener("submit", searchAnime);
    form.addEventListener("change", searchAnime);
}   

window.addEventListener("load", pageLoaded)