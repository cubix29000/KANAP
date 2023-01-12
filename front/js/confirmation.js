// Récupération de l'orderId du produit via l' URL
const orderId = new URL(window.location).searchParams.get("order_id");

// affichage du numéro de commande
function displayOrderId(numId) {
    document.getElementById("orderId").innerText = `${numId}`;
}
displayOrderId(orderId);
