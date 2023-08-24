// show cart on selectionne le panier
(function () {
  const cartInfos = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfos.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });
})();

// add items to the cart on selectionne le conatiner des produits
(function () {
  const cartBtn = document.querySelectorAll(".store-item-icon");
  cartBtn.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      //   console.log(event.target);
      //on s'assure nd'avoir cliquer sur l'icone i et que sont parent soit le spande class store-item-icon
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        //on recuprer la source de l'image
        let fullPath = event.target.parentElement.previousElementSibling.src;
        //on index un nouveau chemin pour retirer img du chemin initiale
        let pos = fullPath.indexOf("img") + 3;

        // on coupe l'ancien chemin pour ne retenir que le nom de l'image
        let partPath = fullPath.slice(pos);

        // on creer l'objet qui vas contenir les coordonnees du produits choisie
        const item = {};

        // on cree la nouvelle route de l'image
        item.img = `img-cart${partPath}`;

        // on selectionne le nom
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;

        // on ajoute le nom a l'objet
        item.name = name;

        // on recupre le prix
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;

        // on supprime l'espace avant le chiffre du prix
        let finalPrice = price.slice(1).trim();

        console.log(finalPrice);

        // on ajoute le prix a l'objet
        item.price = finalPrice;

        // console.log(item);

        // creer le panier
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );

        cartItem.innerHTML = `
         
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
         
         `;
        // selectionner le panier
        const cart = document.getElementById("cart");

        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);
        alert("item ajoutee au panier");

        //Pour le total
        showTotals();
      }
    });
  });

  // montrer le total

  function showTotals() {
    // oncree l'objet total
    const total = [];

    //on selectionne tous les prix
    const items = document.querySelectorAll(".cart-item-price");

    // pour chaque prix on fait
    items.forEach(function (item) {
      //on integre les nombre au total

      // parseFloat permet de convertir des strings en numbers
      total.push(parseFloat(item.textContent));
    });

    // console.log(total);

    // la methode pour additionner tout les nombres de l'objet total
    const totalMoney = total.reduce(function (total, item) {
      total += item;
      return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);

    // on ajoute le montant total
    document.getElementById("cart-total").textContent = finalMoney;
    document.querySelector(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;

    console.log(totalMoney);
  }
})();
