const currencies = [
    { id: 'USD', name: 'US Dollars' },
    { id: 'GBP', name: 'Great Britain Pound' },
    { id: 'BRL', name: 'Brazilian Real' },
    { id: 'UGX', name: 'Ugandan Shillings' },
    { id: 'AUD', name: 'Australian Dollar' },
    { id: 'CAD', name: 'Canadian Dollar' },
    { id: 'EUR', name: 'Euro' },
    { id: 'KRW', name: 'South Korean Won' },
    { id: 'KES', name: 'Kenyan Shillings' },
    { id: 'CHF', name: 'Swiss Franc' },
    { id: 'GHS', name: 'Ghanian Cedi' },
    { id: 'INR', name: 'Indian Rupee' },
    { id: 'ZAR', name: 'South African Rand' },
    { id: 'ILS', name: 'Israeli Shekel' },
    { id: 'JPY', name: 'Japanese Yen' },
    { id: 'NGN', name: 'Nigerian Naira' },
    { id: 'CNY', name: 'Chinese Yuan' },
    { id: 'RUB', name: 'Russian Ruble' }
  ];
  
  const apiKey = '34eb54abc3fafebe05fbebd0';
  const apiBase = 'https://v6.exchangerate-api.com/v6/';
  
  // Function to generate API URL
  const api = (fromCurrency, toCurrency) => `
    ${apiBase}${apiKey}/pair/${fromCurrency}/${toCurrency}`;
  
  const toast = (msg) => {
    const toastr = document.querySelector('.messages');
    if (!toastr) return;
  
    toastr.textContent = msg;
    if (!toastr.classList.contains('on')) {
      toastr.classList.add('on');
    }
  };
  
  const doneToasting = () => {
    const toastr = document.querySelector('.messages');
    if (!toastr) return;
  
    toastr.textContent = '';
    toastr.classList.remove('on');
  };
  
  const conversionSucceeded = (apiResponse) => {
    if (!apiResponse || !apiResponse.conversion_rate) {
      toast(`Error: Could not fetch exchange rate.`);
      return;
    }
  
    const exchangeRate = apiResponse.conversion_rate;
    const btn = document.querySelector('button');
    btn.removeAttribute('disabled');
  
    const display = document.querySelector('.conversion');
    const formatter = new Intl.NumberFormat(
      'en-NG', { style: 'currency', currency: `${getSelectedCurrency2()}` }
    );
  
    let amount = document.getElementById("Amount").value;
    amount = amount == 0 ? 1 : amount;
    display.textContent = formatter.format(exchangeRate * amount);
    doneToasting();
  };
  
  // Function to create and append options in dropdown
  const createNode = (element) => document.createElement(element);
  const append = (parent, el) => parent.appendChild(el);
  
  const populateCurrencies = () => {
    currencies.forEach(c => {
      let opt = createNode("option");
      opt.setAttribute("value", c.id);
      let text = document.createTextNode(`${c.name}`);
      append(opt, text);
      let sel = document.getElementsByClassName("select-text")[0];
      append(sel, opt);
    });
  };
  
  const populateCurrencies2 = () => {
    currencies.forEach(c => {
      let opt = createNode("option");
      opt.setAttribute("value", c.id);
      let text = document.createTextNode(`${c.name}`);
      append(opt, text);
      let sel = document.getElementsByClassName("select-text")[1];
      append(sel, opt);
    });
  };
  
  const getSelectedCurrency = () => document.getElementsByClassName("select-text")[0].value;
  const getSelectedCurrency2 = () => document.getElementsByClassName("select-text")[1].value;
  
  // Function to convert currency
  const convert = (event) => {
    toast(`Fetching exchange rate...`);
  
    const btn = event ? event.target : document.querySelector('button');
    const fromCurrency = getSelectedCurrency();
    const toCurrency = getSelectedCurrency2();
  
    if (!fromCurrency || !toCurrency) return;
  
    btn.setAttribute('disabled', 'disabled');
  
    const endpoint = api(fromCurrency, toCurrency);
  
    fetch(endpoint)
      .then((resp) => resp.json())
      .then((data) => conversionSucceeded(data))
      .catch((error) => {
        toast(`Error fetching conversion rate.`);
        console.error(error);
      });
  };
  
  const startApp = () => {
    populateCurrencies();
    populateCurrencies2();
  
    let draw = document.getElementsByClassName("btn")[0];
    draw.addEventListener("click", (event) => {
      document.getElementsByClassName("conversion")[0].style.display = "block";
      convert(event);
    });
  };
  
  startApp();
  
