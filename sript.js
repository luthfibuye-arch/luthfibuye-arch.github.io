// toggle class active untuk menu
const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#humburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};

// toggle class active untuk search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-btn').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// toggle class shoping cart
const shopingCart = document.querySelector('.shoping-cart');

document.querySelector('#shoping-cart').onclick = (e) => {
    shopingCart.classList.toggle('active');
    e.preventDefault();
};

// click diluar
const hm = document.querySelector('#humburger-menu');
const sb = document.querySelector('#search-btn');
const sc = document.querySelector('#shoping-cart');

document.addEventListener('click', function (e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }

    if (!sc.contains(e.target) && !shopingCart.contains(e.target)) {
        shopingCart.classList.remove('active');
    }
});

// modal box
// const itemDetailModal = document.querySelector('#item-detail-modal');
// const itemDetailButton = document.querySelector('#btn-detail-item');

// itemDetailButton.onclick = (e) => {
//     itemDetailModal.style.display = 'flex' ;
//     e.preventDefault()
// }

// // klik tombol close
// document.querySelector('.modal #close-icon').onclick = (e) => {
//     itemDetailModal.style.display = 'none' ;
//     e.preventDefault()
// }


// // klik diluar modal
// const modal = document.querySelector('#item-detail-modal');
// window.onclick = (e) => {
//     if (e.target === modal) {
//         modal.style.display = 'none';
//     }

// }