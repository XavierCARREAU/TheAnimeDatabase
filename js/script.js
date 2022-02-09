const url = `https://api.jikan.moe/v3`;

//logique de la barre de recherche
function searchAnime(event){
    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search"); //entrée de l'utilisateur

    // console.table(query);

    //emission et retour recherche
    fetch(`${url}/search/manga?q=${query}`)
      .then((res) => res.json())
      .then(updateDom)
      .catch((err) => console.warn(err.message));
}


//affichache des resultats de la recherche
function updateDom(data){
    const searchResults = document.getElementById("search-results");
    
    searchResults.innerHTML = data.results
    .sort((a,b)=>a.episodes+b.episodes)
    .map(anime=>{
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
    //vérification du submit
function pageLoaded(){
    const form = document.getElementById("search-form");
    form.addEventListener("keyup", searchAnime);
}

window.addEventListener("load", pageLoaded)