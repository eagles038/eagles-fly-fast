/**
 * Eagles Food - Vanilla JavaScript
 * Методология: БЭМ (работа с классами через querySelector)
 */

(function () {
  'use strict';

  /* ========================================
     DATA
  ======================================== */
  const BASE_PIZZA_PRICE = 299;
  const FREE_DELIVERY_THRESHOLD = 1500;
  const DELIVERY_PRICE = 200;

  const PROMO_CODES = {
    'СКИДКА10': 0.10,
    'СКИДКА20': 0.20,
    'ПЕРВЫЙ': 0.15
  };

  const doughOptions = [
    { id: 'thin', name: 'Тонкое', description: 'Хрустящее тесто для любителей классики', price: 0, icon: '○' },
    { id: 'thick', name: 'Пышное', description: 'Воздушное тесто с мягким краем', price: 50, icon: '◉' },
    { id: 'cheese-crust', name: 'Сырный борт', description: 'С расплавленным сыром в бортике', price: 100, icon: '◎' }
  ];

  const sizeOptions = [
    { id: 'small', name: 'Маленькая', diameter: 25, price: 0 },
    { id: 'medium', name: 'Средняя', diameter: 30, price: 150 },
    { id: 'large', name: 'Большая', diameter: 40, price: 350 }
  ];

  const toppingOptions = [
    { id: 'pepperoni', name: 'Пепперони', price: 79, category: 'meat', icon: '🥓' },
    { id: 'chicken', name: 'Курица', price: 89, category: 'meat', icon: '🍗' },
    { id: 'bacon', name: 'Бекон', price: 99, category: 'meat', icon: '🥓' },
    { id: 'ham', name: 'Ветчина', price: 79, category: 'meat', icon: '🍖' },
    { id: 'tomato', name: 'Томаты', price: 49, category: 'vegetables', icon: '🍅' },
    { id: 'mushrooms', name: 'Шампиньоны', price: 59, category: 'vegetables', icon: '🍄' },
    { id: 'pepper', name: 'Болг. перец', price: 49, category: 'vegetables', icon: '🫑' },
    { id: 'onion', name: 'Лук', price: 29, category: 'vegetables', icon: '🧅' },
    { id: 'olives', name: 'Маслины', price: 69, category: 'vegetables', icon: '🫒' },
    { id: 'jalapeno', name: 'Халапеньо', price: 59, category: 'vegetables', icon: '🌶️' },
    { id: 'mozzarella', name: 'Моцарелла', price: 89, category: 'cheese', icon: '🧀' },
    { id: 'parmesan', name: 'Пармезан', price: 99, category: 'cheese', icon: '🧀' },
    { id: 'cheddar', name: 'Чеддер', price: 79, category: 'cheese', icon: '🧀' },
    { id: 'feta', name: 'Фета', price: 89, category: 'cheese', icon: '🧀' },
    { id: 'tomato-sauce', name: 'Томатный', price: 0, category: 'sauce', icon: '🍅' },
    { id: 'cream-sauce', name: 'Сливочный', price: 30, category: 'sauce', icon: '🥛' },
    { id: 'bbq-sauce', name: 'BBQ', price: 30, category: 'sauce', icon: '🍯' }
  ];

  const popularItems = [
    { id: 'popular-1', name: 'Пепперони', description: 'Пикантная пепперони, моцарелла, томатный соус', price: 499, image: 'pizza-pepperoni.jpg', badge: 'hit', sizes: [{ size: '25 см', price: 499 }, { size: '30 см', price: 699 }, { size: '40 см', price: 999 }] },
    { id: 'popular-2', name: 'Филадельфия', description: 'Лосось, сливочный сыр, огурец, рис', price: 349, image: 'roll-philadelphia.jpg', badge: 'hit', piecesOptions: [{ pieces: 6, price: 349 }, { pieces: 8, price: 449 }, { pieces: 12, price: 649 }] },
    { id: 'popular-3', name: 'Классический', description: 'Две котлеты из говядины, чеддер, салат', price: 399, image: 'burger-classic.jpg', badge: 'hit' },
    { id: 'popular-4', name: 'Дракон', description: 'Угорь, авокадо, огурец, унаги соус', price: 449, image: 'roll-dragon.jpg', badge: 'new', oldPrice: 549, piecesOptions: [{ pieces: 6, price: 449 }, { pieces: 8, price: 579 }, { pieces: 12, price: 849 }] },
    { id: 'popular-5', name: '4 сыра', description: 'Моцарелла, пармезан, горгонзола, чеддер', price: 599, image: 'pizza-4cheese.jpg', sizes: [{ size: '25 см', price: 599 }, { size: '30 см', price: 799 }, { size: '40 см', price: 1149 }] },
    { id: 'popular-6', name: 'Лимонад', description: 'Домашний лимонад с мятой и льдом, 0.4л', price: 129, image: 'drink-lemonade.jpg', badge: 'hit' }
  ];

  const menuCategories = {
    pizza: [
      { id: 'pizza-1', name: 'Пепперони', description: 'Пикантная пепперони, моцарелла, томатный соус, орегано', price: 499, image: 'pizza-pepperoni.jpg', badge: 'hit', filterTags: ['spicy', 'with-meat'], sizes: [{ size: '25 см', price: 499 }, { size: '30 см', price: 699 }, { size: '40 см', price: 999 }] },
      { id: 'pizza-2', name: 'Маргарита', description: 'Свежие томаты, моцарелла, базилик, оливковое масло', price: 399, image: 'pizza-margherita.jpg', filterTags: ['vegetarian', 'cheese'], sizes: [{ size: '25 см', price: 399 }, { size: '30 см', price: 549 }, { size: '40 см', price: 799 }] },
      { id: 'pizza-3', name: 'BBQ Курица', description: 'Курица гриль, соус BBQ, кукуруза, красный лук, сыр', price: 549, image: 'pizza-bbq.jpg', badge: 'new', filterTags: ['with-chicken'], sizes: [{ size: '25 см', price: 549 }, { size: '30 см', price: 749 }, { size: '40 см', price: 1099 }] },
      { id: 'pizza-4', name: '4 сыра', description: 'Моцарелла, пармезан, горгонзола, чеддер на сливочной основе', price: 599, image: 'pizza-4cheese.jpg', filterTags: ['vegetarian', 'cheese'], sizes: [{ size: '25 см', price: 599 }, { size: '30 см', price: 799 }, { size: '40 см', price: 1149 }] }
    ],
    rolls: [
      { id: 'roll-1', name: 'Филадельфия', description: 'Лосось, сливочный сыр, огурец, рис, нори', price: 349, image: 'roll-philadelphia.jpg', badge: 'hit', filterTags: ['hot', 'with-salmon', 'premium'], piecesOptions: [{ pieces: 6, price: 349 }, { pieces: 8, price: 449 }, { pieces: 12, price: 649 }] },
      { id: 'roll-2', name: 'Калифорния', description: 'Краб, авокадо, огурец, тобико, кунжут', price: 299, image: 'roll-california.jpg', filterTags: ['baked'], piecesOptions: [{ pieces: 6, price: 299 }, { pieces: 8, price: 389 }, { pieces: 12, price: 549 }] },
      { id: 'roll-3', name: 'Дракон', description: 'Угорь, авокадо, огурец, унаги соус, кунжут', price: 449, image: 'roll-dragon.jpg', badge: 'new', oldPrice: 549, filterTags: ['sale', 'with-eel', 'premium'], piecesOptions: [{ pieces: 6, price: 449 }, { pieces: 8, price: 579 }, { pieces: 12, price: 849 }] },
      { id: 'roll-4', name: 'Унаги', description: 'Копчёный угорь, сливочный сыр, авокадо, соус унаги', price: 479, image: 'roll-unagi.jpg', badge: 'sale', oldPrice: 579, filterTags: ['sale', 'with-eel', 'baked'], piecesOptions: [{ pieces: 6, price: 479 }, { pieces: 8, price: 619 }, { pieces: 12, price: 899 }] }
    ],
    burgers: [
      { id: 'burger-1', name: 'Классический', description: 'Две котлеты из говядины, чеддер, салат, томаты, соленые огурцы', price: 399, image: 'burger-classic.jpg', badge: 'hit', filterTags: ['with-beef'] },
      { id: 'burger-2', name: 'Острый', description: 'Говядина, халапеньо, бекон, острый соус, плавленый сыр', price: 449, image: 'burger-spicy.jpg', badge: 'sale', oldPrice: 549, filterTags: ['sale', 'spicy', 'with-beef'] },
      { id: 'burger-3', name: 'Чикен', description: 'Хрустящая куриная грудка, салат, майонез, булочка бриошь', price: 379, image: 'burger-chicken.jpg', filterTags: ['with-chicken'] },
      { id: 'burger-4', name: 'Двойной', description: 'Двойная котлета, двойной сыр, бекон, фирменный соус', price: 549, image: 'burger-double.jpg', badge: 'new', filterTags: ['with-beef', 'double'] }
    ],
    drinks: [
      { id: 'drink-1', name: 'Кола', description: 'Классическая газировка, 0.5л', price: 99, image: 'drink-cola.jpg' },
      { id: 'drink-2', name: 'Апельсиновый сок', description: 'Свежевыжатый апельсиновый сок, 0.3л', price: 149, image: 'drink-juice.jpg', badge: 'new' },
      { id: 'drink-3', name: 'Молочный коктейль', description: 'Ванильный молочный коктейль со взбитыми сливками', price: 199, image: 'drink-milkshake.jpg' },
      { id: 'drink-4', name: 'Лимонад', description: 'Домашний лимонад с мятой и льдом, 0.4л', price: 129, image: 'drink-lemonade.jpg', badge: 'hit' }
    ]
  };

  const categoryFilters = {
    pizza: [
      { id: 'sale', label: 'Акция', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>' },
      { id: 'spicy', label: 'Острая', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>' },
      { id: 'vegetarian', label: 'Вегетарианская', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>' },
      { id: 'with-chicken', label: 'С курицей', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15.5 3.5c-.3.3-.5.7-.5 1.1 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5S17.3 3 16.5 3c-.4 0-.8.2-1 .5z"></path><path d="M8 14l-2.5 2.5M10 12l-4 4M14 8l-6 6"></path><path d="M18.5 5.5l-12 12"></path></svg>' },
      { id: 'with-meat', label: 'С мясом', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12.5" cy="8.5" r="2.5"></circle><path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2z"></path></svg>' },
      { id: 'cheese', label: 'Сырная', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 11h.01M11 15h.01M16 16h.01M2 16l20 6-6-20A20 20 0 0 0 2 16"></path></svg>' }
    ],
    rolls: [
      { id: 'sale', label: 'Акция', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>' },
      { id: 'hot', label: 'Хит', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>' },
      { id: 'baked', label: 'Запечённые', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>' },
      { id: 'with-salmon', label: 'С лососем', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6z"></path><path d="M2 10l4 2-4 2"></path></svg>' },
      { id: 'with-eel', label: 'С угрём', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6z"></path><path d="M2 10l4 2-4 2"></path></svg>' },
      { id: 'premium', label: 'Премиум', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg>' }
    ]
  };

  /* ========================================
     STATE
  ======================================== */
  let cart = [];
  let appliedPromo = null;

  let constructorState = {
    dough: doughOptions[0],
    size: sizeOptions[1],
    toppings: [toppingOptions.find(t => t.id === 'tomato-sauce')],
    activeCategory: 'sauce'
  };

  /* ========================================
     DOM ELEMENTS
  ======================================== */
  const elements = {
    // Header
    menuToggle: document.getElementById('menuToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    cartBtn: document.getElementById('cartBtn'),
    cartCount: document.getElementById('cartCount'),

    // Cart
    cartOverlay: document.getElementById('cartOverlay'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartClose: document.getElementById('cartClose'),
    cartBody: document.getElementById('cartBody'),
    cartEmpty: document.getElementById('cartEmpty'),
    cartEmptyBtn: document.getElementById('cartEmptyBtn'),
    cartItems: document.getElementById('cartItems'),
    cartItemsCount: document.getElementById('cartItemsCount'),
    cartFooter: document.getElementById('cartFooter'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDiscount: document.getElementById('cartDiscount'),
    discountRow: document.getElementById('discountRow'),
    deliveryPrice: document.getElementById('deliveryPrice'),
    cartTotal: document.getElementById('cartTotal'),
    deliveryText: document.getElementById('deliveryText'),
    deliveryProgressFill: document.getElementById('deliveryProgressFill'),
    promoInput: document.getElementById('promoInput'),
    promoBtn: document.getElementById('promoBtn'),
    promoApplied: document.getElementById('promoApplied'),
    promoCode: document.getElementById('promoCode'),
    promoDiscount: document.getElementById('promoDiscount'),
    promoRemove: document.getElementById('promoRemove'),
    promoError: document.getElementById('promoError'),
    checkoutBtn: document.getElementById('checkoutBtn'),

    // Mobile cart
    mobileCart: document.getElementById('mobileCart'),
    mobileCartCount: document.getElementById('mobileCartCount'),
    mobileCartTotal: document.getElementById('mobileCartTotal'),

    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toastMessage'),
    toastAction: document.getElementById('toastAction'),

    // Popular
    popularTrack: document.getElementById('popularTrack'),
    popularPrev: document.getElementById('popularPrev'),
    popularNext: document.getElementById('popularNext'),

    // Constructor
    doughOptions: document.getElementById('doughOptions'),
    sizeOptions: document.getElementById('sizeOptions'),
    toppingTabs: document.getElementById('toppingTabs'),
    toppingsGrid: document.getElementById('toppingsGrid'),
    selectedToppings: document.getElementById('selectedToppings'),
    pizzaBase: document.getElementById('pizzaBase'),
    pizzaSauce: document.getElementById('pizzaSauce'),
    pizzaCheese: document.getElementById('pizzaCheese'),
    pizzaToppings: document.getElementById('pizzaToppings'),
    pizzaSizeLabel: document.getElementById('pizzaSizeLabel'),
    pizzaSummary: document.getElementById('pizzaSummary'),
    addPizzaToCart: document.getElementById('addPizzaToCart'),
    resetPizza: document.getElementById('resetPizza'),

    // Menu grids
    pizzaGrid: document.getElementById('pizzaGrid'),
    rollsGrid: document.getElementById('rollsGrid'),
    burgersGrid: document.getElementById('burgersGrid'),
    drinksGrid: document.getElementById('drinksGrid')
  };

  /* ========================================
     UTILITY FUNCTIONS
  ======================================== */
  function formatPrice(price) {
    return price.toLocaleString('ru-RU') + ' ₽';
  }

  function getItemsText(count) {
    if (count === 1) return '1 позиция';
    if (count >= 2 && count <= 4) return count + ' позиции';
    return count + ' позиций';
  }

  function generateUniqueId(item) {
    if (item.size) return item.id + '-' + item.size;
    if (item.pieces) return item.id + '-' + item.pieces + 'pcs';
    return item.id;
  }

  /* ========================================
     SMOOTH SCROLL
  ======================================== */
  function initSmoothScroll() {
    document.querySelectorAll('[data-scroll]').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            closeMobileMenu();
          }
        }
      });
    });
  }

  /* ========================================
     MOBILE MENU
  ======================================== */
  function openMobileMenu() {
    elements.mobileMenu.classList.add('header__mobile-menu--active');
    elements.menuToggle.classList.add('header__burger--active');
  }

  function closeMobileMenu() {
    elements.mobileMenu.classList.remove('header__mobile-menu--active');
    elements.menuToggle.classList.remove('header__burger--active');
  }

  function initMobileMenu() {
    if (!elements.menuToggle) return;
    elements.menuToggle.addEventListener('click', function () {
      if (elements.mobileMenu.classList.contains('header__mobile-menu--active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  /* ========================================
     CART
  ======================================== */
  function openCart() {
    elements.cartSidebar.classList.add('cart--open');
    elements.cartOverlay.classList.add('cart-overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    elements.cartSidebar.classList.remove('cart--open');
    elements.cartOverlay.classList.remove('cart-overlay--visible');
    document.body.style.overflow = '';
  }

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getTotalPrice() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function addToCart(item) {
    const uniqueId = generateUniqueId(item);
    const existing = cart.find(i => generateUniqueId(i) === uniqueId);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    showToast(item.name + ' добавлен в корзину');
  }

  function removeFromCart(uniqueId) {
    cart = cart.filter(item => generateUniqueId(item) !== uniqueId);
    updateCartUI();
  }

  function updateQuantity(uniqueId, delta) {
    const item = cart.find(i => generateUniqueId(i) === uniqueId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        removeFromCart(uniqueId);
      } else {
        updateCartUI();
      }
    }
  }

  function updateCartUI() {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    // Header cart count
    if (totalItems > 0) {
      elements.cartCount.textContent = totalItems;
      elements.cartCount.classList.remove('header__cart-count--hidden');
    } else {
      elements.cartCount.classList.add('header__cart-count--hidden');
    }

    // Cart items count
    elements.cartItemsCount.textContent = getItemsText(totalItems);

    // Show/hide empty state
    if (cart.length === 0) {
      elements.cartEmpty.classList.remove('cart__empty--hidden');
      elements.cartItems.classList.remove('cart__items--visible');
      elements.cartFooter.classList.remove('cart__footer--visible');
    } else {
      elements.cartEmpty.classList.add('cart__empty--hidden');
      elements.cartItems.classList.add('cart__items--visible');
      elements.cartFooter.classList.add('cart__footer--visible');
    }

    // Render cart items
    renderCartItems();

    // Update totals
    updateCartTotals();

    // Mobile cart button
    updateMobileCart();
  }

  function renderCartItems() {
    elements.cartItems.innerHTML = cart.map(item => {
      const uniqueId = generateUniqueId(item);
      return `
        <div class="cart__item" data-id="${uniqueId}">
          <img src="${item.image}" alt="${item.name}" class="cart__item-image">
          <div class="cart__item-info">
            <h4 class="cart__item-name">${item.name}</h4>
            <p class="cart__item-price">${formatPrice(item.price * item.quantity)}</p>
            <div class="cart__item-footer">
              <div class="cart__item-quantity">
                <button class="cart__item-qty-btn" data-action="decrease" data-id="${uniqueId}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="cart__item-qty-value">${item.quantity}</span>
                <button class="cart__item-qty-btn" data-action="increase" data-id="${uniqueId}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <button class="cart__item-remove" data-action="remove" data-id="${uniqueId}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"></polyline><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateCartTotals() {
    const subtotal = getTotalPrice();
    const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discount) : 0;
    const finalPrice = subtotal - discountAmount;
    const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - finalPrice);
    const deliveryFee = remaining > 0 ? DELIVERY_PRICE : 0;
    const total = finalPrice + deliveryFee;

    elements.cartSubtotal.textContent = formatPrice(subtotal);

    if (discountAmount > 0) {
      elements.discountRow.classList.remove('cart__total-row--hidden');
      elements.cartDiscount.textContent = '-' + formatPrice(discountAmount);
    } else {
      elements.discountRow.classList.add('cart__total-row--hidden');
    }

    elements.deliveryPrice.textContent = deliveryFee > 0 ? formatPrice(deliveryFee) : 'Бесплатно';
    elements.cartTotal.textContent = formatPrice(total);

    // Delivery progress
    const progress = Math.min(100, (finalPrice / FREE_DELIVERY_THRESHOLD) * 100);
    elements.deliveryProgressFill.style.width = progress + '%';

    if (remaining > 0) {
      elements.deliveryText.innerHTML = 'До бесплатной доставки: <strong>' + formatPrice(remaining) + '</strong>';
    } else {
      elements.deliveryText.innerHTML = '✨ Бесплатная доставка!';
    }
  }

  function updateMobileCart() {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    if (totalItems > 0 && window.innerWidth < 768) {
      elements.mobileCart.classList.remove('mobile-cart--hidden');
      elements.mobileCartCount.textContent = totalItems;
      elements.mobileCartTotal.textContent = formatPrice(totalPrice);
    } else {
      elements.mobileCart.classList.add('mobile-cart--hidden');
    }
  }

  function applyPromoCode() {
    const code = elements.promoInput.value.toUpperCase().trim();
    if (PROMO_CODES[code]) {
      appliedPromo = { code, discount: PROMO_CODES[code] };
      elements.promoApplied.classList.remove('cart__promo-applied--hidden');
      elements.promoCode.textContent = code;
      elements.promoDiscount.textContent = '-' + (appliedPromo.discount * 100) + '%';
      elements.promoError.classList.add('cart__promo-error--hidden');
      elements.promoInput.parentElement.parentElement.style.display = 'none';
      updateCartTotals();
      showToast('Промокод применён! Скидка ' + (appliedPromo.discount * 100) + '%');
    } else {
      elements.promoError.classList.remove('cart__promo-error--hidden');
    }
  }

  function removePromoCode() {
    appliedPromo = null;
    elements.promoApplied.classList.add('cart__promo-applied--hidden');
    elements.promoInput.value = '';
    elements.promoInput.parentElement.parentElement.style.display = 'flex';
    updateCartTotals();
  }

  function initCart() {
    elements.cartBtn.addEventListener('click', openCart);
    elements.cartClose.addEventListener('click', closeCart);
    elements.cartOverlay.addEventListener('click', closeCart);
    elements.cartEmptyBtn.addEventListener('click', closeCart);
    elements.mobileCart.addEventListener('click', openCart);
    elements.promoBtn.addEventListener('click', applyPromoCode);
    elements.promoRemove.addEventListener('click', removePromoCode);

    elements.cartItems.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      const id = btn.dataset.id;

      if (action === 'increase') updateQuantity(id, 1);
      if (action === 'decrease') updateQuantity(id, -1);
      if (action === 'remove') removeFromCart(id);
    });

    elements.toastAction.addEventListener('click', openCart);

    window.addEventListener('resize', updateMobileCart);
  }

  /* ========================================
     TOAST
  ======================================== */
  let toastTimeout;

  function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('toast--hidden');
    elements.toast.classList.add('toast--visible');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('toast--visible');
    }, 3000);
  }

  /* ========================================
     PRODUCT CARD RENDERING
  ======================================== */
  function createProductCard(item) {
    const badgeClass = item.badge ? 'product-card__badge--' + item.badge : '';
    const badgeText = item.badge === 'hit' ? 'Хит' : item.badge === 'new' ? 'New' : item.badge === 'sale' ? 'Акция' : '';

    let sizesHtml = '';
    if (item.sizes) {
      sizesHtml = `
        <div class="product-card__sizes">
          ${item.sizes.map((s, i) => `
            <button class="product-card__size-btn ${i === 0 ? 'product-card__size-btn--active' : ''}" data-size="${s.size}" data-price="${s.price}">${s.size}</button>
          `).join('')}
        </div>
      `;
    }

    if (item.piecesOptions) {
      sizesHtml = `
        <div class="product-card__sizes">
          ${item.piecesOptions.map((p, i) => `
            <button class="product-card__size-btn ${i === 0 ? 'product-card__size-btn--active' : ''}" data-pieces="${p.pieces}" data-price="${p.price}">${p.pieces} шт</button>
          `).join('')}
        </div>
      `;
    }

    return `
      <article class="product-card" data-product-id="${item.id}">
        <div class="product-card__image-wrap">
          ${item.badge ? `<span class="product-card__badge ${badgeClass}">${badgeText}</span>` : ''}
          <img src="${item.image}" alt="${item.name}" class="product-card__image" loading="lazy">
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${item.name}</h3>
          <p class="product-card__description">${item.description}</p>
          ${sizesHtml}
          <div class="product-card__footer">
            <div>
              <span class="product-card__price" data-base-price="${item.price}">${formatPrice(item.sizes ? item.sizes[0].price : item.piecesOptions ? item.piecesOptions[0].price : item.price)}</span>
              ${item.oldPrice ? `<span class="product-card__old-price">${formatPrice(item.oldPrice)}</span>` : ''}
            </div>
            <div class="product-card__actions">
              <div class="product-card__quantity">
                <button class="product-card__qty-btn" data-qty-action="decrease">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="product-card__qty-value">1</span>
                <button class="product-card__qty-btn" data-qty-action="increase">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <button class="product-card__add-btn" data-add-to-cart>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function initProductCards(container) {
    container.addEventListener('click', function (e) {
      const card = e.target.closest('.product-card');
      if (!card) return;

      // Size/pieces selection
      const sizeBtn = e.target.closest('.product-card__size-btn');
      if (sizeBtn) {
        card.querySelectorAll('.product-card__size-btn').forEach(b => b.classList.remove('product-card__size-btn--active'));
        sizeBtn.classList.add('product-card__size-btn--active');
        const price = parseInt(sizeBtn.dataset.price);
        card.querySelector('.product-card__price').textContent = formatPrice(price);
        return;
      }

      // Quantity
      const qtyBtn = e.target.closest('[data-qty-action]');
      if (qtyBtn) {
        const qtyEl = card.querySelector('.product-card__qty-value');
        let qty = parseInt(qtyEl.textContent);
        if (qtyBtn.dataset.qtyAction === 'increase') qty++;
        if (qtyBtn.dataset.qtyAction === 'decrease' && qty > 1) qty--;
        qtyEl.textContent = qty;
        return;
      }

      // Add to cart
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        const productId = card.dataset.productId;
        const name = card.querySelector('.product-card__name').textContent;
        const priceText = card.querySelector('.product-card__price').textContent;
        const price = parseInt(priceText.replace(/\D/g, ''));
        const image = card.querySelector('.product-card__image').src;
        const qty = parseInt(card.querySelector('.product-card__qty-value').textContent);
        const activeSize = card.querySelector('.product-card__size-btn--active');
        const size = activeSize?.dataset.size || null;
        const pieces = activeSize?.dataset.pieces ? parseInt(activeSize.dataset.pieces) : null;

        for (let i = 0; i < qty; i++) {
          addToCart({
            id: productId,
            name: size ? `${name} (${size})` : pieces ? `${name} (${pieces} шт)` : name,
            price: price,
            image: image,
            size: size,
            pieces: pieces
          });
        }

        // Reset quantity
        card.querySelector('.product-card__qty-value').textContent = '1';

        // Visual feedback
        addBtn.classList.add('product-card__add-btn--active');
        setTimeout(() => addBtn.classList.remove('product-card__add-btn--active'), 1000);
      }
    });
  }

  /* ========================================
     POPULAR SECTION
  ======================================== */
  function initPopular() {
    if (!elements.popularTrack) return;

    elements.popularTrack.innerHTML = popularItems.map(item => createProductCard(item)).join('');
    initProductCards(elements.popularTrack);

    // Carousel navigation
    elements.popularPrev.addEventListener('click', () => {
      elements.popularTrack.scrollBy({ left: -300, behavior: 'smooth' });
    });

    elements.popularNext.addEventListener('click', () => {
      elements.popularTrack.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  /* ========================================
     MENU SECTIONS
  ======================================== */
  function initMenu() {
    Object.keys(menuCategories).forEach(category => {
      const grid = elements[category + 'Grid'];
      if (!grid) return;

      grid.innerHTML = menuCategories[category].map(item => createProductCard(item)).join('');
      initProductCards(grid);
    });
  }

  /* ========================================
     PIZZA CONSTRUCTOR
  ======================================== */
  function renderDoughOptions() {
    elements.doughOptions.innerHTML = doughOptions.map(dough => `
      <button class="constructor__dough-btn ${constructorState.dough.id === dough.id ? 'constructor__dough-btn--active' : ''}" data-dough-id="${dough.id}">
        <span class="constructor__dough-icon">${dough.icon}</span>
        <span class="constructor__dough-name">${dough.name}</span>
        <span class="constructor__dough-desc">${dough.description}</span>
        ${dough.price > 0 ? `<span class="constructor__dough-price">+${dough.price} ₽</span>` : ''}
      </button>
    `).join('');
  }

  function renderSizeOptions() {
    elements.sizeOptions.innerHTML = sizeOptions.map(size => `
      <button class="constructor__size-btn ${constructorState.size.id === size.id ? 'constructor__size-btn--active' : ''}" data-size-id="${size.id}">
        <div class="constructor__size-circle constructor__size-circle--${size.id}">
          <span class="constructor__size-number">${size.diameter}</span>
        </div>
        <span class="constructor__size-name">${size.name}</span>
        <span class="constructor__size-cm">${size.diameter} см</span>
        ${size.price > 0 ? `<span class="constructor__size-price">+${size.price} ₽</span>` : ''}
      </button>
    `).join('');
  }

  function renderToppingTabs() {
    elements.toppingTabs.querySelectorAll('.constructor__tab').forEach(tab => {
      tab.classList.toggle('constructor__tab--active', tab.dataset.category === constructorState.activeCategory);
    });
  }

  function renderToppingsGrid() {
    const filteredToppings = toppingOptions.filter(t => t.category === constructorState.activeCategory);
    elements.toppingsGrid.innerHTML = filteredToppings.map(topping => {
      const isSelected = constructorState.toppings.some(t => t.id === topping.id);
      return `
        <button class="constructor__topping-btn ${isSelected ? 'constructor__topping-btn--active' : ''}" data-topping-id="${topping.id}">
          <div class="constructor__topping-check">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20,6 9,17 4,12"></polyline></svg>
          </div>
          <span class="constructor__topping-emoji">${topping.icon}</span>
          <span class="constructor__topping-name">${topping.name}</span>
          <span class="constructor__topping-price ${topping.price === 0 ? 'constructor__topping-price--free' : ''}">${topping.price === 0 ? 'Бесплатно' : '+' + topping.price + ' ₽'}</span>
        </button>
      `;
    }).join('');
  }

  function renderSelectedToppings() {
    elements.selectedToppings.innerHTML = constructorState.toppings.map(topping => `
      <span class="constructor__selected-tag" data-topping-id="${topping.id}">
        ${topping.icon} ${topping.name}
        <button class="constructor__selected-remove">×</button>
      </span>
    `).join('');
  }

  function renderPizzaPreview() {
    // Base size
    const sizeClass = 'constructor__pizza-base--' + constructorState.size.id;
    elements.pizzaBase.className = 'constructor__pizza-base ' + sizeClass;
    if (constructorState.dough.id === 'cheese-crust') {
      elements.pizzaBase.classList.add('constructor__pizza-base--cheese-crust');
    }

    // Sauce
    const hasSauce = constructorState.toppings.some(t => t.category === 'sauce');
    elements.pizzaSauce.classList.toggle('constructor__pizza-sauce--visible', hasSauce);

    // Cheese
    const hasCheese = constructorState.toppings.some(t => t.category === 'cheese');
    elements.pizzaCheese.classList.toggle('constructor__pizza-cheese--visible', hasCheese);

    // Toppings
    const visibleToppings = constructorState.toppings.filter(t => t.category !== 'sauce');
    elements.pizzaToppings.innerHTML = visibleToppings.map(t => `<span class="constructor__pizza-topping">${t.icon}</span>`).join('');

    // Size label
    elements.pizzaSizeLabel.textContent = constructorState.size.diameter + ' см';

    // Summary
    const doughPrice = constructorState.dough.price;
    const sizePrice = constructorState.size.price;
    const toppingsPrice = constructorState.toppings.reduce((sum, t) => sum + t.price, 0);
    const totalPrice = BASE_PIZZA_PRICE + doughPrice + sizePrice + toppingsPrice;

    let summaryHtml = `
      <div class="constructor__summary-row">
        <span class="constructor__summary-label">Базовая цена</span>
        <span class="constructor__summary-value">${BASE_PIZZA_PRICE} ₽</span>
      </div>
    `;

    if (doughPrice > 0) {
      summaryHtml += `
        <div class="constructor__summary-row">
          <span class="constructor__summary-label">Тесто (${constructorState.dough.name})</span>
          <span class="constructor__summary-value">+${doughPrice} ₽</span>
        </div>
      `;
    }

    if (sizePrice > 0) {
      summaryHtml += `
        <div class="constructor__summary-row">
          <span class="constructor__summary-label">Размер (${constructorState.size.name})</span>
          <span class="constructor__summary-value">+${sizePrice} ₽</span>
        </div>
      `;
    }

    if (toppingsPrice > 0) {
      summaryHtml += `
        <div class="constructor__summary-row">
          <span class="constructor__summary-label">Начинки (${constructorState.toppings.length} шт.)</span>
          <span class="constructor__summary-value">+${toppingsPrice} ₽</span>
        </div>
      `;
    }

    summaryHtml += `
      <div class="constructor__summary-row constructor__summary-row--total">
        <span class="constructor__summary-label">Итого</span>
        <span class="constructor__summary-value">${totalPrice} ₽</span>
      </div>
    `;

    elements.pizzaSummary.innerHTML = summaryHtml;
  }

  function updateConstructor() {
    renderDoughOptions();
    renderSizeOptions();
    renderToppingTabs();
    renderToppingsGrid();
    renderSelectedToppings();
    renderPizzaPreview();
  }

  function initConstructor() {
    if (!elements.doughOptions) return;

    updateConstructor();

    // Dough selection
    elements.doughOptions.addEventListener('click', function (e) {
      const btn = e.target.closest('.constructor__dough-btn');
      if (!btn) return;
      constructorState.dough = doughOptions.find(d => d.id === btn.dataset.doughId);
      updateConstructor();
    });

    // Size selection
    elements.sizeOptions.addEventListener('click', function (e) {
      const btn = e.target.closest('.constructor__size-btn');
      if (!btn) return;
      constructorState.size = sizeOptions.find(s => s.id === btn.dataset.sizeId);
      updateConstructor();
    });

    // Topping tabs
    elements.toppingTabs.addEventListener('click', function (e) {
      const tab = e.target.closest('.constructor__tab');
      if (!tab) return;
      constructorState.activeCategory = tab.dataset.category;
      updateConstructor();
    });

    // Topping selection
    elements.toppingsGrid.addEventListener('click', function (e) {
      const btn = e.target.closest('.constructor__topping-btn');
      if (!btn) return;
      const topping = toppingOptions.find(t => t.id === btn.dataset.toppingId);
      const exists = constructorState.toppings.some(t => t.id === topping.id);
      if (exists) {
        constructorState.toppings = constructorState.toppings.filter(t => t.id !== topping.id);
      } else {
        constructorState.toppings.push(topping);
      }
      updateConstructor();
    });

    // Remove selected topping
    elements.selectedToppings.addEventListener('click', function (e) {
      const removeBtn = e.target.closest('.constructor__selected-remove');
      if (!removeBtn) return;
      const tag = removeBtn.closest('.constructor__selected-tag');
      const toppingId = tag.dataset.toppingId;
      constructorState.toppings = constructorState.toppings.filter(t => t.id !== toppingId);
      updateConstructor();
    });

    // Add to cart
    elements.addPizzaToCart.addEventListener('click', function () {
      const doughPrice = constructorState.dough.price;
      const sizePrice = constructorState.size.price;
      const toppingsPrice = constructorState.toppings.reduce((sum, t) => sum + t.price, 0);
      const totalPrice = BASE_PIZZA_PRICE + doughPrice + sizePrice + toppingsPrice;

      const toppingNames = constructorState.toppings.map(t => t.name).join(', ');

      addToCart({
        id: 'custom-pizza-' + Date.now(),
        name: `Пицца от шефа (${constructorState.size.diameter} см)`,
        price: totalPrice,
        image: 'pizza-pepperoni.jpg' // Placeholder
      });
    });

    // Reset
    elements.resetPizza.addEventListener('click', function () {
      constructorState = {
        dough: doughOptions[0],
        size: sizeOptions[1],
        toppings: [toppingOptions.find(t => t.id === 'tomato-sauce')],
        activeCategory: 'sauce'
      };
      updateConstructor();
    });
  }

  /* ========================================
     CHECKOUT PAGE
  ======================================== */
  function initCheckout() {
    const checkoutEmpty = document.getElementById('checkoutEmpty');
    const checkoutContent = document.getElementById('checkoutContent');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutItemsCount = document.getElementById('checkoutItemsCount');
    const deliveryFields = document.getElementById('deliveryFields');
    const pickupFields = document.getElementById('pickupFields');
    const deliveryToggleBtns = document.querySelectorAll('.checkout-form__toggle-btn');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryDelivery = document.getElementById('summaryDelivery');
    const summaryTotal = document.getElementById('summaryTotal');
    const discountRow = document.getElementById('discountRow');
    const deliveryRow = document.getElementById('deliveryRow');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressAmount = document.getElementById('progressAmount');
    const promoInput = document.getElementById('promoCode');
    const applyPromoBtn = document.getElementById('applyPromo');
    const promoApplied = document.getElementById('promoApplied');
    const promoAppliedText = document.getElementById('promoAppliedText');
    const removePromoBtn = document.getElementById('removePromo');
    const promoError = document.getElementById('promoError');
    const submitOrderBtn = document.getElementById('submitOrder');
    const sauceButtons = document.querySelectorAll('.checkout-sauce');
    const drinkButtons = document.querySelectorAll('.checkout-drink');

    if (!checkoutEmpty) return; // Not on checkout page

    let deliveryType = 'delivery';

    function updateCheckoutUI() {
      const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      if (cart.length === 0) {
        checkoutEmpty.classList.remove('checkout__empty--hidden');
        checkoutContent.classList.remove('checkout__content--visible');
        return;
      }

      checkoutEmpty.classList.add('checkout__empty--hidden');
      checkoutContent.classList.add('checkout__content--visible');

      // Render items
      checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item" data-item-key="${item.key}">
          <img src="${item.image}" alt="${item.name}" class="checkout-item__image" loading="lazy">
          <div class="checkout-item__info">
            <h4 class="checkout-item__name">${item.name}</h4>
            ${item.size ? `<p class="checkout-item__size">${item.size}</p>` : ''}
            ${item.pieces ? `<p class="checkout-item__size">${item.pieces} шт</p>` : ''}
            <p class="checkout-item__price">${formatPrice(item.price * item.quantity)}</p>
          </div>
          <div class="checkout-item__actions">
            <button class="checkout-item__remove" data-remove-item>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <div class="checkout-item__quantity">
              <button class="checkout-item__qty-btn" data-qty-action="decrease">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <span class="checkout-item__qty-value">${item.quantity}</span>
              <button class="checkout-item__qty-btn" data-qty-action="increase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      checkoutItemsCount.textContent = itemCount + ' ' + getItemWord(itemCount);

      // Calculate totals
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const discount = appliedPromo ? Math.round(subtotal * appliedPromo.discount) : 0;
      const subtotalAfterDiscount = subtotal - discount;
      const deliveryCost = deliveryType === 'delivery' && subtotalAfterDiscount < FREE_DELIVERY_THRESHOLD ? DELIVERY_PRICE : 0;
      const total = subtotalAfterDiscount + deliveryCost;
      const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotalAfterDiscount);
      const progress = Math.min(100, (subtotalAfterDiscount / FREE_DELIVERY_THRESHOLD) * 100);

      summarySubtotal.textContent = formatPrice(subtotal);
      
      if (appliedPromo) {
        discountRow.style.display = 'flex';
        summaryDiscount.textContent = '-' + formatPrice(discount);
      } else {
        discountRow.style.display = 'none';
      }

      if (deliveryType === 'delivery') {
        deliveryRow.style.display = 'flex';
        summaryDelivery.textContent = deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost);
        
        if (remainingForFree > 0) {
          progressText.innerHTML = `До бесплатной доставки ещё <span>${formatPrice(remainingForFree)}</span>`;
        } else {
          progressText.textContent = 'Бесплатная доставка!';
        }
        progressFill.style.width = progress + '%';
      } else {
        deliveryRow.style.display = 'none';
        progressText.textContent = 'Самовывоз — доставка не нужна';
        progressFill.style.width = '100%';
      }

      summaryTotal.textContent = formatPrice(total);
    }

    function getItemWord(count) {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod100 >= 11 && mod100 <= 19) return 'товаров';
      if (mod10 === 1) return 'товар';
      if (mod10 >= 2 && mod10 <= 4) return 'товара';
      return 'товаров';
    }

    // Event handlers
    checkoutItems.addEventListener('click', function(e) {
      const item = e.target.closest('.checkout-item');
      if (!item) return;
      const key = item.dataset.itemKey;

      const removeBtn = e.target.closest('[data-remove-item]');
      if (removeBtn) {
        cart = cart.filter(c => c.key !== key);
        saveCart();
        updateCart();
        updateCheckoutUI();
        return;
      }

      const qtyBtn = e.target.closest('[data-qty-action]');
      if (qtyBtn) {
        const action = qtyBtn.dataset.qtyAction;
        const cartItem = cart.find(c => c.key === key);
        if (cartItem) {
          if (action === 'increase') {
            cartItem.quantity++;
          } else if (action === 'decrease') {
            cartItem.quantity--;
            if (cartItem.quantity <= 0) {
              cart = cart.filter(c => c.key !== key);
            }
          }
          saveCart();
          updateCart();
          updateCheckoutUI();
        }
      }
    });

    // Delivery type toggle
    deliveryToggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        deliveryToggleBtns.forEach(b => b.classList.remove('checkout-form__toggle-btn--active'));
        this.classList.add('checkout-form__toggle-btn--active');
        deliveryType = this.dataset.type;
        
        if (deliveryType === 'delivery') {
          deliveryFields.style.display = 'block';
          pickupFields.style.display = 'none';
        } else {
          deliveryFields.style.display = 'none';
          pickupFields.style.display = 'block';
        }
        updateCheckoutUI();
      });
    });

    // Promo code
    applyPromoBtn.addEventListener('click', function() {
      const code = promoInput.value.toUpperCase().trim();
      if (PROMO_CODES[code]) {
        appliedPromo = { code: code, discount: PROMO_CODES[code] };
        promoInput.style.display = 'none';
        applyPromoBtn.style.display = 'none';
        promoApplied.style.display = 'flex';
        promoAppliedText.textContent = code;
        promoError.textContent = '';
        updateCheckoutUI();
        showToast('Промокод применён!');
      } else {
        promoError.textContent = 'Промокод не найден';
      }
    });

    removePromoBtn.addEventListener('click', function() {
      appliedPromo = null;
      promoInput.style.display = 'block';
      applyPromoBtn.style.display = 'block';
      promoApplied.style.display = 'none';
      promoInput.value = '';
      updateCheckoutUI();
    });

    // Sauces & Drinks
    sauceButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        addToCart({
          id: this.dataset.id,
          name: this.dataset.name,
          price: parseInt(this.dataset.price),
          image: 'pizza-pepperoni.jpg'
        });
        updateCheckoutUI();
      });
    });

    drinkButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const img = this.querySelector('img');
        addToCart({
          id: this.dataset.id,
          name: this.dataset.name,
          price: parseInt(this.dataset.price),
          image: img ? img.src : 'drink-cola.jpg'
        });
        updateCheckoutUI();
      });
    });

    // Submit order
    submitOrderBtn.addEventListener('click', function() {
      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      
      if (!name || !phone) {
        showToast('Заполните имя и телефон');
        return;
      }

      if (deliveryType === 'delivery') {
        const street = document.getElementById('street').value.trim();
        const house = document.getElementById('house').value.trim();
        if (!street || !house) {
          showToast('Заполните адрес доставки');
          return;
        }
      }

      showToast('Заказ успешно оформлен!');
      cart = [];
      appliedPromo = null;
      saveCart();
      updateCart();
      
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 2000);
    });

    // Initial update
    updateCheckoutUI();
  }

  /* ========================================
     CART SIDEBAR (for inner pages)
  ======================================== */
  function initCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    if (!cartSidebar) return;

    function openCartSidebar() {
      cartSidebar.classList.add('cart-sidebar--open');
      cartOverlay.classList.add('cart-overlay--visible');
      document.body.style.overflow = 'hidden';
      renderCartSidebar();
    }

    function closeCartSidebar() {
      cartSidebar.classList.remove('cart-sidebar--open');
      cartOverlay.classList.remove('cart-overlay--visible');
      document.body.style.overflow = '';
    }

    function renderCartSidebar() {
      if (cart.length === 0) {
        cartContent.innerHTML = `
          <div class="cart-sidebar__empty">
            <p>Корзина пуста</p>
          </div>
        `;
        cartFooter.style.display = 'none';
        return;
      }

      cartContent.innerHTML = cart.map(item => `
        <div class="cart__item" data-item-key="${item.key}">
          <img src="${item.image}" alt="${item.name}" class="cart__item-image" loading="lazy">
          <div class="cart__item-info">
            <span class="cart__item-name">${item.name}</span>
            <span class="cart__item-price">${formatPrice(item.price * item.quantity)}</span>
            <div class="cart__item-footer">
              <div class="cart__item-quantity">
                <button class="cart__item-qty-btn" data-qty-action="decrease">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="cart__item-qty-value">${item.quantity}</span>
                <button class="cart__item-qty-btn" data-qty-action="increase">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <button class="cart__item-remove" data-remove-item>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotal.textContent = formatPrice(total);
      cartFooter.style.display = 'block';
    }

    // Event listeners
    document.getElementById('cartBtn').addEventListener('click', openCartSidebar);
    cartClose.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    cartContent.addEventListener('click', function(e) {
      const item = e.target.closest('.cart__item');
      if (!item) return;
      const key = item.dataset.itemKey;

      const removeBtn = e.target.closest('[data-remove-item]');
      if (removeBtn) {
        cart = cart.filter(c => c.key !== key);
        saveCart();
        updateCart();
        renderCartSidebar();
        return;
      }

      const qtyBtn = e.target.closest('[data-qty-action]');
      if (qtyBtn) {
        const action = qtyBtn.dataset.qtyAction;
        const cartItem = cart.find(c => c.key === key);
        if (cartItem) {
          if (action === 'increase') {
            cartItem.quantity++;
          } else if (action === 'decrease') {
            cartItem.quantity--;
            if (cartItem.quantity <= 0) {
              cart = cart.filter(c => c.key !== key);
            }
          }
          saveCart();
          updateCart();
          renderCartSidebar();
        }
      }
    });
  }

  /* ========================================
     CATEGORY PAGE (pizza.html, rolls.html, etc.)
  ======================================== */
  function initCategoryPage() {
    var categorySection = document.querySelector('[data-category]');
    if (!categorySection) return;

    var categoryName = categorySection.dataset.category;
    var items = menuCategories[categoryName];
    if (!items) return;

    var grid = document.getElementById('categoryGrid');
    var filtersContainer = document.getElementById('categoryFilters');
    var emptyState = document.getElementById('categoryEmpty');
    var resetBtn = document.getElementById('categoryReset');
    var selectedFilters = [];

    // Render products
    function renderProducts(filteredItems) {
      grid.innerHTML = filteredItems.map(function(item) { return createProductCard(item); }).join('');
      initProductCards(grid);

      if (filteredItems.length === 0 && emptyState) {
        emptyState.style.display = 'block';
        grid.style.display = 'none';
      } else {
        if (emptyState) emptyState.style.display = 'none';
        grid.style.display = '';
      }
    }

    // Render filters
    var filters = categoryFilters[categoryName];
    if (filters && filtersContainer) {
      filtersContainer.innerHTML = filters.map(function(f) {
        return '<button class="menu-category__filter" data-filter-id="' + f.id + '">' +
          '<span class="menu-category__filter-icon">' + f.icon + '</span> ' +
          f.label +
          '</button>';
      }).join('');

      filtersContainer.addEventListener('click', function(e) {
        var btn = e.target.closest('.menu-category__filter');
        if (!btn) return;
        var filterId = btn.dataset.filterId;
        var idx = selectedFilters.indexOf(filterId);
        if (idx > -1) {
          selectedFilters.splice(idx, 1);
          btn.classList.remove('menu-category__filter--active');
        } else {
          selectedFilters.push(filterId);
          btn.classList.add('menu-category__filter--active');
        }
        applyFilters();
      });
    }

    function applyFilters() {
      if (selectedFilters.length === 0) {
        renderProducts(items);
        return;
      }
      var filtered = items.filter(function(item) {
        if (!item.filterTags) return false;
        return selectedFilters.some(function(f) { return item.filterTags.indexOf(f) > -1; });
      });
      renderProducts(filtered);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        selectedFilters = [];
        if (filtersContainer) {
          filtersContainer.querySelectorAll('.menu-category__filter').forEach(function(btn) {
            btn.classList.remove('menu-category__filter--active');
          });
        }
        applyFilters();
      });
    }

    // Initial render
    renderProducts(items);
  }

  /* ========================================
     INITIALIZATION
  ======================================== */
  function init() {
    initSmoothScroll();
    initMobileMenu();
    initCart();
    initPopular();
    initMenu();
    initConstructor();
    initCheckout();
    initCartSidebar();
    initCategoryPage();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
