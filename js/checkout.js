// ------------------------------
// Load Cart from LocalStorage
// ------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const summaryItems = document.getElementById("summary-items");
const totalPrice = document.getElementById("total-price");
const checkoutForm = document.getElementById("checkout-form");
const emptyCartMsg = document.getElementById("empty-cart-msg");
const cartSummary = document.getElementById("cart-summary");
const orderMsg = document.getElementById("order-message");

// If cart is empty
if (cart.length === 0) {
    emptyCartMsg.style.display = "block";
    cartSummary.style.display = "none";
    checkoutForm.style.display = "none";
} else {
    emptyCartMsg.style.display = "none";
    renderSummary();
}

// ------------------------------
// Render Cart Summary
// ------------------------------
function renderSummary() {
    summaryItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement("div");

        itemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
        `;

        summaryItems.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
}

// ------------------------------
// Place Order
// ------------------------------
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (!name || !email || !address || !phone) {
        alert("Please fill all fields.");
        return;
    }

    // Clear cart
    localStorage.removeItem("cart");

    // Disable form inputs
    checkoutForm.querySelectorAll("input, button").forEach(el => {
        el.disabled = true;
    });

    orderMsg.style.display = "block";
    orderMsg.textContent = "🎉 Order placed successfully! Redirecting to homepage...";

    // Redirect after 4 seconds
    setTimeout(() => {
        window.location.href = "index.html";
    }, 4000);
});
