/*******************************************************************************************************************
  La fonction affichageDesProduits() permet d'envoyer une requête HTTP de type GET à l'URL
  http://localhost:3000/api/products.
  Si la réponse est résolue. Elle est retournée en format textuel JSON et renvoie
  une nouvelle promesse grâce à la méthode JSON. La 2nde promesse permet d'extraire la réponse et de traiter
  les données reçues avec la boucle for...in. A l'intérieur de la boucle, je crée
  mes éléments HTML avec leurs attributs pour ceux qui en ont. Je fais les liens parents/enfants.
  J'affiche les données de data dans les éléments HTML 
 ********************************************************************************************************************/

function affichageDesProduits() {

  fetch('http://localhost:3000/api/products')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {

      for (let produits in data) {

        const listeDesProduits = data;
        console.log(listeDesProduits);

        const items = document.getElementById("items");
        console.log(items);

        const lienArticles = document.createElement("a");
        items.appendChild(lienArticles);
        lienArticles.href = `product.html?id=${listeDesProduits[produits]._id}`;

        const articles = document.createElement("article");
        lienArticles.appendChild(articles);

        const imageArticles = document.createElement("img");
        articles.appendChild(imageArticles);
        imageArticles.setAttribute("src", listeDesProduits[produits].imageUrl);
        imageArticles.setAttribute("alt", listeDesProduits[produits].altTxt);

        const titreArticles = document.createElement("h3");
        articles.appendChild(titreArticles);
        titreArticles.classList.add("productName");
        titreArticles.innerHTML = listeDesProduits[produits].name;

        const descriptionArticles = document.createElement("p");
        articles.appendChild(descriptionArticles);
        descriptionArticles.classList.add("productDescription");
        descriptionArticles.innerHTML = listeDesProduits[produits].description;
      }

    })
    .catch(function (error) {
      console.log(`Une erreur est survenue: ${error}`);
    })
}
affichageDesProduits();
