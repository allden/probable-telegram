let name = document.getElementById('name');
let description = document.getElementById('description');
let price = document.getElementById('price');
let stock = document.getElementById('stock');

name.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?’'":&\(\)]+$/.test(name.value.trim()) === false ? name.setCustomValidity('Invalid value.') : name.setCustomValidity('');
description.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?’'":&\(\)]+$/.test(description.value.trim()) === false ? description.setCustomValidity('Invalid value.') : description.setCustomValidity('');
price.value.trim() === '' || /^[0-9\.]+$/.test(price.value.trim()) === false ? price.setCustomValidity('Invalid value.') : price.setCustomValidity('');
stock.value.trim() === '' || isNaN(stock.value.trim()) === true ? stock.setCustomValidity('Invalid value.') : stock.setCustomValidity('');

name.addEventListener('change', (e) => {
    e.target.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?'"&\(\)]+$/.test(e.target.value.trim()) === false ? e.target.setCustomValidity('Invalid value.') : e.target.setCustomValidity('');
});
description.addEventListener('change', (e) => {
    e.target.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?'"&\(\)]+$/.test(e.target.value.trim()) === false ? e.target.setCustomValidity('Invalid value.') : e.target.setCustomValidity('');
});
price.addEventListener('change', (e) => {
    e.target.value.trim() === '' || /^[0-9\.]+$/.test(e.target.value.trim()) === false ? e.target.setCustomValidity('Invalid value.') : e.target.setCustomValidity('');
});
stock.addEventListener('change', (e) => {
    e.target.value.trim() === '' || isNaN(e.target.value.trim()) === true ? e.target.setCustomValidity('Invalid value.') : e.target.setCustomValidity('');
});