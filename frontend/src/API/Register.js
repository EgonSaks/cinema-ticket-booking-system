async function Register(BASE_URL, formData) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Registration successful');
      return true;
    } else {
      console.error('Registration failed');
      return false;
    }
  } catch (error) {
    console.error('Error occurred while registering:', error);
    return false;
  }
}

export default Register;
