// Product data now lives in products.js (loaded before this file)

let cart = [];
let currentFilter = 'all';

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const filtered = currentFilter === 'all'
    ? products
    : products.filter(p => p.category === currentFilter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <span class="product-name">${p.name}</span>
        <span class="product-price">Price: $${p.price.toFixed(2)}</span>
        <span class="product-rating">★★★★★ ${p.rating}</span>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
  });
}

// ===== CATEGORY FILTER =====
document.getElementById('categoryGrid').addEventListener('click', (e) => {
  const card = e.target.closest('.category-card');
  if (!card) return;
  document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  currentFilter = card.dataset.filter;
  renderProducts();
});

// ===== CART LOGIC =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartBtnEl = document.getElementById('cartBtn');

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalQty;
  if (cartBtnEl) cartBtnEl.href = 'cart.html' + cartToQuery(cart);

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        <div class="cart-item-qty">
          <button data-action="dec" data-id="${item.id}">−</button>
          <span>${item.qty}</span>
          <button data-action="inc" data-id="${item.id}">+</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  cartItemsEl.querySelectorAll('button[data-action]').forEach(btn => {
    const id = Number(btn.dataset.id);
    const delta = btn.dataset.action === 'inc' ? 1 : -1;
    btn.addEventListener('click', () => changeQty(id, delta));
  });
}

// ===== CART DRAWER TOGGLE =====
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
}
function closeCart() {
  cartDrawer.classList.remove('open');
  overlay.classList.remove('show');
}

// Cart icon in header now links straight to cart.html (href kept in sync in renderCart)
document.getElementById('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.querySelector('.checkout-btn')?.addEventListener('click', () => {
  window.location.href = 'cart.html' + cartToQuery(cart);
});


// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// ===== NEWSLETTER SUBSCRIBE (demo) =====
document.querySelector('.footer-newsletter .btn-primary')?.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('.newsletter-input');
  if (input.value.trim()) {
    alert(`Thanks for subscribing, ${input.value}! 🎉`);
    input.value = '';
  }
});

// ===== INIT =====
renderProducts();
