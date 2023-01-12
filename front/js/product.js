/////////////////////////////////////////////
// MAJ PANIER NAVBAR
/////////////////////////////////////////////

function diplayBasketTop() {
    // Appel le panier depuis le localStorage
    let basket = localStorage.getItem("basket");
    // si le panier n'est pas vide... (true)
    if (basket) {
        // transforme le panier en format JSON en javascript
        basket = JSON.parse(basket);
        // initialisation de la variable quantityTotal
        let quantityTotal = 0;
        // boucle forEach pour chaque élément du panier
        basket.forEach((element) => {
            // A chaque élément on vient ajouté la valeur de sa quantité
            quantityTotal += element.quantity;
        });
        // on récupère la nav bar constitué de deux "li"
        let productsInBasket = document.querySelectorAll("nav a li");
        //Affiche la quantité d'article dans le panier à droite de "panier"
        productsInBasket[1].innerHTML = `Panier (${quantityTotal})`;
    }
}
// appel la fonction
diplayBasketTop();

/////////////////////////////////////////////
// l'API
/////////////////////////////////////////////

// Récupération de l'id du produit via l' URL
const id = new URL(window.location).searchParams.get("id");

// Récupération du produit dans l'api et traitement des données (voir script.js)
fetch(`https://kanap-back.vercel.app/api/products/${id}`)
    // transformer la réponse en json.
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    // ce qui a été traité en json sera appelé data
    // Appel de la fonction product pour l'affichage des différentes infos
    .then((data) => {
        product(data);
    })
    // dans le cas d'une erreur remplace le contenu de titre par un h1
    // au contenu de erreur 404 et renvoit en console l'erreur.
    .catch((err) => {
        document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
        console.log("erreur 404, sur ressource api: " + err);
    });

/////////////////////////////////////////////
// AFFICHAGE DU PRODUIT
/////////////////////////////////////////////

function product(data) {
    // separateur de millier
    data.price = lisibilite_nombre(data.price);
    // utilisation de insertAdjacentHTML pour créer du nouveau contenu HTML en lieu et place
    document
        .querySelector(".item__img")
        .insertAdjacentHTML(
            "afterbegin",
            `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        );
    document
        .querySelector("#title")
        .insertAdjacentHTML("afterbegin", data.name);
    document
        .querySelector("#price")
        .insertAdjacentHTML("afterbegin", data.price);
    document
        .querySelector("#description")
        .insertAdjacentHTML("afterbegin", data.description);
    document.querySelector("#colors").insertAdjacentHTML(
        "beforeend",
        data.colors.map((color) => `<option value="${color}">${color}</option>`)
    );
    document.querySelector("title").innerText = `${data.name}`;
}

/////////////////////////////////////////////
// LOCALSTORAGE
/////////////////////////////////////////////

// Retourne le tableau du localStorage
function getBasket() {
    // variable qui stock ce que l'on appel dans le localStorage
    let basket = localStorage.getItem("basket");
    // si le panier est false (vide)
    if (!basket) {
        // retourne un tableau vide
        return [];
    } else {
        // retourne le tableau stocké dans le localStorage
        return JSON.parse(basket);
    }
}

// Sauvegarde le panier dans le localStorage
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Vérifie si la quantité et la couleur saisie est valide
function validityChoices(color, quantity) {
    // si couleur non selectionnée et si quantité négative ou égagle à 0 ou supérieur à 0
    if (color == "" && (quantity <= 0 || quantity > 100)) {
        alert("Vous n'avez pas sélectionné une couleur et une quantité valide");
        return false;
        // et si la couleur est selectionnée mais que la quantité est négative ou égagle à 0 ou supérieur à 0
    } else if (color !== "" && (quantity <= 0 || quantity > 100)) {
        alert(
            "Vous n'avez pas sélectionné une quantité ou la quantité selectionnée n'est pas valide"
        );
        return false;
        // et si la couleur n'est pas selectionnée mais que la quantité si
    } else if (color == "" && quantity !== 0) {
        alert("Vous n'avez pas sélectionné une couleur");
        return false;
        // et si la couleur est selectionné et que la quantité aussi alors tout est bon
    } else if (color !== "" && quantity !== 0) {
        return true;
    }
}

// ajoute le produitr dans le panier, puis dans le localStorage

function addBasket(product) {
    //appel de la fonction validutyChoices dans la variable chechUserChoices
    let checkUserChoices = validityChoices(product.color, product.quantity);
    // si chechUserChoices est vrai
    if (checkUserChoices == true) {
        // appel du panier depuis le localStorage
        let basket = getBasket();
        // variable qui permet de trouver dans le panier actuel si le produit est déjà deedans à l'aide de son ID et de sa couleur
        let foundProduct = basket.find(
            (p) => p._id == product._id && p.color == product.color
        );
        // si faux, on n'as donc pas le produit en question dans le panier
        if (!foundProduct) {
            // on pousse le produit dans le panier
            basket.push(product);
            // on sauvegarde le panier dans le localStorage
            saveBasket(basket);
            // message qui indique au client que le produit a été ajouté au panier
            alert("Votre article a été ajouté au panier");
            return;
            // sinon (si chechUserChoices est faux)
        } else {
            // ajout de la nouvelle quantité selectionnée

            // ajout d'une condition pour que la quantité du panier soit de 100 max par produit à venir...

            foundProduct.quantity += product.quantity;
            //
            alert("Ajout de la quantité à votre panier");
            saveBasket(basket);
        }
    }
}

// Ecoute au clic
document.getElementById("addToCart").addEventListener("click", (event) => {
    // empêche le refraichissement de la page
    event.preventDefault();
    // création de l'objet produit
    let product = {
        _id: id,
        color: document.getElementById("colors").value,
        quantity: parseInt(document.getElementById("quantity").value),
    };
    //appel de la fonction qui ajoute l'object au tableau du localStorage
    addBasket(product);
    //appel de la fonction qui affiche la quantité dans le panier en haut de la page au moment du clic
    diplayBasketTop();
});

/////////////////////////////////////////////
// FONCTION SEPARATEUR DE MILIER
/////////////////////////////////////////////

function lisibilite_nombre(nbr) {
    var nombre = "" + nbr;
    var retour = "";
    var count = 0;
    for (var i = nombre.length - 1; i >= 0; i--) {
        if (count != 0 && count % 3 == 0) retour = nombre[i] + " " + retour;
        else retour = nombre[i] + retour;
        count++;
    }
    return retour;
}
