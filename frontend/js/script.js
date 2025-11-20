// -------------------------------
// PRODUCT LIST
// -------------------------------
const products = [
  { id: 1, name: "Smartphone 1", price: 110, category: "Electronics", image: "images/smartphone.jpg" },
  { id: 2, name: "Laptop", price: 120, category: "Electronics", image: "images/laptop.jpg" },
  { id: 3, name: "Headphones", price: 130, category: "Electronics", image: "images/headphones.jpg" },
  { id: 4, name: "Smartwatch", price: 140, category: "Electronics", image: "images/smartwatches.jpg" },
  { id: 10, name: "Camera", price: 200, category: "Electronics", image: "images/camera.jpg" },

  { id: 11, name: "T-Shirt", price: 110, category: "Fashion", image: "images/t-shirt.jpg" },
  { id: 12, name: "Jeans", price: 120, category: "Fashion", image: "images/jeans.jpg" },
  { id: 13, name: "Sneakers", price: 130, category: "Fashion", image: "images/sneakers.jpg" },
  { id: 14, name: "Jacket", price: 140, category: "Fashion", image: "images/jacket.jpg" },
  { id: 15, name: "Dress", price: 150, category: "Fashion", image: "images/dress.jpg" },

  { id: 21, name: "Face Cream", price: 110, category: "Beauty", image: "images/face_cream.jpg" },
  { id: 22, name: "Lipstick", price: 120, category: "Beauty", image: "images/lipstick.jpg" },
  { id: 23, name: "Perfume", price: 130, category: "Beauty", image: "images/perfume.jpg" },
  { id: 24, name: "Shampoo", price: 140, category: "Beauty", image: "images/shampoo.jpg" },
  { id: 25, name: "Conditioner", price: 150, category: "Beauty", image: "images/conditioner.jpg" },

  { id: 31, name: "Mixer Grinder", price: 210, category: "Home & Kitchen", image: "images/mixer.jpg" },
  { id: 32, name: "Non-stick Pan", price: 220, category: "Home & Kitchen", image: "images/pan.jpg" },
  { id: 33, name: "Air Fryer", price: 230, category: "Home & Kitchen", image: "images/airfryer.jpg" },
  { id: 34, name: "Blender", price: 240, category: "Home & Kitchen", image: "images/blender.jpg" },
  { id: 35, name: "Coffeemaker", price: 250, category: "Home & Kitchen", image: "images/coffeemaker.jpg" },

  { id: 51, name: "Basmati Rice", price: 70, category: "Grocery", image: "images/rice.jpg" },
  { id: 52, name: "Sunflower Oil", price: 80, category: "Grocery", image: "images/oil.jpg" },
  { id: 53, name: "Wheat Flour", price: 90, category: "Grocery", image: "images/flour.jpg" },
  { id: 54, name: "Tur Dal", price: 100, category: "Grocery", image: "images/dal.jpg" },
  { id: 55, name: "Sugar", price: 60, category: "Grocery", image: "images/sugar.jpg" },
  { id: 56, name: "Salt", price: 40, category: "Grocery", image: "images/salt.jpg" },
  { id: 58, name: "Tea Pack", price: 110, category: "Grocery", image: "images/tea.jpg" },

  { id: 91, name: "Dog Food", price: 700, category: "Pet Supplies", image: "images/dogfood.jpg" },
  { id: 92, name: "Cat Litter", price: 400, category: "Pet Supplies", image: "images/catlitter.jpg" },
  { id: 93, name: "Pet Shampoo", price: 300, category: "Pet Supplies", image: "images/petshampoo.jpg" },
  { id: 94, name: "Chew Toy", price: 150, category: "Pet Supplies", image: "images/chewtoy.jpg" },
  { id: 95, name: "Dog Leash", price: 350, category: "Pet Supplies", image: "images/leash.jpg" },
  { id: 96, name: "Cat Scratcher", price: 500, category: "Pet Supplies", image: "images/scratcher.jpg" },
  { id: 97, name: "Pet Bed", price: 900, category: "Pet Supplies", image: "images/bed.jpg" },
  { id: 98, name: "Pet Bowl", price: 200, category: "Pet Supplies", image: "images/bowl.jpg" }
];

// -------------------------------
// GLOBAL VARIABLES
// -------------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCategories();
  renderCart();
  setupCartButton();
});

// -------------------------------
// RENDER PRODUCTS
// -------------------------------
function renderProducts(category = "all") {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";

  const filtered = category === "all" ? products : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button>Add to Cart</button>
    `;

    card.querySelector("button").addEventListener("click", () => addToCart(product.id));

    card.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") showProductDetails(product.id);
    });

    productContainer.appendChild(card);
  });
}

// -------------------------------
// PRODUCT DETAILS
// -------------------------------
function showProductDetails(id) {
  const p = products.find(prod => prod.id === id);
  const productContainer = document.getElementById("product-list");
  if (!p) return;

  productContainer.innerHTML = `
    <div class="details-box">
      <img src="${p.image}">
      <div>
        <h2>${p.name}</h2>
        <p><strong>Price:</strong> ₹${p.price}</p>
        <button id="buy">Add to Cart</button>
        <button id="back">Back</button>
      </div>
    </div>
  `;

  document.getElementById("buy").onclick = () => addToCart(p.id);
  document.getElementById("back").onclick = () => renderProducts();
}

// -------------------------------
// CART FUNCTIONS
// -------------------------------
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...p, quantity: 1 });

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  if (!cartItemsDiv || !cartTotalSpan) return;

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalSpan.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-row";

    div.innerHTML = `
      ${item.name} x${item.quantity}
      <button onclick="removeFromCart(${item.id})" style="color:red;">X</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  cartTotalSpan.textContent = total;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------------
// CATEGORY BUTTONS
// -------------------------------
function renderCategories() {
  const navDiv = document.querySelector("header nav div");
  const categories = ["all", ...new Set(products.map(p => p.category))];

  navDiv.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.onclick = () => renderProducts(cat);
    navDiv.appendChild(btn);
  });
}

// -------------------------------
// CART BUTTON
// -------------------------------
function setupCartButton() {
  const cartPanel = document.getElementById("cart-panel");

  const btn = document.createElement("button");
  btn.textContent = "🛒 Cart";
  btn.classList.add("cart-floating-btn");

  document.body.appendChild(btn);

  btn.onclick = () => {
    cartPanel.style.display = cartPanel.style.display === "block" ? "none" : "block";
  };
}

// -------------------------------
// CHECKOUT
// -------------------------------
document.addEventListener("click", (e) => {
  if (e.target.id === "checkoutBtn") {
    window.location.href = "checkout.html";
  }
});

function goToCheckout() {
  window.location.href = "checkout.html";
}
