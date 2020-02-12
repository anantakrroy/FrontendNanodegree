// Imports
import { handleSubmit } from './js/formHandler'
import './styles/style.scss'
import TravelDest from './media/travelDest.jpg';

let cityImage = document.getElementById('cityImg');
cityImage.src = TravelDest;

// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

export {
    handleSubmit
}