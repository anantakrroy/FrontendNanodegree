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
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'menu__link');
    for (let i = 0; i < pageSections.length; i++) {
        pageSections[i].getAttribute('data-nav');
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav



// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


