// ===== SHARED PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: 'Chocolate Crumble Donut',
    price: 4.99,
    rating: 4.8,
    category: 'donuts',
    img: 'assets/product-donut-chocolate.jpg'
  },
  {
    id: 2,
    name: 'Cherry Sprinkle Cupcake',
    price: 5.49,
    rating: 4.9,
    category: 'pastry',
    img: 'assets/product-cupcake-cherry.jpg'
  },
  {
    id: 3,
    name: 'Cherry Vanilla Cake',
    price: 8.99,
    rating: 5.0,
    category: 'all',
    img: 'assets/product-cherry-cake.jpg'
  },
  {
    id: 4,
    name: 'Cinnamon Roll',
    price: 6.50,
    rating: 4.7,
    category: 'pastry',
    img: 'assets/product-cinnamon-roll.jpg'
  },
  {
    id: 5,
    name: 'Butter Cookies',
    price: 4.50,
    rating: 4.6,
    category: 'pastry',
    img: 'assets/product-cookies.jpg'
  },
  {
    id: 6,
    name: 'Vanilla Ice Cream',
    price: 3.99,
    rating: 4.8,
    category: 'icecream',
    img: 'assets/product-icecream-vanilla.jpg'
  },
  {
    id: 7,
    name: 'Golden Croissant',
    price: 4.20,
    rating: 4.9,
    category: 'pastry',
    img: 'assets/product-croissant-plain.jpg'
  },
  {
    id: 8,
    name: 'Raspberry Heart Cookies',
    price: 4.75,
    rating: 4.9,
    category: 'pastry',
    img: 'assets/product-heart-cookies.jpg'
  }
];

// ---- Cart <-> URL helpers (no localStorage, so cart is passed via URL) ----
function cartToQuery(cart) {
  if (!cart.length) return '';
  const compact = cart.map(i => `${i.id}:${i.qty}`).join(',');
  return '?items=' + encodeURIComponent(compact);
}

function cartFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('items');
  if (!raw) return [];
  return raw.split(',').map(pair => {
    const [id, qty] = pair.split(':').map(Number);
    const product = products.find(p => p.id === id);
    if (!product) return null;
    return { ...product, qty };
  }).filter(Boolean);
}
