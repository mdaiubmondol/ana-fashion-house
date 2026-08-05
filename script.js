const productContainer = document.getElementById("product-list");
// ======================
// Product Image Helpers
// ======================

function getProductImage(product){

    if(product.images && product.images.length){

        return product.images[0];

    }

    return product.image || "images/no-image.png";

}

function getProductImages(product){

    if(product.images && product.images.length){

        return product.images;

    }

    if(product.image){

        return [product.image];

    }

    return ["images/no-image.png"];

}

// ======================
// Modal Image Helper
// ======================

function setModalImages(product){

    const productImages = getProductImages(product);

    const modalImage = document.getElementById("modal-image");

    const thumbnailContainer =
        document.getElementById("image-thumbnails");

    modalImage.src = productImages[0];
    modalImage.alt = product.name;

    thumbnailContainer.innerHTML = "";

    productImages.forEach((image, index) => {

        const thumbnail = document.createElement("img");

        thumbnail.src = image;
        thumbnail.alt = product.name;

        thumbnail.classList.add("image-thumbnail");

        if(index === 0){

            thumbnail.classList.add("active");

        }

        thumbnail.onclick = function(){

            modalImage.src = image;

            document
                .querySelectorAll(".image-thumbnail")
                .forEach(img => img.classList.remove("active"));

            thumbnail.classList.add("active");

        };

        thumbnailContainer.appendChild(thumbnail);

    });

}

// ======================
// Modal Name Helper
// ======================

function setModalName(product){

    document.getElementById("modal-name").innerText =
        product.name;

}
// ======================
// Modal Price Helper
// ======================

function setModalPrice(product){

    document.getElementById("modal-price").innerHTML =

        product.oldPrice

        ?

        `
        <span class="old-price">
            ৳ ${product.oldPrice}
        </span>

        <span class="new-price">
            ৳ ${product.price}
        </span>
        `

        :

        `
        <span class="new-price">
            ৳ ${product.price}
        </span>
        `;

}

// ======================
// Modal Category Helper
// ======================

function setModalCategory(product){

    document.getElementById("modal-category").innerText =
        "Category: " + product.category;

}
// ======================
// Modal Rating Helper
// ======================

function setModalRating(product){

    document.getElementById("modal-rating").innerHTML = `

        <div class="rating">

            <span class="stars">

                <span
                    class="stars-fill"
                    style="width:${(product.rating / 5) * 100}%">

                    ★★★★★

                </span>

                ★★★★★

            </span>

            <span class="rating-text">

                ${product.rating}
                (${product.reviews} Reviews)

            </span>

        </div>

        <p class="trusted">

            ✔ Trusted by 128+ Happy Customers

        </p>

    `;

}

function hasMultipleImages(product){

    return product.images && product.images.length > 1;

}
// ======================
// Modal Discount Helper
// ======================

function setModalDiscount(product){

    const discount = getDiscount(product);

    document.getElementById("modal-discount").innerHTML =

        product.sale

        ?

        `<span class="discount-badge">

            ${
                discount >= 30

                ? `⚡ ${discount}% OFF`

                : discount >= 20

                ? `🔥 ${discount}% OFF`

                : `💎 ${discount}% OFF`
            }

        </span>`

        : "";

}

// ======================
// Discount Helpers
// ======================

function getDiscount(product){

    if(!product.oldPrice) return 0;

    return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

}
// ======================
// Modal Stock Helper
// ======================

function setModalStock(product){

    document.getElementById("modal-stock").innerHTML =
        "🟢 In Stock";

}
// ======================
// Modal Description Helper
// ======================

function setModalDescription(product){

    document.getElementById("modal-description").innerText =

        product.description ||

        "Premium quality fashion product.";

}
// ======================
// Modal Cart Button Helper
// ======================

function setupCartButton(product){

    document.getElementById("modal-cart-btn").onclick = function(){

        addToCart(product.id);

        modal.classList.remove("active");

        document.getElementById("related-products-list").innerHTML = "";

    };

}
// ======================
// Related Products Helper
// ======================

function loadRelatedProducts(product){

    const relatedContainer =
        document.getElementById("related-products-list");

    const relatedProducts = products
        .filter(p => p.id !== product.id)
        .slice(0, 6);

    relatedContainer.innerHTML = "";

    relatedProducts.forEach(item => {

        relatedContainer.innerHTML += `

            <div
                class="related-card"
                onclick="openQuickView(${item.id})">

                <img
                    src="${getProductImage(item)}"
                    alt="${item.name}">

                <h4>${item.name}</h4>

                <p>৳ ${item.price}</p>

            </div>

        `;

    });

}

function getSaleBadge(product){

    if(!product.sale) return "";

    const discount = getDiscount(product);

    return `

        <div class="sale-badge">

            ${
                discount >= 30
                ? `⚡ ${discount}% OFF`
                : discount >= 20
                ? `🔥 ${discount}% OFF`
                : `💎 ${discount}% OFF`
            }

        </div>

    `;

}

// ======================
// Rating Helper
// ======================

function getRating(product){

    return `

        <p class="rating">

            <span class="stars">

                <span
                    class="stars-fill"
                    style="width:${(product.rating / 5) * 100}%">

                    ★★★★★

                </span>

                ★★★★★

            </span>

            <span class="rating-text">

                ${product.rating} | ${product.reviews} Reviews

            </span>

        </p>

    `;

}

// ======================
// Price Helper
// ======================

function getPrice(product){

    return `

        <p class="price">

            ${product.oldPrice
                ? `<span class="old-price">৳ ${product.oldPrice}</span>`
                : ""}

            <span class="new-price">

                ৳ ${product.price}

            </span>

        </p>

    `;

}

// ======================
// Cart & Wishlist
// ======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ======================
// Create Product Card
// ======================


function createProductCard(product){

    return `

        <div class="product-card">

           ${getSaleBadge(product)}

            <img src="${getProductImage(product)}" alt="${product.name}">

            <h3>${product.name}</h3>

			${getPrice(product)}

			${getRating(product)}

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

} 

function loadProducts(list = products){

    if(!productContainer) return;

    productContainer.innerHTML = list
        .map(product => createProductCard(product))
        .join("");

}
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
// ======================
// Coupon System
// ======================

let discount = 0;

const coupons = {
    AIUB100: 100,
    MONDOL500: 500,
    WELCOME50: 50
};

// ======================
// Update Cart
// ======================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let totalPrice = 0;
    let totalQuantity = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        document.getElementById("cart-subtotal").innerText = "0";
        document.getElementById("delivery-charge").innerText = "0";
        document.getElementById("discount-amount").innerText = "0";

        total.innerText = "0";
        cartCount.innerText = "0";

        return;
    }

    // Cart Items
    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return;

        totalPrice += product.price * item.quantity;
        totalQuantity += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img
                src="${getProductImage(product)}"
                alt="${product.name}">

            <div class="cart-info">

                <h4>${product.name}</h4>

                <p>৳ ${product.price}</p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${product.id})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${product.id})">+</button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${product.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    // ======================
    // Order Summary
    // ======================

    const deliveryCharge = totalQuantity > 0 ? 120 : 0;

    document.getElementById("cart-subtotal").innerText = totalPrice;
    document.getElementById("delivery-charge").innerText = deliveryCharge;
    document.getElementById("discount-amount").innerText = discount;

    const finalTotal = Math.max(
        totalPrice + deliveryCharge - discount,
        0
    );

    total.innerText = finalTotal;
    cartCount.innerText = totalQuantity;

}

// ======================
// Apply Coupon
// ======================

const applyBtn = document.getElementById("apply-coupon");

if (applyBtn) {

    applyBtn.addEventListener("click", function () {

        const code = document
            .getElementById("coupon-code")
            .value
            .trim()
            .toUpperCase();

        const message =
            document.getElementById("coupon-message");

        if (coupons[code]) {

            discount = coupons[code];

            message.innerHTML = "✅ Coupon Applied Successfully";
            message.style.color = "#4CAF50";

        } else {

            discount = 0;

            message.innerHTML = "❌ Invalid Coupon Code";
            message.style.color = "#ff5252";

        }

        updateCart();

    });

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
	
	setModalImages(product);
	
	setModalName(product);
	
	setModalPrice(product);
	
	setModalCategory(product);
    
	setModalRating(product);

	setModalDiscount(product);

	setModalStock(product);
	
	setModalDescription(product);
	
	setupCartButton(product);

	loadRelatedProducts(product);

    // ======================
    // Open Modal
    // ======================

    modal.classList.add("active");

}

// ======================
// Close Modal
// ======================

closeModal.onclick = function(){

    modal.classList.remove("active");

    document.getElementById("related-products-list").innerHTML = "";

};

window.onclick = function(e){

    if(e.target === modal){

        modal.classList.remove("active");

        document.getElementById("related-products-list").innerHTML = "";

    }

};

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
