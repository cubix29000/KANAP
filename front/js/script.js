////On récupère les données de l' api et on les transmets----------------------
fetch("http://localhost:3000/api/products")

//// Conversion des résultat de l'API en JSON----------------------------------
    .then((res) => res.json())

//// Transmission des Données--------------------------------------------------
    .then((products) => {

//// Affichage des données via la console----------------------------------------

        console.table(products)
//// Utilisation de la fonction hydrate + paramètre "products"------------------
        hydrateProducts(products)
    })

//// Le message d'erreur --------------------------------------------------------
    .catch((err) => {
        document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>"
        console.error("[API] erreur 404 : " + err)
    })

////Affichage des produit de l' API---------------------------------------------
function hydrateProducts(products) {

//// Déclaration + Pointage de la <section> ayant pour id "#items"-------------
    const productsArea = document.querySelector("#items")

//// Pour chaque indice "product" de "products" [...]-----------------------------
    for (const product of products) {

//// Création de : a>article>img+h3+p + ajout des valeurs dynamiques de l'API--------------
        productsArea.innerHTML +=
            `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`
    }
}
