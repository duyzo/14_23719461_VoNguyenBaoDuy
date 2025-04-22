// Admin credentials
const ADMIN = {
    email: 'Admin@gmail.com',
    password: 'Admin123',
    name: 'Administrator',
    phone: '0123456789'
};

// Initialize storage with admin account
function initStorage() {
    const users = localStorage.getItem('users');
    if (!users) {
        // Create initial users array with admin
        const initialUsers = [{
            email: ADMIN.email,
            password: ADMIN.password,
            name: ADMIN.name,
            phone: ADMIN.phone
        }];
        localStorage.setItem('users', JSON.stringify(initialUsers));
    }
}

// Get users from storage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to storage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Register new user
export function registerUser(userData) {
    // Make sure storage is initialized
    initStorage();
    
    const users = getUsers();
    
    // Check if email exists
    if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('Email đã được đăng ký');
    }
    
    // Add new user
    const newUser = {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        phone: userData.phone
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto login
    setLoggedInUser(newUser);
    return true;
}

// Set logged in user
function setLoggedInUser(user) {
    localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        name: user.name,
        phone: user.phone
    }));
}

// Login user
export function loginUser(email, password) {
    console.log('Attempting login:', email); // Debug log
    
    // Check admin first
    if (email.toLowerCase() === ADMIN.email.toLowerCase() && password === ADMIN.password) {
        setLoggedInUser(ADMIN);
        return true;
    }
    
    // Check regular users
    const users = getUsers();
    const user = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password
    );
    
    if (user) {
        setLoggedInUser(user);
        return true;
    }
    
    return false;
}

// Get current user
export function getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

// Check if user is logged in
export function isLoggedIn() {
    return !!getCurrentUser();
}

// Logout user
export function logoutUser() {
    localStorage.removeItem('currentUser');
}

// Initialize on load
initStorage();