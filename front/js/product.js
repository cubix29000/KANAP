/// On récupère de la valeur "id" dans l'URL (id=...)
const id = new URLSearchParams(window.location.search).get("id")
console.log("ID du produit à afficher :", id)

////Depuis l'API on récupère l'objet "produit"avec la méthode Fetch---------------
fetch(`http://localhost:3000/api/products/${id}`)
//****************************************************************************** */
//On récupère les données FETCH 
//   
//   let fetch = function() {
//            fetch (objectUrl)
//              .then((response) => response.json())
//              .then((data) => {
//                  console.log(data);
/////on récupère les données des images Img
//
//              let img = document.querySelector(".item__img");
//              img.innerHTML = `<img src = "${data.imageUrl}" alt="${data.altTxt">;
//
//////Les données du titre (title) de l'item 
//              let name = document.getElementById("title");
//              name.innerHTML = data.name;
//              let title = document.queryselector("title");
//              title.innerHTML = data.name; 
//              
///// Les données pour le prix
//              let price = document.getElementById("price");
//              price.innerHTML = `${data.price}`;
//
////les données pour la description
//              let descrription = document.getElementBId("description");
//              description.innerHTML = data.description;
//
////les données pour les couleurs
//              let color = document.getElementById("colors");
//              for (i = 0; i< data.colors.length; i++) {
//                  color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
//             }
//         });
//      };
//  fetch();
/***************************************************************** */
////On convertit les données de l'API en format JSON---------------
    .then((res) => res.json())

////Transmission des données avec product--------------------------        
    .then((product) => {

//// On appel la fonction "hydrateProduct" + paramètre "product" // avec un contrôle des transmission via la console     
        hydrateProduct(product)
        console.log(`Données de ${product.name} récupérées :`, product)
    })

//// Si mauvaise transmission message d erreur -------------
    .catch((err) => {
        document.querySelector(".item").innerHTML = "<h1>erreur</h1>";
        console.error("API - erreur  : " + err)
    })

//// L'affichage des produits--------------------------------------------
function hydrateProduct(product) {

//// Titre de la page : Affichage dans l'onglet de navigation------------
            document.title = `${product.name} | Kanap`

//// Nom, Prix, Description des items---------------------------------------------
            document.querySelector('#title').textContent = product.name
            document.querySelector('#price').textContent = product.price
            document.querySelector('#description').textContent = product.description

//// Image des item-------------------------------------------------------------
            const imageParent = document.querySelector(".item__img")
            const image = document.createElement("img")
            image.src = product.imageUrl
            image.alt = product.altTxt
            imageParent.appendChild(image)

//// La couleur disponibles pour les Items--------------------------------------
            const colorsParent = document.querySelector("#colors")
            const colors = product.colors
            colors.forEach((color) => {
                const colorSettings = document.createElement("option")
                colorSettings.value = color
                colorSettings.textContent = color
                colorsParent.appendChild(colorSettings)
            })
//// Appel de la fonction + transmission du paramètre "product"-----------------
            productToPurchase(product)
        }


////On fait la création de l'objet "purchase" sitot l 'intéraction du bouton "addToCart"
function productToPurchase(product) {

//// Écoute de l'élément #addToCart via méthode "addEventListener"
    const buttonAddToCart = document.querySelector('#addToCart')
    buttonAddToCart.addEventListener("click", () => {

////On fait la récupération des valeurs input de #colors & #quantity
        const color = document.querySelector('#colors').value
        const quantity = document.querySelector('#quantity').value

//// Pour l'ajout au panier on créer une classe
        const purchase = {
            id: product._id,
            color: color,
            quantity: Number(quantity),
            name: product.name
        }
        console.log(`Préparation de ${purchase.name}:`, purchase)

//// On fait le contrôle de la validité de l'achat sur la couleur et la quantité
        if (purchaseInvalid(purchase, color, quantity)) return

/**************************depuis le local storage on ajoute au panier***********************************/
        addToCart(purchase, color)

//// Réinitialisation du bouton "Ajouter au panier" après un achat, 
        resetButton()
    })
}


////On fait le contrôle des items qui ont été ajouté au panier, le tout doit être conforme sinon renvoie de message d'erreur, quantité couleur
function purchaseInvalid(purchase, color, quantity) {

//// Invalide si : Couleur non définie / Quantité inféreure à 1 ou supérieure à 100 [...]
    if (!color || quantity < 1 || quantity > 100) {
        console.error(`Erreur lors de l'ajout au Panier de ${purchase.name} ! \n Couleur et/ou Quantité invalides :`, purchase)
        alert(`Pour valider le choix de ${purchase.name} : \nVeuillez renseigner une couleur, et/ou une quantité entre 1 et 100`)
        return true
    }
}

/**************Procédure pour l'ajout des item dans le panier **********************/
function addToCart(purchase, color) {

//// Déclaration du Panier, clé "Cart" dans Local Storage
    let myCart = JSON.parse(localStorage.getItem("Cart"))

//// Si "myCart" est vide -> Création d'un tableau -> Ajout du 1er produit
    if (myCart == null) {
        myCart = []
        myCart.push(purchase)
        localStorage.setItem("Cart", JSON.stringify(myCart))
        // Confirmation de l'ajout au panier
        purchaseConfirmation(purchase)
    }

    // Ajouter d'autres produits : 1er cas de figure ->
    // Si "myCart" n'est pas vide [...]
    else if (myCart != null) {
        // Boucle sur les éléments de "myCart"
        for (i = 0; i < myCart.length; i++) {
            if (
                // Si le produit à ajouter est similaire : id/couleur
                myCart[i].id == purchase.id &&
                myCart[i].color == color
            ) {
                return (
                    // => Ajout de quantité au produit déjà dans le panier
                    myCart[i].quantity = Math.min(myCart[i].quantity + purchase.quantity, 100),
                    localStorage.setItem("Cart", JSON.stringify(myCart)),
                    // Confirmation de l'ajout au panier
                    purchaseConfirmation(purchase)
                )
            }
        }

        // Ajouter d'autres produits : 2eme cas de figure ->
        // Boucle sur les éléments de "myCart"
        for (i = 0; i < myCart.length; i++) {
            // Si produit à ajouter = ID similaire et couleur différente (OU) ID différent
            if (myCart[i].id == purchase.id &&
                myCart[i].color != color ||
                myCart[i].id != purchase.id
            ) {
                return (
                    // => Ajout d'un nouvel article dans le panier
                    myCart.push(purchase),
                    localStorage.setItem("Cart", JSON.stringify(myCart)),
                    // Confirmation de l'ajout au panier
                    purchaseConfirmation(purchase)
                )
            }
        }
    }
}

////Si toute la procédure pour l'ajout de l'item dans le panier confirmation de l'ajout 
function purchaseConfirmation(purchase) {

//// Confirmations dans la Console
    console.log(`${purchase.name} ${purchase.color} ajouté au Panier :`, purchase)
    let myCart = JSON.parse(localStorage.getItem("Cart"))
    console.log("Panier à jour :", myCart)

//// Fenêtre de confirmation dans le navigateur
    if (window.confirm(`${purchase.name} option: ${purchase.color} a bien été ajouté au panier !
        Consulter le Panier [OK] | Rester à ${purchase.name} [Annuler]`)) {
      //  window.location.href = "cart.html"*******************************************annulation de la redirection vers le panier
    } else {
        window.close
    }
    // Changement du style visuel du bouton "Ajouter au panier" (couleur/texte)
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)"
    document.querySelector("#addToCart").textContent = "Produit ajouté !"
}

//***********************Réinitialisation du bouton ajout au panier ********************/
function resetButton() {

//// On écoute "#colors"
    let colorSettings = document.querySelector("#colors");
  
//// Si évènement sur "input" ...
    colorSettings.addEventListener("input", () => {
  
//// Modification du style et texte
        document.querySelector("#addToCart").style.color = "white";
        document.querySelector("#addToCart").textContent = "Ajouter au panier";
    });
  
//// On écoute 'input[id="quantity"]'
    let quantitySettings = document.querySelector('input[id="quantity"]');
    quantitySettings.addEventListener("input", () => {
        
//// Si évènement sur "input" ...
        document.querySelector("#addToCart").style.color = "white";
        
//// Modification du style et texte
        document.querySelector("#addToCart").textContent = "Ajouter au panier";
    });
}
