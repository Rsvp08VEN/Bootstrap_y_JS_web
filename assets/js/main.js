document.addEventListener("DOMContentLoaded", function() {
  const pizzas = [
    {
      "itemId": "PZ1",
      "name": "Margarita Pizza",
      "price": 10,
      "image": "./assets/img/pizza_margarita.jpg",
      "toppings": ["Tomate", "Mozzarella", "Albahaca"],
      "sizes": [
        { "size": "Pequeña", "price": 10 },
        { "size": "Mediana", "price": 15 },
        { "size": "Grande", "price": 20 }
      ]
    },
    {
      "itemId": "PZ2",
      "name": "Pepperoni Pizza",
      "price": 12,
      "image": "./assets/img/pizza_peperoni.jpg",
      "toppings": ["Pepperoni", "Tomate", "Mozzarella"],
      "sizes": [
        { "size": "Pequeña", "price": 12 },
        { "size": "Mediana", "price": 17 },
        { "size": "Grande", "price": 22 }
      ]
    },
    {
      "itemId": "PZ3",
      "name": "Hawaiana Pizza",
      "price": 13,
      "image": "./assets/img/pizza_hawaiana.jpeg",
      "toppings": ["Piña", "Jamon", "Tomate", "Mozzarella"],
      "sizes": [
        { "size": "Pequeña", "price": 13 },
        { "size": "Mediana", "price": 18 },
        { "size": "Grande", "price": 23 }
      ]
    },
    {
      "itemId": "PZ4",
      "name": "Cuatro Quesos Pizza",
      "price": 14,
      "image": "./assets/img/pizza_4_quesos.jpeg",
      "toppings": ["Mozzarella", "Gorgonzola", "Parmesano", "Ricotta"],
      "sizes": [
        { "size": "Pequeña", "price": 14 },
        { "size": "Mediana", "price": 19 },
        { "size": "Grande", "price": 24 }
      ]
    },
    {
      "itemId": "PZ5",
      "name": "Vegetariana Pizza",
      "price": 12,
      "image": "./assets/img/pizza_vegetariana.jpeg",
      "toppings": ["Tomate", "Pimientos", "Cebolla", "Aceitunas", "Mozzarella"],
      "sizes": [
        { "size": "Pequeña", "price": 12 },
        { "size": "Mediana", "price": 17 },
        { "size": "Grande", "price": 22 }
      ]
    },
    {
      "itemId": "PZ6",
      "name": "Barbacoa Pizza",
      "price": 15,
      "image": "./assets/img/pizza_barbacoa.jpg",
      "toppings": ["Salsa Barbacoa", "Ternera", "Bacon", "Cebolla", "Mozzarella"],
      "sizes": [
        { "size": "Pequeña", "price": 15 },
        { "size": "Mediana", "price": 20 },
        { "size": "Grande", "price": 25 }
      ]
    }
  ];

  const pizzaContainer = document.getElementById("pizza-container");
  const cartContainer = document.getElementById("cart-container");
  const cart = [];

  pizzas.forEach(pizza => {
    const pizzaCard = document.createElement("div");
    pizzaCard.classList.add("col-xs-4", "col-md-4");
    pizzaCard.innerHTML = `
      <div class="card p-3 m-3">
        <a href="#"><img src="${pizza.image}" class="img-fluid"></a>
        <div class="card-body text-center">
          <h5 class="card-text">${pizza.name}</h5>
          <p>${pizza.toppings.join(", ")}</p>
          <select class="form-select mb-2" data-id="${pizza.itemId}">
            ${pizza.sizes.map(size => `<option value="${size.price}">${size.size} - $${size.price}</option>`).join('')}
          </select>
          <button class="btn btn-success" data-id="${pizza.itemId}">Agregar al carrito</button>
        </div>
      </div>
    `;
    pizzaContainer.appendChild(pizzaCard);
  });

  pizzaContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      const pizzaId = event.target.getAttribute("data-id");
      const selectedPizza = pizzas.find(pizza => pizza.itemId === pizzaId);
      const selectElement = pizzaContainer.querySelector(`select[data-id="${pizzaId}"]`);
      const selectedSizeIndex = selectElement.selectedIndex;
      const selectedSize = selectedPizza.sizes[selectedSizeIndex];
      const pizzaToAdd = {
        ...selectedPizza,
        size: selectedSize.size,
        price: selectedSize.price
      };
      cart.push(pizzaToAdd);
      updateCart();
    }
  });

  function updateCart() {
    cartContainer.innerHTML = "";
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("row");
      cartItem.innerHTML = `
        <div class="col-md-7 m-3 p-2 d-flex justify-content-center align-content-center flex-column align-items-center">
          <h5>${item.name} (${item.size})</h5>
          <p>${item.toppings.join(", ")}</p>
        </div>
        <div class="col-md-3 m-3 p-2 d-flex justify-content-center align-content-center flex-column align-items-center">
          <p>Precio: $${item.price}</p>
          <button class="btn btn-danger" data-index="${index}">Eliminar</button>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });
  }

  cartContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      const itemIndex = event.target.getAttribute("data-index");
      cart.splice(itemIndex, 1);
      updateCart();
    }
  });

  document.getElementById("checkout").addEventListener("click", function() {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega algunas pizzas antes de realizar la compra.");
      return;
    }

    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price;
      const itemSummary = document.createElement("p");
      itemSummary.textContent = `${item.name} (${item.size}) - $${item.price}`;
      modalBody.appendChild(itemSummary);
    });

    const totalSummary = document.createElement("h5");
    totalSummary.textContent = `Total: $${total}`;
    modalBody.appendChild(totalSummary);

    const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
    checkoutModal.show();

    document.getElementById("confirm-purchase").addEventListener("click", function() {
      alert("Compra realizada con éxito!");
      cart.length = 0; // Vaciar el carrito
      updateCart();
      checkoutModal.hide();
    });
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("view-menu").addEventListener("click", function() {
            document.getElementById("content").scrollIntoView({ behavior: 'smooth' });
        });
    });
  });
});
