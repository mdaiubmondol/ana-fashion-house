const productContainer = document.getElementById("product-list");

function loadProducts(list = products) {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    list.forEach(product => {

        productContainer.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>৳ ${product.price}</p>

                <button
                    class="product-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>
        `;

    });

}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }

    saveCart();
    updateCart();

    if (cartSidebar) {
        cartSidebar.classList.add("active");
    }

}

loadProducts();

// ======================
// Cart Open / Close
// ======================

const cartSidebar = document.getElementById("cart-sidebar");
const cartButton = document.querySelector(".cart-box");
const closeCart = document.getElementById("close-cart");

if (cartSidebar && cartButton && closeCart) {

    cartButton.addEventListener("click", () => {
        cartSidebar.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });

}

function updateCart(){

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    if(cart.length === 0){

        cartItems.innerHTML =
        '<p class="empty-cart">Your cart is empty.</p>';

        total.innerText = "0";
        cartCount.innerText = "0";

        return;
    }

    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if(!product) return;

        totalPrice += product.price * item.quantity;
        totalQuantity += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${product.image}" alt="${product.name}">

            <div class="cart-info">

                <h4>${product.name}</h4>

                <p>৳ ${product.price}</p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${product.id})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${product.id})">+</button>

                </div>

                <button class="remove-btn"
                    onclick="removeItem(${product.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    total.innerText = totalPrice;
    cartCount.innerText = totalQuantity;

}


function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}

function increaseQty(id){

    const item = cart.find(p => p.id === id);

    if(item){

        item.quantity++;

        saveCart();

        updateCart();

    }

}

function decreaseQty(id){

    const item = cart.find(p => p.id === id);

    if(!item) return;

    item.quantity--;

    if(item.quantity <= 0){

        cart = cart.filter(p => p.id !== id);

    }

    saveCart();

    updateCart();

}

function removeItem(id){

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCart();

}

updateCart();

const searchInput = document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase().trim();

        const filtered = products.filter(product => {

            return (
                product.name.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword)
            );

        });

        loadProducts(filtered);

    });

}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function(){

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        const category = this.dataset.category;

        if(category === "All"){

            loadProducts(products);

            return;

        }

        const filtered = products.filter(product =>

            product.category === category

        );

        loadProducts(filtered);

    });

});

                            