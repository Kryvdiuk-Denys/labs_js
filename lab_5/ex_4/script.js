const products = new Map();
const orders = new Set();
const productHistory = new WeakMap();
const users = new WeakSet();
let productIdCounter = 0;

function log(text) {
  const out = document.getElementById('output');
  out.textContent += text + '\n';
  out.scrollTop = out.scrollHeight;
}

function printProducts() {
  if (!products.size) {
    log('Каталог порожній.');
    return;
  }
  log('--- Поточний каталог ---');
  products.forEach((product, id) => {
    log(`ID=${id}, Назва=${product.name}, Ціна=${product.price}, К-сть=${product.quantity}`);
  });
}

function addProduct(name, price, quantity) {
  if (!name || price <= 0 || quantity < 0) {
    log('Помилка: введіть дійсні дані (назва, ціна >0, к-сть >=0).');
    return;
  }

  const id = ++productIdCounter;
  const prod = {name, price, quantity};
  products.set(id, prod);

  productHistory.set(prod, [{event: 'created', at: new Date(), price, quantity}]);
  log(`Продукт додано: ID=${id}, ${name}`);
  printProducts();
}

function deleteProduct(id) {
  if (!products.has(id)) {
    log('Продукт не знайдено.');
    return;
  }
  const prod = products.get(id);
  products.delete(id);
  log(`Продукт видалено: ID=${id}, ${prod.name}`);
  printProducts();
}

function updateProduct(id, newPrice, newQuantity) {
  const product = products.get(id);
  if (!product) {
    log('Продукт не знайдено.');
    return;
  }
  if (newPrice <= 0 || newQuantity < 0) {
    log('Помилка: ціна повинна бути >0, кількість >=0.');
    return;
  }

  product.price = newPrice;
  product.quantity = newQuantity;

  const history = productHistory.get(product) || [];
  history.push({event: 'updated', at: new Date(), price: newPrice, quantity: newQuantity});
  productHistory.set(product, history);

  log(`Оновлення: ID=${id}, ${product.name}: ціна=${newPrice}, к-сть=${newQuantity}`);
}

function searchProductByName(name) {
  const result = [];
  products.forEach((product, id) => {
    if (product.name.toLowerCase().includes(name.toLowerCase())) {
      result.push({id, ...product});
    }
  });

  if (!result.length) {
    log('Продуктів не знайдено.');
    return;
  }
  log('--- Результати пошуку ---');
  result.forEach(p => {
    log(`ID=${p.id}, Назва=${p.name}, Ціна=${p.price}, К-сть=${p.quantity}`);
  });
}

function createOrder(orderId, productId, qty, userName) {
  if (!orderId || orders.has(orderId)) {
    log('Неприпустимий або існуючий ID замовлення.');
    return;
  }
  const product = products.get(productId);
  if (!product) {
    log('Продукт для замовлення не знайдено.');
    return;
  }
  if (qty <= 0 || qty > product.quantity) {
    log('Неправильна кількість для замовлення.');
    return;
  }

  orders.add(orderId);
  product.quantity -= qty;

  const user = {name: userName || 'Гість'};
  users.add(user);

  const history = productHistory.get(product) || [];
  history.push({event: 'order', at: new Date(), orderId, quantity: qty});
  productHistory.set(product, history);

  log(`Замовлення створено: orderId=${orderId}, ${product.name}, qty=${qty}`);
  printProducts();
}

function showHistory(id) {
  const product = products.get(id);
  if (!product) {
    log('Продукт не знайдено (для історії).');
    return;
  }
  const history = productHistory.get(product) || [];
  log(`Історія змін для ID=${id}, ${product.name}:`);
  history.forEach((h, i) => {
    log(`${i + 1}. ${h.event} (${h.at.toLocaleString()}) – ${JSON.stringify(h)}`);
  });
}

function clearOutput() {
  document.getElementById('output').textContent = '';
}




document.getElementById('add-product').addEventListener('click', () => {
  const name = document.getElementById('product-name').value.trim();
  const price = Number(document.getElementById('product-price').value);
  const qtty = Number(document.getElementById('product-qtty').value);
  addProduct(name, price, qtty);
});

document.getElementById('delete-product').addEventListener('click', () => {
  const id = Number(document.getElementById('product-id').value);
  deleteProduct(id);
});

document.getElementById('update-product').addEventListener('click', () => {
  const id = Number(document.getElementById('product-id').value);
  const newPrice = Number(document.getElementById('update-price').value);
  const newQtty = Number(document.getElementById('update-qtty').value);
  updateProduct(id, newPrice, newQtty);
});

document.getElementById('search-product').addEventListener('click', () => {
  const term = document.getElementById('search-name').value.trim();
  if (!term) {
    log('Введіть назву для пошуку.');
    return;
  }
  searchProductByName(term);
});

document.getElementById('create-order').addEventListener('click', () => {
  const orderId = document.getElementById('order-id').value.trim();
  const productId = Number(document.getElementById('order-product-id').value);
  const qtty = Number(document.getElementById('order-qty').value);
  createOrder(orderId, productId, qtty, 'customer');
});

// Приклад як працює WeakSet
const demoUser = {name: 'Петро'};
users.add(demoUser);
setTimeout(() => {
  log(`WeakSet містить demoUser перед звільненням? ${users.has(demoUser)}`);
}, 0);

/**
 * Пояснення:
 * - Map: products (id -> {name, price, quantity})
 * - Set: orders (id замовлень)
 * - WeakMap: productHistory (об'єкт продукту -> масив подій, доступно тільки поки живий об'єкт)
 * - WeakSet: users (масив об'єктів користувачів, збирається сміття, коли нема посилань)
 */