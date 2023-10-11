document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const dollarsInput = document.getElementById('dollars');
    const currencySelect = document.getElementById('currency');
    const resultElement = document.getElementById('result');
  
    convertBtn.addEventListener('click', function() {
      const dollars = parseFloat(dollarsInput.value);
      const selectedCurrency = currencySelect.value;
  
      if (!isNaN(dollars)) {
        const apiKey = 'YOUR_OPEN_EXCHANGE_RATES_API_KEY'; // Replace with your API key
        const apiUrl = `https://open.er-api.com/v6/latest/USD?app_id=${apiKey}`;
  
        // Fetch live exchange rates
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const exchangeRates = data.rates;
  
            if (exchangeRates.hasOwnProperty(selectedCurrency)) {
              const convertedAmount = dollars * exchangeRates[selectedCurrency];
              resultElement.innerText = `${dollars.toFixed(2)} dollars is ${convertedAmount.toFixed(2)} ${selectedCurrency}.`;
            } else {
              resultElement.innerText = 'Currency conversion not supported for the selected currency.';
            }
          })
          .catch(error => {
            console.error('Error fetching exchange rates:', error);
            resultElement.innerText = 'Error fetching exchange rates.';
          });
      } else {
        resultElement.innerText = 'Please enter a valid number.';
      }
    });
  });
  