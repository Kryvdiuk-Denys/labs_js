const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const parseQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        search: params.get('search') || '',
        sort: params.get('sort') || 'name-asc',
        minAge: parseInt(params.get('minAge')) || null,
        maxAge: parseInt(params.get('maxAge')) || null,
        gender: params.get('gender') || 'all',
        country: params.get('country') || 'all',
        email: params.get('email') || '',
        tab: params.get('tab') || 'all',
        page: parseInt(params.get('page')) || 1
    };
};

const updateQueryParams = (params) => {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.set('search', params.search);
    if (params.sort && params.sort !== 'name-asc') searchParams.set('sort', params.sort);
    if (params.minAge) searchParams.set('minAge', params.minAge);
    if (params.maxAge) searchParams.set('maxAge', params.maxAge);
    if (params.gender && params.gender !== 'all') searchParams.set('gender', params.gender);
    if (params.country && params.country !== 'all') searchParams.set('country', params.country);
    if (params.email) searchParams.set('email', params.email);
    if (params.page && params.page !== 1) searchParams.set('page', params.page);
    searchParams.set('tab', params.tab);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
};

const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.form');
const successMessage = document.getElementById('successMessage');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const countries = {
    Україна: ['Київ', 'Львів', 'Одеса', 'Чернівці'],
    Польща: ['Варшава', 'Краків', 'Гданськ'],
    Німеччина: ['Берлін', 'Мюнхен', 'Гамбург']
};

const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');

const setMessage = (text, success = true) => {
    successMessage.textContent = text;
    successMessage.style.color = success ? '#1e4620' : '#b71c1c';
};

const resetMessage = () => {
    successMessage.textContent = '';
};

const switchTab = tab => {
    tabs.forEach(button => {
        button.classList.toggle('active', button === tab);
        button.setAttribute('aria-selected', button === tab);
    });

    forms.forEach(form => {
        const isActive = form.id === `${tab.dataset.tab}Form`;
        form.classList.toggle('active', isActive);
        form.setAttribute('aria-hidden', !isActive);
    });

    resetMessage();
};

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => switchTab(tab));
    tab.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            const nextIndex = event.key === 'ArrowRight'
                ? (index + 1) % tabs.length
                : (index - 1 + tabs.length) % tabs.length;
            tabs[nextIndex].focus();
            switchTab(tabs[nextIndex]);
        }
    });
});

const togglePassword = button => {
    const input = button.previousElementSibling;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.setAttribute('aria-label', isPassword ? 'Приховати пароль' : 'Показати пароль');
};

document.querySelectorAll('.toggle').forEach(button => {
    button.addEventListener('click', () => togglePassword(button));
});

const createOption = (value, label) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    return option;
};

Object.keys(countries).forEach(country => countrySelect.appendChild(createOption(country, country)));

countrySelect.addEventListener('change', () => {
    citySelect.innerHTML = '';

    if (countrySelect.value) {
        citySelect.appendChild(createOption('', 'Оберіть місто'));
        countries[countrySelect.value].forEach(city => citySelect.appendChild(createOption(city, city)));
        citySelect.disabled = false;
    } else {
        citySelect.appendChild(createOption('', 'Спершу оберіть країну'));
        citySelect.disabled = true;
    }
});

const setError = (input, message) => {
    const group = input.closest('.form-group');
    group.classList.add('error');
    group.classList.remove('success');
    input.setAttribute('aria-invalid', 'true');
    const small = group.querySelector('small');
    if (small) small.textContent = message;
};

const setSuccess = input => {
    const group = input.closest('.form-group');
    group.classList.remove('error');
    group.classList.add('success');
    input.setAttribute('aria-invalid', 'false');
    const small = group.querySelector('small');
    if (small) small.textContent = '';
};

const clearValidation = group => {
    group.classList.remove('error', 'success');
    const small = group.querySelector('small');
    if (small) small.textContent = '';
};

const isAtLeast = (value, min) => value.trim().length >= min;
const isWithinRange = (value, min, max) => value.trim().length >= min && value.trim().length <= max;
const isEmailValid = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhoneValid = value => /^\+380\d{9}$/.test(value);

const calculateAge = dobValue => {
    const birth = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age -= 1;
    }
    return age;
};

const validateRegistration = () => {
    let valid = true;
    const firstName = registerForm.firstName;
    const lastName = registerForm.lastName;
    const email = registerForm.email;
    const password = registerForm.password;
    const confirmPassword = registerForm.confirmPassword;
    const phone = registerForm.phone;
    const dob = registerForm.dob;
    const sex = registerForm.sex;
    const country = registerForm.country;
    const city = registerForm.city;

    if (!isWithinRange(firstName.value, 3, 15)) {
        setError(firstName, "Ім'я має містити 3–15 символів");
        valid = false;
    } else {
        setSuccess(firstName);
    }

    if (!isWithinRange(lastName.value, 3, 15)) {
        setError(lastName, "Прізвище має містити 3–15 символів");
        valid = false;
    } else {
        setSuccess(lastName);
    }

    if (!isEmailValid(email.value)) {
        setError(email, "Введіть коректний email");
        valid = false;
    } else {
        setSuccess(email);
    }

    if (!isAtLeast(password.value, 6)) {
        setError(password, "Пароль має бути не менше 6 символів");
        valid = false;
    } else {
        setSuccess(password);
    }

    if (!confirmPassword.value) {
        setError(confirmPassword, "Підтвердження паролю є обов'язковим");
        valid = false;
    } else if (confirmPassword.value !== password.value) {
        setError(confirmPassword, "Паролі мають співпадати");
        valid = false;
    } else {
        setSuccess(confirmPassword);
    }

    if (!isPhoneValid(phone.value)) {
        setError(phone, "Телефон має формат +380XXXXXXXXX");
        valid = false;
    } else {
        setSuccess(phone);
    }

    if (!dob.value) {
        setError(dob, "Оберіть дату народження");
        valid = false;
    } else {
        const dateValue = new Date(dob.value);
        const today = new Date();
        if (dateValue > today) {
            setError(dob, "Дата не може бути у майбутньому");
            valid = false;
        } else if (calculateAge(dob.value) < 12) {
            setError(dob, "Вам має бути не менше 12 років для реєстрації");
            valid = false;
        } else {
            setSuccess(dob);
        }
    }

    if (!sex.value) {
        setError(sex, "Оберіть стать");
        valid = false;
    } else {
        setSuccess(sex);
    }

    if (!country.value) {
        setError(country, "Оберіть країну");
        valid = false;
    } else {
        setSuccess(country);
    }

    if (!city.value) {
        setError(city, "Оберіть місто");
        valid = false;
    } else {
        setSuccess(city);
    }

    return valid;
};

const validateLogin = () => {
    let valid = true;
    const username = loginForm.username;
    const password = loginForm.loginPassword;

    if (!username.value.trim()) {
        setError(username, "Ім'я користувача не може бути порожнім");
        valid = false;
    } else {
        setSuccess(username);
    }

    if (!isAtLeast(password.value, 6)) {
        setError(password, "Пароль має бути не менше 6 символів");
        valid = false;
    } else {
        setSuccess(password);
    }

    return valid;
};

registerForm.addEventListener('submit', event => {
    event.preventDefault();
    resetMessage();

    if (validateRegistration()) {
        const firstName = registerForm.firstName.value;
        const lastName = registerForm.lastName.value;
        const email = registerForm.email.value;

        const user = {
            name: `${firstName} ${lastName}`,
            email,
            password: registerForm.password.value
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        state.currentUser = user;
        
        setMessage('Успішна реєстрація! Раді вітати вас на платформі.');
        
        setTimeout(() => {
            registerForm.reset();
            registerForm.querySelectorAll('.form-group').forEach(clearValidation);
            citySelect.disabled = true;
            citySelect.innerHTML = '';
            citySelect.appendChild(createOption('', 'Спершу оберіть країну'));
            showMainApp();
            fetchUsers();
        }, 1500);
    }
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    resetMessage();

    if (validateLogin()) {
        const username = loginForm.username.value;
        const password = loginForm.loginPassword.value;

        const user = {
            name: username.includes('@') ? username.split('@')[0] : username,
            email: username,
            password
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        state.currentUser = user;
        
        setMessage('Успішна авторизація! Вітаємо.');
        
        setTimeout(() => {
            loginForm.reset();
            loginForm.querySelectorAll('.form-group').forEach(clearValidation);
            showMainApp();
            fetchUsers();
        }, 1500);
    }
});

[registerForm, loginForm].forEach(form => {
    form.addEventListener('input', event => {
        const target = event.target;
        if (target.closest('.form-group')) {
            clearValidation(target.closest('.form-group'));
            target.setAttribute('aria-invalid', 'false');
            resetMessage();
        }
    });
});

document.querySelectorAll('.form-group small').forEach(el => el.setAttribute('aria-live', 'polite'));

countrySelect.addEventListener('focus', () => resetMessage());
citySelect.addEventListener('focus', () => resetMessage());

if (!countrySelect.value) {
    citySelect.disabled = true;
    citySelect.innerHTML = '';
    citySelect.appendChild(createOption('', 'Спершу оберіть країну'));
}

switchTab(tabs[0]);

const authContainer = document.getElementById('auth-container');
const mainContainer = document.getElementById('main-container');
const logoutBtn = document.getElementById('logout-btn');
const currentUserEl = document.getElementById('current-user');
const searchInput = document.getElementById('search-input');
const userCardsContainer = document.getElementById('user-cards-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const pageNumbersContainer = document.getElementById('page-numbers');
const minAgeInput = document.getElementById('min-age');
const maxAgeInput = document.getElementById('max-age');
const genderFilter = document.getElementById('gender-filter');
const countryFilter = document.getElementById('country-filter');
const sortBy = document.getElementById('sort-by');
const emailFilter = document.getElementById('email-filter');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');


let state = {
    currentUser: null,
    users: [],
    filteredUsers: [],
    favorites: new Set(),
    currentPage: 1,
    itemsPerPage: 30,
    hasMore: true,
    isFetching: false,
    totalPages: 1,
    isLoading: false,
    error: null,
    activeTab: 'all',
    queryParams: parseQueryParams(),
    allUsersLoaded: false
};

const initApp = () => {
    state.queryParams = parseQueryParams();
    state.currentPage = state.queryParams.page;
    const user = localStorage.getItem('currentUser');
    
    if (user) {
        state.currentUser = JSON.parse(user);
        showMainApp();
        loadFavorites();
        fetchUsers();
    } else {
        showAuthForm();
    }

    setupEventListeners();
};

const showAuthForm = () => {
    authContainer.classList.remove('hidden');
    mainContainer.classList.add('hidden');
};

const showMainApp = () => {
    authContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
    currentUserEl.textContent = state.currentUser.name;
};

const setupEventListeners = () => {
    logoutBtn.addEventListener('click', handleLogout);

    searchInput.addEventListener('input', debounce(handleSearch, 300));
    minAgeInput.addEventListener('change', handleFilterChange);
    maxAgeInput.addEventListener('change', handleFilterChange);
    genderFilter.addEventListener('change', handleFilterChange);
    countryFilter.addEventListener('change', handleFilterChange);
    emailFilter.addEventListener('input', debounce(handleEmailFilter, 300));
    sortBy.addEventListener('change', handleSortChange);
    prevPage.addEventListener('click', handlePrevPage);
    nextPage.addEventListener('click', handleNextPage);
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchMainTab(btn.dataset.tab));
    });

    window.addEventListener('scroll', handleScroll);

    window.addEventListener('popstate', () => {
        state.queryParams = parseQueryParams();
        state.currentPage = state.queryParams.page;
        applyFiltersAndRender();
    });
};

const switchMainTab = (tab) => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    state.activeTab = tab;
    state.queryParams.tab = tab;
    state.currentPage = 1;
    updateQueryParams(state.queryParams);
    applyFiltersAndRender();
};

const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favorites');
    state.currentUser = null;
    state.favorites = new Set();
    showAuthForm();
};

const handleEmailFilter = (e) => {
    state.queryParams.email = e.target.value.trim();
    state.queryParams.page = 1;
    updateQueryParams(state.queryParams);
    applyFiltersAndRender();
};

const fetchUsers = async () => {
    try {
        state.isLoading = true;
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        if (state.allUsersLoaded) {
            applyFiltersAndRender();
            return;
        }

        const response = await fetch(`https://randomuser.me/api/?results=100&seed=friendsearch`);
        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
        const newUsers = data.results.map(user => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            firstName: user.name.first,
            lastName: user.name.last,
            age: user.dob.age,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            picture: user.picture.large,
            location: {
                city: user.location.city,
                country: user.location.country
            },
            registered: new Date(user.registered.date)
        }));

        state.users = [...state.users, ...newUsers];
        state.allUsersLoaded = true;
        localStorage.setItem('cachedUsers', JSON.stringify(state.users));

        updateCountryFilter();
        applyFiltersAndRender();

    } catch (err) {
        showError(err.message);
    } finally {
        state.isLoading = false;
        loadingSpinner.classList.add('hidden');
    }
};

const updateCountryFilter = () => {
    const countries = [...new Set(state.users.map(user => user.location.country))].sort();

    countryFilter.innerHTML = '<option value="all">Усі</option>';

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });

    if (state.queryParams.country && state.queryParams.country !== 'all') {
        countryFilter.value = state.queryParams.country;
    }
};

const applyFilters = () => {
    let filtered = [...state.users];

    if (state.queryParams.search) {
        const searchTerm = state.queryParams.search.toLowerCase();
        filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.location.city.toLowerCase().includes(searchTerm) ||
            user.location.country.toLowerCase().includes(searchTerm)
        );
    }

    if (state.queryParams.minAge) {
        filtered = filtered.filter(user => user.age >= state.queryParams.minAge);
    }
    if (state.queryParams.maxAge) {
        filtered = filtered.filter(user => user.age <= state.queryParams.maxAge);
    }

    if (state.queryParams.gender !== 'all') {
        filtered = filtered.filter(user => user.gender === state.queryParams.gender);
    }

    if (state.queryParams.country !== 'all') {
        filtered = filtered.filter(user => user.location.country === state.queryParams.country);
    }

    if (state.queryParams.email) {
        const emailTerm = state.queryParams.email.toLowerCase();
        filtered = filtered.filter(user =>
            user.email.toLowerCase().includes(emailTerm)
        );
    }

    filtered = sortUsers(filtered, state.queryParams.sort);

    if (state.activeTab === 'favorites') {
        filtered = filtered.filter(user => state.favorites.has(user.id));
    }

    state.filteredUsers = filtered;
    state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);
    state.hasMore = state.currentPage < state.totalPages;
};

const sortUsers = (users, sortBy) => {
    switch (sortBy) {
        case 'name-asc':
            return [...users].sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return [...users].sort((a, b) => b.name.localeCompare(a.name));
        case 'age-asc':
            return [...users].sort((a, b) => a.age - b.age);
        case 'age-desc':
            return [...users].sort((a, b) => b.age - a.age);
        case 'registered-asc':
            return [...users].sort((a, b) => a.registered - b.registered);
        case 'registered-desc':
            return [...users].sort((a, b) => b.registered - a.registered);
        default:
            return users;
    }
};

const renderUsers = () => {
    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const endIdx = startIdx + state.itemsPerPage;
    const usersToDisplay = state.filteredUsers.slice(0, endIdx);

    userCardsContainer.innerHTML = '';

    if (usersToDisplay.length === 0) {
        const message = state.activeTab === 'favorites'
            ? 'У вас немає улюблених друзів.'
            : 'Не знайдено користувачів, які відповідають вашим критеріям.';
        userCardsContainer.innerHTML = `<p class="no-results">${message}</p>`;
        return;
    }

    usersToDisplay.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <img src="${user.picture}" alt="${user.name}" class="user-card-img">
            <button class="favorite-btn ${state.favorites.has(user.id) ? 'favorited' : ''}" data-id="${user.id}">
                <i class="fas fa-heart"></i>
            </button>
            <div class="user-card-content">
                <h3 class="user-card-name">${user.name}</h3>
                <p class="user-card-info"><i class="fas fa-birthday-cake"></i> ${user.age} років</p>
                <p class="user-card-info"><i class="fas fa-${user.gender === 'male' ? 'mars' : 'venus'}"></i> ${user.gender === 'male' ? 'Чоловіча' : 'Жіноча'}</p>
                <p class="user-card-info"><i class="fas fa-phone"></i> ${user.phone}</p>
                <p class="user-card-info"><i class="fas fa-envelope"></i> ${user.email}</p>
                <p class="user-card-info"><i class="fas fa-map-marker-alt"></i> ${user.location.city}, ${user.location.country}</p>
                <p class="user-card-info"><i class="fas fa-calendar-alt"></i> Зареєстрований ${formatDate(user.registered)}</p>
            </div>
        `;
        userCardsContainer.appendChild(card);
    });

    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });

    updatePagination();
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const applyFiltersAndRender = () => {
    searchInput.value = state.queryParams.search || '';
    minAgeInput.value = state.queryParams.minAge || '';
    maxAgeInput.value = state.queryParams.maxAge || '';
    genderFilter.value = state.queryParams.gender || 'all';
    sortBy.value = state.queryParams.sort || 'name-asc';

    applyFilters();
    renderUsers();
};

const handleSearch = (e) => {
    const searchTerm = e.target.value.trim();
    state.queryParams.search = searchTerm;
    state.queryParams.page = 1;
    updateQueryParams(state.queryParams);
    applyFiltersAndRender();
};

const handleFilterChange = () => {
    state.queryParams.minAge = minAgeInput.value ? parseInt(minAgeInput.value) : null;
    state.queryParams.maxAge = maxAgeInput.value ? parseInt(maxAgeInput.value) : null;
    state.queryParams.gender = genderFilter.value;
    state.queryParams.country = countryFilter.value;
    state.queryParams.page = 1;
    updateQueryParams(state.queryParams);
    applyFiltersAndRender();
};

const handleSortChange = () => {
    state.queryParams.sort = sortBy.value;
    state.queryParams.page = 1;
    updateQueryParams(state.queryParams);
    applyFiltersAndRender();
};

const handlePrevPage = () => {
    if (state.currentPage > 1) {
        state.currentPage -= 1;
        state.queryParams.page = state.currentPage;
        updateQueryParams(state.queryParams);
        applyFiltersAndRender();
    }
};

const handleNextPage = () => {
    if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
        state.queryParams.page = state.currentPage;
        updateQueryParams(state.queryParams);
        applyFiltersAndRender();
    }
};

const toggleFavorite = (e) => {
    e.stopPropagation();
    const userId = e.currentTarget.getAttribute('data-id');

    if (state.favorites.has(userId)) {
        state.favorites.delete(userId);
        e.currentTarget.classList.remove('favorited');
    } else {
        state.favorites.add(userId);
        e.currentTarget.classList.add('favorited');
    }

    saveFavorites();
};

const loadFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        state.favorites = new Set(JSON.parse(favorites));
    }
};

const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify([...state.favorites]));
};

const updatePagination = () => {
    pageNumbersContainer.innerHTML = '';

    addPageNumber(1);

    if (state.currentPage > 3) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        pageNumbersContainer.appendChild(ellipsis);
    }

    const startPage = Math.max(2, state.currentPage - 1);
    const endPage = Math.min(state.totalPages - 1, state.currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < state.totalPages) {
            addPageNumber(i);
        }
    }

    if (state.currentPage < state.totalPages - 2) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        pageNumbersContainer.appendChild(ellipsis);
    }

    if (state.totalPages > 1) {
        addPageNumber(state.totalPages);
    }

    prevPage.disabled = state.currentPage === 1;
    nextPage.disabled = state.currentPage === state.totalPages;
};

prevPage.disabled = state.currentPage === 1;
nextPage.disabled = state.currentPage === state.totalPages;

const addPageNumber = (page) => {
    const pageNumber = document.createElement('span');
    pageNumber.className = 'page-number';

    if (page === state.currentPage) {
        pageNumber.classList.add('active');
    }

    pageNumber.textContent = page;
    pageNumber.addEventListener('click', () => {
        state.currentPage = page;
        state.queryParams.page = page;
        updateQueryParams(state.queryParams);
        applyFiltersAndRender();
    });
    pageNumbersContainer.appendChild(pageNumber);
};

const handleScroll = debounce(() => {
    if (state.isFetching || !state.hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollPosition = scrollTop + clientHeight;

    if (scrollPosition >= scrollHeight * 0.8) {
        loadNextPage();
    }
}, 1000);

const loadNextPage = () => {
    state.isFetching = true;
    state.currentPage += 1;
    state.queryParams.page = state.currentPage;
    updateQueryParams(state.queryParams);

    setTimeout(() => {
        renderUsers();
        state.isFetching = false;
    }, 1000);
};

// Показ помилки
const showError = (message) => {
    state.error = message;
    errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorMessage.classList.remove('hidden');

    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
};

document.addEventListener('DOMContentLoaded', initApp);
