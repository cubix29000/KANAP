/**** Rappel des valeurs dans le LocalStorage // déclaration de la variable*********** */
/**** Pour obtenir l'objet dans le javascript on doit le convertir en format JSON***** */
    let productRegistrerInLocalStorage = JSON.parse(localStorage.getItem("produit"));
        console.log(productRegistrerInLocalStorage);
/****Balise pour introduire les produits ainsi que les données sélectionnées dans une balise**** */
/****....se trouvant sur la page product.html************* */
const productsPositionHtml = document.getElementById("cart__items");

/****Partie les variables pour le calcul final des quantités d 'articles présents et le prix total dans le panier ********/
let compositionProduitsPanier= [];
let totalPrice = 0;
let totalQuantity = 0;
let quantityProductPanier = 0;
let totalProductPricePanier = 0;
let mesProduits = [];
const findProducts = 0;

/******La variable pour la suppression des ID et de la Couleur selectionnée, Delete dans le panier************ */
let idDelete = 0;
let colorDelete = 0;

/******Ensuite l 'utilisateur va valider son panier, donc on déclare la variable pour validation************** */
const boutonCommander = document.getElementById("order");
let errorFormulaireFirstName = true;
let errorFormulaireLastName = true;
let errorFormulaireAddress = true;
let errorFormulaireCity = true;
let errorFormulaireEmail = true;

/*******Dans cette partie nous allons déclarer les fonctions pour le calcul des articles**********/
/*******.........lors du chargement de la page panier.html */
function totalProductsQuantity(){
    totalQuantity += parseInt(quantityProductPanier);
    console.log("Total quantité panier", totalQuantity);
    document.getElementById("totalQuantity").innerText = totalQuantity;
}