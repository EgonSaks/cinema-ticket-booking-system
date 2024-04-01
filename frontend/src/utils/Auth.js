function login(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
}

function logout() {
  localStorage.removeItem('user');
}

function isLoggedIn() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export { isLoggedIn, login, logout };
