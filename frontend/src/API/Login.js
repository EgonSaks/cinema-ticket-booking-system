async function Login(BASE_URL, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const userData = await response.json();

    const expiryTime = new Date();
    expiryTime.setTime(expiryTime.getTime() + 5 * 60 * 1000);

    document.cookie = `userName=${
      userData.userName
    }; expires=${expiryTime.toUTCString()}; path=/; SameSite=None; Secure`;

    return userData;
  } catch (error) {
    console.error(error);
  }
}

export default Login;
