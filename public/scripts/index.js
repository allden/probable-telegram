let categoryBtn = document.querySelector('.category-btn');
let categoryList = document.querySelector('.category-list');

categoryBtn.addEventListener('mouseover', () => {
    console.log('enter');
    categoryList.style.transform = 'scaleY(1)';
});

categoryBtn.addEventListener('mouseleave', () => {
    console.log('leave');
    categoryList.style.transform = 'scaleY(0)';
});