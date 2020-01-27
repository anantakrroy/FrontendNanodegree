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

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavBar() {
    let menuFragment = document.createDocumentFragment();
    for (let i = 0; i < pageSections.length; i++) {
        let listItem = document.createElement('li');
        let anchorItem = document.createElement('a');
        let anchorID = pageSections[i].getAttribute('id');
        anchorItem.setAttribute('href', '#' + anchorID);
        anchorItem.setAttribute('class', 'menu__link');
        listItem.textContent = pageSections[i].getAttribute('data-nav');
        anchorItem.appendChild(listItem)
        menuFragment.appendChild(anchorItem);
    }
    navbarList.appendChild(menuFragment);
}

function removeCurrentActiveSection() {
    for (let i = 0; i < pageSections.length; i++) {
        pageSections[i].removeAttribute('class');
    }
}

function removeCurrentActiveLink() {
    let navbarItems = document.querySelectorAll('a');
    for (let i = 0; i < navbarItems.length; i++) {
        navbarItems[i].setAttribute('class', 'menu__link');
    }
}

function getElementID(str) {
    return str.slice(1);
}

function sectionActive(str) {
    for (let i = 0; i < pageSections.length; i++) {
        if (pageSections[i].getAttribute('id') === str) {
            removeCurrentActiveSection();
            pageSections[i].setAttribute('class', 'active__section');
        }
    }
}

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

// build the nav
createNavBar();


// Add class 'active' to section when near top of viewport



// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu


// Scroll to section on link click

// Set sections as active on menu click
let sectionLinks = document.querySelectorAll('a');
for (let i = 0; i < sectionLinks.length; i++) {
    sectionLinks[i].addEventListener('click', function (evt) {
        let idOfLink = getElementID(evt.currentTarget.getAttribute('href'));
        sectionActive(idOfLink);
    });
}

// Set sections as active when scroll to view
for (let i = 0; i < pageSections.length; i++) {
    window.addEventListener('scroll', function () {
        if (pageSections[i].getBoundingClientRect().top <= 300 && pageSections[i].getBoundingClientRect().top >= -380) {
            let idOfSection = pageSections[i].getAttribute('id');
            sectionActive(idOfSection);
            activeLink();
        }
    })
}



