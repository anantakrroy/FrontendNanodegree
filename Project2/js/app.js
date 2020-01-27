/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let pageSections = document.querySelectorAll('section');
let navbarList = document.querySelector('#navbar__list');
let menuFragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Build the menu item
function buildMenuItem(i) {
    let listItem = document.createElement('li');
    let anchorItem = document.createElement('a');
    let anchorID = pageSections[i].getAttribute('id');
    anchorItem.setAttribute('href', '#' + anchorID);
    anchorItem.setAttribute('class', 'menu__link');
    listItem.textContent = pageSections[i].getAttribute('data-nav');
    anchorItem.appendChild(listItem);
    menuFragment.appendChild(anchorItem);
}

// Build the navbar
function createNavBar() {
    for (let i = 0; i < pageSections.length; i++) {
        buildMenuItem(i);
    }
    navbarList.appendChild(menuFragment);
}

// Remove a previous active section
function removeCurrentActiveSection() {
    for (let i = 0; i < pageSections.length; i++) {
        pageSections[i].removeAttribute('class');
    }
}

// Remove a previous active menu link
function removeCurrentActiveLink() {
    let navbarItems = document.querySelectorAll('a');
    for (let i = 0; i < navbarItems.length; i++) {
        navbarItems[i].setAttribute('class', 'menu__link');
    }
}

// Get ID string
function getElementID(str) {
    return str.slice(1);
}


// Set current section as active
function sectionActive(str) {
    for (let i = 0; i < pageSections.length; i++) {
        if (pageSections[i].getAttribute('id') === str) {
            removeCurrentActiveSection();
            pageSections[i].setAttribute('class', 'active__section');
        }
    }
}

// Set current menu link as active
function activeLink() {
    let navbarItems = document.querySelectorAll('a');
    let activeID = '';
    for (let i = 0; i < pageSections.length; i++) {
        if (pageSections[i].className === "active__section") {
            activeID = '#' + pageSections[i].getAttribute('id');
        }

        if (navbarItems[i].getAttribute('href') === activeID) {
            removeCurrentActiveLink();
            navbarItems[i].setAttribute('class', 'active__link');
        }
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the navbar
createNavBar();

/**
 * End Main Functions
 * Begin Events
 *
*/

// Set sections as active on menu click
let sectionLinks = document.querySelectorAll('a');
for (let i = 0; i < sectionLinks.length; i++) {
    sectionLinks[i].addEventListener('click', function (evt) {
        let idOfLink = getElementID(evt.currentTarget.getAttribute('href'));
        removeCurrentActiveLink();
        sectionActive(idOfLink);
    });
}

// Add class 'active' to section when near top of viewport
for (let i = 0; i < pageSections.length; i++) {
    window.addEventListener('scroll', function () {
        if (pageSections[i].getBoundingClientRect().top <= 300 && pageSections[i].getBoundingClientRect().top >= -380) {
            let idOfSection = pageSections[i].getAttribute('id');
            sectionActive(idOfSection);
            activeLink();
        }
    })
}



