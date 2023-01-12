let params = new URL(window.location).searchParams;
console.log(params);
let id = params.get("id");
console.log(id);

const itemImg = document.querySelector(".item__img");
const titleProduit = document.getElementById("title");
const priceProduit = document.getElementById("price");
const descriptionProduit = document.getElementById("description");
const couleurProduit = document.getElementById("colors");
const nombreProduitSelectionne = document.getElementById("quantity");

/**
 * La fonction recuperationInformationsProduits() permet d'envoyer une requête fetch HTTP
 * en prenant comme paramètre dans l'URL l'id du produit cliqué sur la page index.HTML.
 * Si la réponse est résolue. Elle est retournée en format textuel JSON et renvoie
 * une nouvelle promesse grâce à la méthode JSON. La 2nde promesse traite les données reçues par
 * l'intermédiaire d'une condition. C'est à dire que si la constante produitSelectionne est vrai donc qu'il y a des
 * données alors j'éxecute la fonction traitementData(produitSelectionne).
 */
function recuperationInformationsProduits() {

    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            const produitSelectionne = data;
            if (produitSelectionne) {
                traitementData(produitSelectionne);
            }
        })
        .catch(function (erreur) {
            console.log(`Erreur: ${erreur}`);
        });
}
recuperationInformationsProduits();

/**
 * La fonction traitementData(produitSelectionne) permet de traiter les données qui sont dans la constante produitSelectionne.
 * La création de l'élément HTML <img> et d'afficher les informations du produits.
 * Le choix de la couleur se fait via la boucle for...of et permet à l'utilisateur de sélectionner la couleur du produit
 * qui lui convient.
 */
function traitementData(produitSelectionne) {

    const imageDuProduit = document.createElement("img");
    itemImg.appendChild(imageDuProduit);
    imageDuProduit.setAttribute("src", produitSelectionne.imageUrl);
    imageDuProduit.setAttribute("alt", produitSelectionne.altTxt);

    titleProduit.innerHTML = produitSelectionne.name;
    priceProduit.innerHTML = produitSelectionne.price;
    descriptionProduit.innerHTML = produitSelectionne.description;

    for (let i of produitSelectionne.colors) {
        const couleurDuProduit = document.createElement("option");
        couleurProduit.appendChild(couleurDuProduit);
        couleurDuProduit.value = i;
        couleurDuProduit.innerHTML = i;
    }
    ajoutDuProduitDansPanier(produitSelectionne);
}

/**
 * La fonction ajoutDuProduitDansPanier(produitSelectionne) permet de gérer l'ajout du produit sélectionné avec la couleur choisie et
 * sa quantité dans le panier. Cet ajout se fait au clic grâce à un écouteur d'événement et il faut que la quantité soit comprise entre 0 et égal ou
 * inférieur à 100.
 * Ces informations lors du clic sur Ajouter au panier sont injecté dans le localStorage du navigateur et il y a traitement spécifique comme par exemple
 * la gestion des doublons. C'est à dire que si l'utilisateur reviens sur le même produit et choisi la même couleur mais une quantité différente. Ce produit
 * s'ajoutera à la 1ère sélection de l'utilisateur.
 */
function ajoutDuProduitDansPanier(produitSelectionne) {
    
    const ajoutProduitDansPanier = document.getElementById("addToCart");

    ajoutProduitDansPanier.addEventListener("click", function () {
        if (nombreProduitSelectionne.value > 0 && nombreProduitSelectionne.value <= 100 && nombreProduitSelectionne.value != 0) {
            let selectionDeLaCouleur = couleurProduit.value;
            let selectionDeLaQuantite = nombreProduitSelectionne.value;

            const produitsAjouteDansPanier = {
                idProduit: id,
                couleur: selectionDeLaCouleur,
                quantite: selectionDeLaQuantite,
                nom: produitSelectionne.name,
                prix: produitSelectionne.price,
                description: produitSelectionne.description,
                image: produitSelectionne.imageUrl,
                texteAlternatif: produitSelectionne.altTxt
            }
            console.log(produitsAjouteDansPanier);

            let produitDansLeLocalStorage = JSON.parse(localStorage.getItem("produits"));
            
            const lienPageCart = window.location.href = "cart.html";

            //Import du produit dans le localStorage
            //Si le panier comporte déjà un produit.
            if (produitDansLeLocalStorage) {
                const resultat = produitDansLeLocalStorage.find((element) => element.idProduit === id && element.couleur === selectionDeLaCouleur);
                //Si le produit commandé est déjà dans le panier.
                if (resultat) {
                    let nouvelleQuantite = parseInt(produitsAjouteDansPanier.quantite) + parseInt(resultat.quantite);
                    resultat.quantite = nouvelleQuantite;
                    localStorage.setItem("produits", JSON.stringify(produitDansLeLocalStorage));
                    lienPageCart;
                    //Si le produit n'est pas dans le panier
                } else {
                    produitDansLeLocalStorage.push(produitsAjouteDansPanier);
                    localStorage.setItem("produits", JSON.stringify(produitDansLeLocalStorage));
                    lienPageCart;
                }
                //Si le panier est vide
            } else {
                produitDansLeLocalStorage = [];
                produitDansLeLocalStorage.push(produitsAjouteDansPanier);
                localStorage.setItem("produits", JSON.stringify(produitDansLeLocalStorage));
                lienPageCart
            }
        }
    });
}