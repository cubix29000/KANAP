//**Page accueil, Voici l'emplacement dela section Pour Les produit avec l'ID "Items.*/
const sectionItems = document.querySelector ('#items');

/****Ci-dessus la constante "listProducts" qui se trouvera dans L'API Fetch */
fetch("http://localhost:3000/api/products")
    .then((response)=> response.json())
    .then((data) =>{
        for (const listProducts of data){
            console.log(listProducts);
            /**Insertion (création) des données API dans les élèments HTML qui ne sont pas présent dans la page front end index.html  */
            let newA = document.createElement('a');
            newA.setAttribute("href", `./product.html?id=${listProducts._id}`);
            sectionItems.appendChild(newA);

            /**Création du nouvel élèments, article pour ce site */

            let newArticle = document.createElement('article');
            newA.appendChild(newArticle);

            /*creation image du produit correspondante du produit*/

            let newImg = document.createElement('img');
            newImg.setAttribute("src", listProducts.imageUrl);
            newImg.setAttribute("alt", listProducts.altTxt);
            newArticle.appendChild(newImg);

            /*création de la classe H3 pour le nom des produits */

            let newH3 = document.createElement('h3');
            newH3.setAttribute("class", "productName");
            newH3.innerText = listProducts.name;
            newArticle.appendChild(newH3);

            /*creation de la classe P pour la description du produit */

            let newP = document.createElement('p');
            newP.setAttribute("class", "productDescription");
            newP.innerText = listProducts.description;
            newArticle.appendChild(newP);
        }
        /* methode de detection d erreur sur Fetch*/
        /*if(res.ok){
            res.json().then(data => {
                img.scr = data[0].url
            })
        }else {
            console.log("Erreur");
            document.getElementById('erreur).innerHtml = "ERREUR!!!!"
        }*/
    })