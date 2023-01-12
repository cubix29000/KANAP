/**
 * La fonction receptionDuNumeroDeCommande permet d'envoyer à l'utilisateur d'envoyer son numéro de commande.
 * Toute trace de la commande est supprimée du localStorage par mesure de sécurité.
 */
function receptionDuNumeroDeCommande() {
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = localStorage.getItem("orderId");
    localStorage.clear();
  }
  receptionDuNumeroDeCommande();