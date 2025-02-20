const products = [
    {
        id: 1,
        name: "Teclado Mecânico",
        category: "Periféricos",
        price: 650.00,
        image: "./images/teclado-mecanico.jpg",
        quantity: 2
    },{
        id: 2,
        name: "Cadeira Gamer",
        category: "Acessórios",
        price: 500.00,
        image: "./images/cadeira-gamer.jpg",
        quantity: 2
    },{
        id: 3,
        name: "Headset Bluetooth",
        category: "Periféricos",
        price: 350.00,
        image: "./images/headset.jpg",
        quantity: 2
    }
];

let discount = 0;

function renderCartItems() {
    const CartItemsSection = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const coupons = { "10DISCOUNT": 0.10, "BLACKFRIDAY": 0.20 };

    let subtotal = 0;

    CartItemsSection.innerHTML = '';

    products.forEach(product => {
        const itemTotal = product.price * product.quantity;
        subtotal += itemTotal;
        const row = document.createElement('tr');

        row.innerHTML= `
        <td>
        <div class="product">
          <img 
            src="${product.image}" 
            height="100" 
            width="100" 
            alt="${product.name}" 
          />
          <div class="info">
            <div class="name">${product.name}</div>
            <div class="category">${product.category}</div>
          </div>
        </div>
      </td>
      <td>R$ ${product.price.toFixed(2)}</td>
       <td>
          <div class="quantity">
            <button onclick="delQuantity(${product.id})">
                <i class="bx bx-minus"></i>
            </button>
            <span>${product.quantity}</span>
            <button onclick="addQuantity(${product.id})">
                <i class="bx bx-plus"></i>
            </button>
          </div>
      </td>
      <td>R$ ${itemTotal.toFixed(2)}</td>
      <td>
        <button class="remove" onclick="removeProduct(${product.id})">
          <i class="bx bx-x"></i>
        </button>
      </td> 
      `;

        CartItemsSection.appendChild(row);
    });

    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

function addQuantity(productId) {
    const product = products.find(x => x.id == productId);

    if(product){
        product.quantity++;
        renderCartItems();
    }
}

function delQuantity(productId) {
    const product = products.find(x => x.id == productId);

    if(product && product.quantity > 1){
        product.quantity--;
        renderCartItems();
    }
}

function removeProduct(productId) {
    const index = products.findIndex(x => x.id == productId);

    if(index !== -1) {
        products.splice(index, 1);
        renderCartItems();
    }
}

function applyCoupon() {
    const couponCode = document.getElementById('couponCod').value.trim().toUpperCase();
    const coupons = { "10DISCOUNT": 0.10, "BLACKFRIDAY": 0.20 };

    if (coupons[couponCode]) {
        discount = coupons[couponCode];
        alert(`Cupom aplicado: ${couponCode} (${discount * 100}% de desconto)`);
    } else {
        discount = 0;
        alert("Cupom inválido.");
    }

    renderCartItems();
}

document.addEventListener('DOMContentLoaded', renderCartItems);