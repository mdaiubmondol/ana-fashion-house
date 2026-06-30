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
				class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}"
				onclick="toggleWishlist(${product.id})">

				<i class="fa-solid fa-heart"></i>

				</button>
				
				<button
				class="product-btn"
				onclick="openQuickView(${product.id})">

				👁️ Quick View

				</button>
				
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

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

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
	showToast();

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

function showToast(){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}

function toggleWishlist(id){

    const exists = wishlist.includes(id);

    if(exists){

        wishlist = wishlist.filter(item => item !== id);

    }else{

        wishlist.push(id);

    }

	localStorage.setItem("wishlist", JSON.stringify(wishlist));

	loadProducts();

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

// ======================
// Back To Top Button
// ======================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

      if (cart.length === 0) {

			alert("Your cart is empty!");

		return;

		}

		const customerName = document.getElementById("customer-name").value.trim();

		const customerPhone = document.getElementById("customer-phone").value.trim();

		const customerAddress = document.getElementById("customer-address").value.trim();

		if (!customerName || !customerPhone || !customerAddress) {

			alert("Please fill in your Name, Phone Number and Address.");

			return;

		}

		let message =
		"*Ana Fashion House Order*%0A%0A" +
		"Customer Information%0A" +
		"------------------------%0A" +
		"Name: " + customerName + "%0A" +
		"Phone: " + customerPhone + "%0A" +
		"Address: " + customerAddress + "%0A%0A" +
		"Order Details%0A" +
		"------------------------%0A";
        let total = 0;

        cart.forEach(item => {

            const product = products.find(p => p.id === item.id);

            if (!product) return;

            const subtotal = product.price * item.quantity;

            total += subtotal;

            message += `• ${product.name} x${item.quantity} = ৳${subtotal}%0A`;

        });

        message +=
		"%0A------------------------%0A" +
		"Total: ৳" + total +
		"%0A%0AThank you for shopping with Ana Fashion House.";

        window.open(
            `https://wa.me/8801889418203?text=${message}`,
            "_blank"
        );
		cart = [];

		saveCart();

		updateCart();

		document.getElementById("customer-name").value = "";

		document.getElementById("customer-phone").value = "";

		document.getElementById("customer-address").value = "";

    });

}
// ======================
// Quick View Modal
// ======================

const modal = document.getElementById("quick-view-modal");
const closeModal = document.getElementById("close-modal");

function openQuickView(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.name;

    document.getElementById("modal-name").innerText = product.name;

    document.getElementById("modal-price").innerText =
        "৳ " + product.price;

    document.getElementById("modal-category").innerText =
        "Category: " + product.category;

    document.getElementById("modal-description").innerText =
        product.description || "Premium quality fashion product.";

    document.getElementById("modal-cart-btn").onclick = function(){

        addToCart(product.id);

        modal.classList.remove("active");

    };

    modal.classList.add("active");

}

if(closeModal){

    closeModal.addEventListener("click", function(){

        modal.classList.remove("active");

    });

}

window.addEventListener("click", function(e){

    if(e.target === modal){

        modal.classList.remove("active");

    }

});
