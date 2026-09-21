/* ================= CART DATA ================= */

let cart = JSON.parse(localStorage.getItem("foodCart")) || [];


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageName === "cart") {
        displayCart();
    }

    if (pageName === "checkout") {
        displayCheckout();
    }
}


/* ================= ADD TO CART ================= */

function addToCart(name, price, image) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(name + " added to cart!");

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "foodCart",
        JSON.stringify(cart)
    );

}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").innerText = count;

}


/* ================= DISPLAY CART ================= */

function displayCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <h2>🛒 Your cart is empty</h2>

                <p>Add some delicious food to continue.</p>

                <br>

                <button
                    class="orange-btn"
                    onclick="showPage('menu')">
                    Browse Menu
                </button>

            </div>
        `;

        document.getElementById("subtotal").innerText = "₹0";
        document.getElementById("total").innerText = "₹0";

        return;
    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img src="${item.image}">

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>₹${item.price} each</p>

            </div>


            <div class="quantity">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <strong>
                ₹${itemTotal}
            </strong>


            <button
                class="remove-btn"
                onclick="removeItem(${index})">
                Remove
            </button>

        `;

        container.appendChild(div);

    });


    calculateTotal();

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    updateCartCount();

    displayCart();

}


/* ================= REMOVE ITEM ================= */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    displayCart();

}


/* ================= CALCULATE TOTAL ================= */

function calculateTotal() {

    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const delivery =
        subtotal > 0 ? 40 : 0;


    const total =
        subtotal + delivery;


    document.getElementById("subtotal")
        .innerText = "₹" + subtotal;

    document.getElementById("delivery")
        .innerText = "₹" + delivery;

    document.getElementById("total")
        .innerText = "₹" + total;

}


/* ================= CLEAR CART ================= */

function clearCart() {

    if (cart.length === 0) {
        return;
    }

    const answer =
        confirm("Are you sure you want to clear your cart?");

    if (answer) {

        cart = [];

        saveCart();

        updateCartCount();

        displayCart();

    }

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        showPage("menu");

        return;
    }

    displayCheckout();

    showPage("checkout");

}


/* ================= DISPLAY CHECKOUT ================= */

function displayCheckout() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;

    container.innerHTML = "";


    cart.forEach(item => {

        const itemDiv =
            document.createElement("p");

        itemDiv.innerHTML = `
            ${item.name} × ${item.quantity}
            <strong style="float:right">
                ₹${item.price * item.quantity}
            </strong>
        `;

        container.appendChild(itemDiv);

    });


    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const delivery =
        subtotal > 0 ? 40 : 0;


    document.getElementById("payableAmount")
        .innerText = "₹" + (subtotal + delivery);

}


/* ================= PLACE ORDER ================= */

document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty!");

            showPage("menu");

            return;
        }


        const name =
            document.getElementById("customerName").value;

        const phone =
            document.getElementById("phone").value;

        const payment =
            document.getElementById("payment").value;


        const subtotal =
            cart.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );


        const total =
            subtotal + 40;


        const orderId =
            "FC" +
            Math.floor(
                10000000 +
                Math.random() * 90000000
            );


        document.getElementById("orderId")
            .innerText = orderId;

        document.getElementById("confirmName")
            .innerText = name;

        document.getElementById("confirmPhone")
            .innerText = phone;

        document.getElementById("confirmPayment")
            .innerText = payment;

        document.getElementById("confirmTotal")
            .innerText = "₹" + total;


        cart = [];

        saveCart();

        updateCartCount();


        this.reset();


        showPage("confirmation");

    });


/* ================= RESTAURANT SEARCH ================= */

function searchRestaurants() {

    const input =
        document.getElementById("restaurantSearch")
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(".restaurant-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        if (text.includes(input)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= FOOD SEARCH ================= */

function searchFood() {

    const input =
        document.getElementById("foodSearch")
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(".food-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();


        if (text.includes(input)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* ================= INITIALIZE ================= */

updateCartCount();