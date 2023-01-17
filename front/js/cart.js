let produitsDansLeLocalStorage = JSON.parse(localStorage.getItem("produits"));
const cartItems = document.getElementById("cart__items");

/*****************************************************************************************************************************
La fonction afficherProduitsDuLocalStorage() permet d'afficher les produits qui ont été sélectionnés et
ajouté dans le localStorage par l'utilisateur. Je fais afficher "Le panier est vide" si il n'y a pas d'articles présents
dans celui-ci.
Je crée mes éléments HTML et affiche les données présents dans le localStorage avec une boucle for...in
*******************************************************************************************************************************/
function afficherProduitsDuLocalStorage() {

    if (produitsDansLeLocalStorage === null || produitsDansLeLocalStorage == 0) {
        const panierVide = `<p>Le panier est vide</p>`;
        cartItems.innerHTML = panierVide;
    } else {
        for (let produits in produitsDansLeLocalStorage) {

            const article = document.createElement("article");
            let dataId = document.getElementsByClassName("data-id");
            cartItems.appendChild(article);
            article.classList.add("cart__item", "data-id");
            dataId = article.setAttribute("data-id", produitsDansLeLocalStorage[produits].idProduit);

            const divParentImg = document.createElement("div");
            article.appendChild(divParentImg);
            divParentImg.classList.add("cart__item__img");

            const articleImg = document.createElement("img");
            divParentImg.appendChild(articleImg);
            articleImg.setAttribute("src", produitsDansLeLocalStorage[produits].image);

            const divCartItemContent = document.createElement("div");
            article.appendChild(divCartItemContent);
            divCartItemContent.classList.add("cart__item__content");

            const divCartItemContentTitlePrice = document.createElement("div");
            divCartItemContent.appendChild(divCartItemContentTitlePrice);
            divCartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

            const articleTitle = document.createElement("h2");
            divCartItemContentTitlePrice.appendChild(articleTitle);
            articleTitle.innerHTML = produitsDansLeLocalStorage[produits].nom;

            const couleurArticle = document.createElement("p");
            articleTitle.appendChild(couleurArticle);
            couleurArticle.innerHTML = produitsDansLeLocalStorage[produits].couleur;

            const articlePrix = document.createElement("p");
            divCartItemContentTitlePrice.appendChild(articlePrix);

/********************Affichage Prix unitaire: articlePrix.innerHTML = produitsDansLeLocalStorage[produits].prix + " €";****************/
            articlePrix.innerHTML = `${produitsDansLeLocalStorage[produits].prix * produitsDansLeLocalStorage[produits].quantite} €`;

            const divCartItemContentSettings = document.createElement("div");
            divCartItemContent.appendChild(divCartItemContentSettings);
            divCartItemContentSettings.classList.add("cart__item__content__settings");

            const divCartItemContentSettingsQuantity = document.createElement("div");
            divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
            divCartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");

            const articleQte = document.createElement("p");
            divCartItemContentSettingsQuantity.appendChild(articleQte);
            articleQte.innerHTML = "Qté : ";

            const inputQteValeur = document.createElement("input");
            divCartItemContentSettingsQuantity.appendChild(inputQteValeur);
            inputQteValeur.classList.add("itemQuantity");
            inputQteValeur.value = produitsDansLeLocalStorage[produits].quantite;
            inputQteValeur.setAttribute("type", "number");
            inputQteValeur.setAttribute("min", "1");
            inputQteValeur.setAttribute("max", "100");
            inputQteValeur.setAttribute("name", "itemQuantity");

            const divCartItemContentSettingsDelete = document.createElement("div");
            divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
            divCartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");

            const deleteItem = document.createElement("p");
            divCartItemContentSettingsDelete.appendChild(deleteItem);
            deleteItem.classList.add("deleteItem");
            deleteItem.textContent = "Supprimer";
        }
    }
}
afficherProduitsDuLocalStorage();

/*******************************************************************************************************************************
La fonction montantEtQuantiteTotalPanier() permet d'afficher la quantité et la somme totale de la commande de la ligne totale.
Elle évolue en fonction du choix de l'utilisateur qui passe la commande. 
Les valeurs (quantité et prix) peuvent diminuer en fonction
la commande en cours.
 *******************************************************************************************************************************/
function montantEtQuantiteTotalPanier() {

    const qteTotal = document.querySelectorAll(".itemQuantity");
    let totalQuantite = 0;

    for (let qte = 0; qte < qteTotal.length; qte++) {
        totalQuantite = totalQuantite + qteTotal[qte].valueAsNumber;
    }

    const quantiteTotalProduit = document.getElementById("totalQuantity");
    quantiteTotalProduit.innerHTML = totalQuantite;

    const tableauPrix = [];
    let prix = 0;

    for (let montant = 0; montant < qteTotal.length; montant++) {
        let prixTotal = produitsDansLeLocalStorage[montant].prix;
        let quantiteUnitaire = produitsDansLeLocalStorage[montant].quantite;

        prix = prixTotal * quantiteUnitaire;
        tableauPrix.push(prix);
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let prixTotal = tableauPrix.reduce(reducer, 0);

    const prixTotalProduit = document.getElementById("totalPrice");
    prixTotalProduit.innerHTML = prixTotal;
}
montantEtQuantiteTotalPanier();

/****************************************************************************************************************
La fonction modificationQuantitePanier() permet de modifier la quantité de la commande de la page cart.html. 
L'utilisateur peut soit
la réduire ou l'augmenter en fonction de son besoin. Cette modification se fait grâce à un écouteur 
d'événement qui se fait au changement
de la valeur.
*********************************************************************************************************/
function modificationQuantitePanier() {

    const modifQteProduit = document.querySelectorAll(".itemQuantity");

    let tableauQuantite = [];

    for (let quantite = 0; quantite < produitsDansLeLocalStorage.length; quantite++) {
        let qteProduit = produitsDansLeLocalStorage[quantite].quantite;
        tableauQuantite.push(qteProduit);

        modifQteProduit[quantite].addEventListener("change", (evenement) => {
            evenement.preventDefault();

            qteProduit;
            let modifQteValeur = modifQteProduit[quantite].valueAsNumber;
            console.log(modifQteValeur);

            let resultatValeurQteModifie = produitsDansLeLocalStorage.find((produit) => produit.modifQteProduit !== qteProduit);
            console.log(resultatValeurQteModifie);

            resultatValeurQteModifie.quantite = modifQteValeur;
            produitsDansLeLocalStorage[quantite].quantite = resultatValeurQteModifie.quantite;

            localStorage.setItem("produits", JSON.stringify(produitsDansLeLocalStorage));
            location.reload();
        });
    }
}
modificationQuantitePanier();

/******************************************************************************************************************************
  la fonction suppressionProduitPanier() permet de supprimer un produit du panier de la liste de commande.
  Elle s'effectue grâce à un écouteur d'événemet au clic
 *sur le bouton supprimer. 
 *******************************************************************************************************************************/
function suppressionProduitPanier() {

    let boutonSupprimer = document.querySelectorAll(".deleteItem");

    for (let suppression = 0; suppression < boutonSupprimer.length; suppression++) {

        boutonSupprimer[suppression].addEventListener("click", (event) => {
            event.preventDefault();

////////// let suppressionIdProduit = produitsDansLeLocalStorage[suppression].idProduit;///////////////////////////////////////

///////produitsDansLeLocalStorage = produitsDansLeLocalStorage.filter((produit) => produit.idProduit !== suppressionIdProduit);///////

            let suppressionProduits = produitsDansLeLocalStorage[suppression].couleur;

            produitsDansLeLocalStorage = produitsDansLeLocalStorage.filter((produit) => produit.couleur !== suppressionProduits);

            localStorage.setItem("produits", JSON.stringify(produitsDansLeLocalStorage));

            alert("Vous allez supprimer ce produit de votre panier. Valider votre choix en cliquant sur Ok !");
            location.reload();
        });
    }
}
suppressionProduitPanier();

/************************************************************************************************************
La fonction controleDuFormulaire() permet de valider ou non le contenu des champs saisis par l'utiliateur.
 Si le contenu ne corresponds. Un message apparait afin que celui-ci soit corrigé.
 ************************************************************************************************************/
function controleDuFormulaire() {

    const cartOrderForm = document.querySelector(".cart__order__form");

    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
    let adresseRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let nomPrenomVilleRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

//////////////////Ecoute d'événement sur la modification du champ Prénom//////////////////
    cartOrderForm.firstName.addEventListener("change", function () {
        validFirstName(this);
    });

///////////////Ecoute d'événement sur la modification du champ Nom///////////////////////////
    cartOrderForm.lastName.addEventListener("change", function () {
        validLastName(this);
    });

//////////////Ecoute d'événement sur la modification du champ Adresse///////////////////////////
    cartOrderForm.address.addEventListener("change", function () {
        validAddress(this);
    });

////////////////Ecoute d'événement sur la modification du champ Ville///////////////////
    cartOrderForm.city.addEventListener("change", function () {
        validCity(this);
    });

////////////Ecoute d'événement sur la modification du champ Email///////////////////////
    cartOrderForm.email.addEventListener("change", function () {
        validEmail(this);
    });

//////////////////////////validation du PRENOM////////////////////////////////////
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (nomPrenomVilleRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = "";
        } else {
            firstNameErrorMsg.innerHTML = "Format du prénom incorrect.";
        }
    };

//////////////////////validation du NOM//////////////////////////////////////////
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (nomPrenomVilleRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = "";
        } else {
            lastNameErrorMsg.innerHTML = "Format du nom incorrect.";
        }
    };

//////////////////validation de l'ADRESSE///////////////////////////////////////
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (adresseRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = "";
        } else {
            addressErrorMsg.innerHTML = "Format de l'adresse incorrect.";
        }
    };

////////////////validation de la VILLE/////////////////////////////////////////
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (nomPrenomVilleRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = "";
        } else {
            cityErrorMsg.innerHTML = "Format de la ville incorrect.";
        }
    };

/////////////////validation de l'EMAIL//////////////////////////////////////
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = "";
        } else {
            emailErrorMsg.innerHTML = "Format de la l'email incorrect.";
        }
    };
}
controleDuFormulaire();

/******************************************************************************************************************
  La fonction envoieDeLaCommande() permet d'envoyer la commande de l'utilisateur en prenant en compte un paramètre 
 important qui est l'idProduit. Cet idProduit permet
  l'envoi de la requête ainsi que le contact.
 ******************************************************************************************************************/
function envoieDeLaCommande() {

    let products = [];
    for (i = 0; i < produitsDansLeLocalStorage.length; i++) {
        products.push(produitsDansLeLocalStorage[i].idProduit)
    };
    console.log((products));

    const boutonCommander = document.getElementById("order");

    boutonCommander.addEventListener("click", (e) => {
        e.preventDefault();

        const inputFirstName = document.getElementById("firstName");
        const inputLastName = document.getElementById("lastName");
        const inputAdress = document.getElementById("address");
        const inputCity = document.getElementById("city");
        const inputMail = document.getElementById("email");

        const contact = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
        }

        const order = { contact, products };

///////////////////////////////////Création de la requête///////////////////////////////////////////////////////////////

        const requete = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                'Content-type': 'application/json'
            },
        })
    //////////////////////////////console.table(requete)/////////////////////////////////////////////////////////////////
            .then((response) => response.json())
            .then((data) => {
    //////////////////////////////console.table(data);//////////////////////////////////////////////////////////////////
                localStorage.setItem("orderId", data.orderId);
                document.location.href = `confirmation.html?id=${data.orderId}`;

            })
            .catch((erreur) => {
                alert(`Erreur: ${erreur}`);
            });
    });
}
envoieDeLaCommande();
