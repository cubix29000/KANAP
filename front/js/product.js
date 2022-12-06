/***Dans L'URL on récupère La chaine de requête */
const queryStringUrl = window.location.search;
console.log(queryStringUrl);


/*******************Dans cette partie on extrait l ID de l'URL **********************/
const urlID = new URLSearchParams(queryStringUrl);
console.log(urlID);
const productID = urlID.get("id");


/*** Récupération de l'ID et installation de la constante de L' ID des produits (productID)*****/
const productId = new URLSearchParams(document.location.search);
console.log(productId);
const ID = productId.get("id");
console.log(ID);
/**Récupération des données de l'API avec l'ID et la méthode Fetch */
if (productId !== null) {
    fetch(`http://localhost:3000/api/products/${ID}`)
        .then((response) => response.json())
        .then((selectProduct) => {
            console.log(selectProduct);
            /***Les données(descriptifs, nom, couleurs...) vont sur la page des product.html*****/
            /**On inscrit le nom du canapé dans le titre du navigateur **/
            document.title = selectProduct.name;
            /****On note la mise en place de IMG / Title / Price / Description depuis les données de l'API */

            let newImg = document.createElement('img');

            document.getElementsByClassName("item__img")[0].appendChild(newImg);
            newImg.src = selectProduct.imageUrl;
            newImg.alt = selectProduct.altTxt;
            document.getElementById("title").innerText = selectProduct.name;
            document.getElementById("price").innerText = selectProduct.price + " ";
            document.getElementById("description").innerText = selectProduct.description;

            /***Ci-dessous nous trouverons la boucle pour ajouter et ainsi faire la selection des couleurs pour le selecteur du HTML déjà présent ***/

            selectProduct.colors.forEach(function (color) {
                const option = document.createElement("option");
                const select = document.getElementById("colors");

                /*****Récupération des options de couleurs dans les données de l'API ******/
                option.value = color;
                option.innerText = color;

                /***Fonction pour l'ajout select dans L'Html, il s agit d une option *************************/
                select.appendChild(option);
            })
            /******la partie quand l'utilisateur selection le produit/la couleurs et la quantité désirée, c'est le résumé de sa selection qui sont récupérée et envoyée au panier******** */

            /***Lors de la selection du bouton Ajouter au panier */
            const selectBoutonPanier = document.querySelector('#addToCart');

            /*******L'évènement : l'intéraction avec le bouton panier qui va trasnférer le choix de l'utilisateur dans le panier ******/
            selectBoutonPanier.addEventListener("click", (event) => {
                event.preventDefault();
                //**enregistrement de L'ID pour le choix de couleur de l'utilisateur */
                const colorId = document.querySelector("#colors");
                const choiceColor = colorId.value;
                //***Retenu de l'ID pour la Quantité choisis par l 'utilisateur // Cet ID doit être mis dans une variable ***********/
                const quantity = document.querySelector("#quantity"); /*c'est le boutton quantité.*/
                const choiceQuantity = Number(quantity.value);

                /********Dans cette étape, une fois la quantité - la couleur selectionné par le client, les données sont récupérées ********/
                /********On récupère l'ID la couleur et la quantité  *************/
                /****On utilise IF (valeur Booléenne, si valeur fausse elle sera ignorée******/
                if (choiceColor !== "" && choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)) {
                    let optionsProduct = {
                        idProduct: selectProduct._id,
                        colorProduct: choiceColor,
                        quantityProduct: choiceQuantity
                    }
                    console.log("selectBoutonPanier.click", optionsProduct);
                    
                    /***comme pour la prochaine étape, les données doivent être vérifiées dans ma booléenne si une erreur sur les donées résult par un False  ************/
                    /****un message d erreur doit être émis si les données sont FALSE  **********/
                    /*****DAns une premier temps mise en place d un sytème de contrôle lors de l 'ajout d'un item. Nous allons utiliser une variable pour s assurer que l'élèment  */
                    /*****saisie respect les normes. En utilisant la proprièté "Local Storage" cela nous permet d'avoir un objet de stockage différents *******/
                  
                    const addProductLocalStorage = () => {
                        let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
                        /***après vérification, si les données correspondent au LoacalStorage selection de la quantité  ******/
                        let findProduct = produitEnregistreDansLocalStorage?.find((product) => { return product.idProduct === optionsProduct.idProduct && product.colorProduct === optionsProduct.colorProduct });
                        if (findProduct) {
                            console.log("findProduct", findProduct)
                            const total = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
                            if (total <= 100) {
                                /****message de confirmation pour la mise à jour de la couleur et de la quantité, on intégre une variable********/
                           
                                findProduct.quantityProduct = Number(findProduct.quantityProduct) + Number(optionsProduct.quantityProduct);
                                console.log("update", findProduct);
                                 /********Envoi des informations Dans le LocalStorage, envoie des inforamtions de l 'Item /////Modification en format .JSON  */
                                localStorage.setItem("produit", JSON.stringify(findProduct));
                                alert('La mise à jour du produit ${selectProduct.name} et de la couleur ${choiceColor} a été effectuée avec succès!');
                            }
                            else {
                                /***un message d erreur doit s'afficher si l'utilisateur dépasse la quantité maximale de 100 unités */
                               
                                alert("La quantité produit n'est pas conforme, veuillez modifier votre sélection. Merci");
                            }
                        }
                        /*****Si item n'existe pas dans le local storage, ajout du produit(ID)+ l'option(couleur)*******/
                        /***** le message ira sur True dans la variable***** */
                        /****Le'enregistrement des produit ira dans une variable, permet de suivre les options************** */
                        else {
                            console.log("add", optionsProduct);
                             /********Envoi des informations Dans le LocalStorage, envoie des inforamtions de l 'Item /////Modification en format .JSON  */
                            localStorage.setItem("produit", JSON.stringify(optionsProduct));
                        }
                       
                    }
                    addProductLocalStorage();
                    /***************************Ligne 95 dernière ligne, FIN de la fonction addProductLocalStorage *******************************/                   
                }
                /***** Pas d'erreur c'est Lessieur ************/
                else {
                    alert(`Selection non valide veuillez contrôler votre choix et recommencer. Merci`);
                }

            });
        })
}
else {
    console.log("L'ID du produit introuvable");
    alert(`Le produit est introuvable! `);
    window.location.href = "index.html";
}
