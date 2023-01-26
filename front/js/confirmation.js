//////Confirmation de commande ///////////////////////////////////////////////////////////////////////////
const orderId = getOrderId()
displayOrderId(orderId)
cleanCache() 

////On récupère le numéro de commande /////////////////
function getOrderId() {
const urlParams = new URLSearchParams(location.search)
return urlParams.get("orderId")
//// return new URL(window.location.href).searchParams.get('orderId')
}

////On affiche un message de confirmation à l'utilisateur et on lui confirme le numéro de commande/////////
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

////Clean up du panier après l'achat.
function cleanCache() {
    const cache = window.localStorage
    cache.clear()
}
