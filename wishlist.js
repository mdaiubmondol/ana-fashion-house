const wishlistContainer = document.getElementById("wishlist-list");

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function loadWishlist(){

    if(!wishlistContainer) return;

    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `
            <p class="empty-cart">
                ❤️ Your Wishlist is Empty
            </p>
        `;

        return;

    }

    wishlistContainer.innerHTML = "";

    wishlist.forEach(id => {

        const product = products.find(p => p.id === id);

        if(!product) return;

        wishlistContainer.innerHTML += `

            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>৳ ${product.price}</p>

                <button
                    class="product-btn"
                    onclick="addWishlistToCart(${product.id})">

                    🛒 Add to Cart

                </button>

                <button
                    class="remove-btn"
                    onclick="removeWishlist(${product.id})">

                    ❌ Remove

                </button>

            </div>

        `;

    });

}

function addWishlistToCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            id: id,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart ✅");

}

function removeWishlist(id){

    const updatedWishlist = wishlist.filter(item => item !== id);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    location.reload();

}

loadWishlist();