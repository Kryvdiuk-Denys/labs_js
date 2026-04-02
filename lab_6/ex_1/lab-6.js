'use strict';

const refs = {
  productList: document.getElementById('product-list'),
  emptyMessage: document.getElementById('empty-message'),
  totalPrice: document.getElementById('total-price'),
  addProductBtn: document.getElementById('add-product-btn'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalTitle: document.getElementById('modal-title'),
  productForm: document.getElementById('product-form'),
  categoryFilters: document.getElementById('category-filters'),
  sortControls: document.getElementById('sort-controls'),
  toastContainer: document.getElementById('toast-container'),
  cancelBtn: document.getElementById('cancel-btn'),
};

const state = {
  products: [
    {
      id: 'p-1',
      name: 'Смарт-годинник',
      price: 2599.5,
      category: 'Електроніка',
      image: 'https://i.moyo.ua/img/products/5468/9_1500.jpg',
      createdAt: '2026-03-31T09:12:00.000Z',
      updatedAt: '2026-03-31T09:12:00.000Z',
    },
    {
      id: 'p-2',
      name: 'Майка футболка',
      price: 499.99,
      category: 'Одяг',
      image: 'https://cdn.rikkyhype.com/uploads/65cf560e3217af536498643a/173-1.jpg',
      createdAt: '2026-03-30T14:05:00.000Z',
      updatedAt: '2026-03-30T14:05:00.000Z',
    },
    {
      id: 'p-3',
      name: 'Книга з JavaScript',
      price: 999.0,
      category: 'Книги',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      createdAt: '2026-03-29T07:33:00.000Z',
      updatedAt: '2026-03-29T07:33:00.000Z',
    },
  ],
  filterCategory: null,
  sortBy: null,
  editingId: null,
};

const getCurrentDate = () => new Date().toISOString();

const generateId = () => `p-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatPrice = (price) => `${Number(price).toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₴`;

const getCategoriesFromProducts = (products) => [...new Set(products.map((p) => p.category).filter(Boolean))];

const calculateTotalPrice = (products) => products.reduce((sum, product) => sum + Number(product.price || 0), 0);

const filterProducts = (products, category) => (category ? products.filter((p) => p.category === category) : products);

const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case 'price':
      return [...products].sort((a, b) => Number(a.price) - Number(b.price));
    case 'date-created':
      return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'date-updated':
      return [...products].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    default:
      return products;
  }
};

const getVisibleProducts = () => {
  const filtered = filterProducts(state.products, state.filterCategory);
  return sortProducts(filtered, state.sortBy);
};

const showToast = (text) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;

  refs.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2600);
};

const renderEmptyState = () => {
  refs.emptyMessage.style.display = getVisibleProducts().length === 0 ? 'block' : 'none';
};

const renderTotalPrice = () => {
  const visibleProducts = getVisibleProducts();
  const total = calculateTotalPrice(visibleProducts);
  refs.totalPrice.textContent = `Загальна вартість: ${formatPrice(total)}`;
};

const createProductCard = (product) => {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = product.id;

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-card__image" />
    <div class="product-card__info">
      <p class="product-card__id">ID: ${product.id}</p>
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__price">${formatPrice(product.price)}</p>
      <p class="product-card__category">Категорія: ${product.category}</p>
      <p class="product-card__meta">Створено: ${new Date(product.createdAt).toLocaleString('uk-UA')}</p>
      <p class="product-card__meta">Оновлено: ${new Date(product.updatedAt).toLocaleString('uk-UA')}</p>
      <div class="product-card__actions">
        <button type="button" class="product-card__edit-btn">Редагувати</button>
        <button type="button" class="product-card__delete-btn">Видалити</button>
      </div>
    </div>
  `;

  card.querySelector('.product-card__edit-btn').addEventListener('click', () => openEditModal(product.id));
  card.querySelector('.product-card__delete-btn').addEventListener('click', () => deleteProductWithAnimation(product.id));

  return card;
};

const renderProducts = () => {
  refs.productList.innerHTML = '';
  const products = getVisibleProducts();

  if (products.length === 0) {
    refs.productList.innerHTML = '';
  } else {
    products.forEach((product) => {
      refs.productList.appendChild(createProductCard(product));
    });
  }

  renderEmptyState();
  renderTotalPrice();
  renderCategoryFilter();
  renderSortControls();
};

const renderCategoryFilter = () => {
  const categories = getCategoriesFromProducts(state.products);

  refs.categoryFilters.innerHTML = '';

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.textContent = 'Усі';
  resetBtn.className = state.filterCategory === null ? 'controls__filter-btn controls__filter-btn--active' : 'controls__filter-btn';
  resetBtn.addEventListener('click', () => {
    state.filterCategory = null;
    renderProducts();
  });
  refs.categoryFilters.appendChild(resetBtn);

  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category;
    button.className = state.filterCategory === category ? 'controls__filter-btn controls__filter-btn--active' : 'controls__filter-btn';
    button.addEventListener('click', () => {
      state.filterCategory = category;
      renderProducts();
    });
    refs.categoryFilters.appendChild(button);
  });
};

const renderSortControls = () => {
  const sortOptions = [
    { key: 'price', label: 'Сортувати за ціною' },
    { key: 'date-created', label: 'Сортувати за датою створення' },
    { key: 'date-updated', label: 'Сортувати за датою оновлення' },
  ];

  refs.sortControls.innerHTML = '';

  sortOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option.label;
    button.className = state.sortBy === option.key ? 'controls__sort-btn controls__sort-btn--active' : 'controls__sort-btn';
    button.addEventListener('click', () => {
      state.sortBy = option.key;
      renderProducts();
    });
    refs.sortControls.appendChild(button);
  });

  const resetSortBtn = document.createElement('button');
  resetSortBtn.type = 'button';
  resetSortBtn.textContent = 'Скинути сортування';
  resetSortBtn.className = state.sortBy === null ? 'controls__sort-btn controls__sort-btn--active' : 'controls__sort-btn';
  resetSortBtn.addEventListener('click', () => {
    state.sortBy = null;
    renderProducts();
  });
  refs.sortControls.appendChild(resetSortBtn);
};

const toggleModal = (show, editMode = false) => {
  refs.modalOverlay.hidden = !show;
  refs.modalOverlay.classList.toggle('modal-overlay--open', show);

  if (show) {
    refs.modalTitle.textContent = editMode ? 'Редагувати товар' : 'Додати товар';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    state.editingId = null;
    refs.productForm.reset();
  }
};

const openAddModal = () => {
  state.editingId = null;
  refs.productForm.reset();
  toggleModal(true, false);
};

const openEditModal = (productId) => {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  state.editingId = productId;
  refs.productForm.productName.value = product.name;
  refs.productForm.productPrice.value = product.price;
  refs.productForm.productCategory.value = product.category;
  refs.productForm.productImage.value = product.image;

  toggleModal(true, true);
};

const saveProductFromForm = (event) => {
  event.preventDefault();
  if (!refs.productForm.checkValidity()) {
    refs.productForm.reportValidity();
    return;
  }

  const formData = new FormData(refs.productForm);
  const productData = {
    productName: formData.get('productName').trim(),
    productPrice: Number(formData.get('productPrice')),
    productCategory: formData.get('productCategory'),
    productImage: formData.get('productImage').trim(),
  };

  if (state.editingId) {
    state.products = state.products.map((item) => {
      if (item.id !== state.editingId) return item;
      return {
        ...item,
        name: productData.productName,
        price: productData.productPrice,
        category: productData.productCategory,
        image: productData.productImage,
        updatedAt: getCurrentDate(),
      };
    });

    const currentProduct = state.products.find((p) => p.id === state.editingId);
    toggleModal(false);
    renderProducts();
    showToast(`Товар ${currentProduct.id} «${currentProduct.name}» оновлено успішно.`);
  } else {
    const newProduct = {
      id: generateId(),
      name: productData.productName,
      price: productData.productPrice,
      category: productData.productCategory,
      image: productData.productImage,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    };
    state.products = [...state.products, newProduct];

    toggleModal(false);
    renderProducts();
    showToast(`Товар «${newProduct.name}» додано успішно.`);
  }
};

const deleteProductWithAnimation = (productId) => {
  const card = refs.productList.querySelector(`[data-id='${productId}']`);
  if (!card) return;

  card.classList.add('product-card--fade-out');

  setTimeout(() => {
    state.products = state.products.filter((product) => product.id !== productId);
    renderProducts();
    showToast(`Товар ${productId} видалено зі списку.`);
  }, 320);
};

const init = () => {
  refs.addProductBtn.addEventListener('click', openAddModal);
  refs.cancelBtn.addEventListener('click', () => toggleModal(false));
  refs.modalOverlay.addEventListener('click', (event) => {
    if (event.target === refs.modalOverlay) toggleModal(false);
  });
  refs.productForm.addEventListener('submit', saveProductFromForm);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !refs.modalOverlay.hidden) {
      toggleModal(false);
    }
  });

  renderProducts();
};

init();

