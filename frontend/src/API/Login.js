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
    console.log('User data from login', userData);
  } catch (error) {
    console.error(error);
  }
}

export default Login;
