let name = document.getElementById('name');
let description = document.getElementById('description');

name.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?’'":&\(\)]+$/.test(name.value.trim()) === false ? name.setCustomValidity('Invalid value.') : name.setCustomValidity('');
description.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?’'":&\(\)]+$/.test(description.value.trim()) === false ? description.setCustomValidity('Invalid value.') : description.setCustomValidity('');

name.addEventListener('change', (e) => {
    e.target.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?'"&\(\)]+$/.test(e.target.value.trim()) === false ? e.target.setCustomValidity('Invalid value.') : e.target.setCustomValidity('');
});
description.addEventListener('change', (e) => {
    e.target.value.trim() === '' || /^[A-Za-z0-9\s\-!.,?'"&\(\)]+$/.test(e.target.value.trim()) === false ? e.target.setCustomValidity('Invalid value.') : e.target.setCustomValidity('');
});