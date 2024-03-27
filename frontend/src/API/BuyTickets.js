async function BuyTickets(BASE_URL, formData) {
  try {
    const response = await fetch(`${BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Order successful');
      return true;
    } else {
      console.error('Order failed');
      return false;
    }
  } catch (error) {
    console.error('Error occurred while ordering:', error);
    return false;
  }
}

export default BuyTickets;
