import Logo from '../images/logo.png'
import Background from '../images/background.jpg'
import NoTrip from '../images/notrip.png'

console.log(Background)

const navbar = document.querySelector('.navbar')
const body = document.querySelector('body')
const imgLogo = document.createElement('img')
const noTripSection = document.querySelector('.destDetails')
imgLogo.src = Logo
imgLogo.width = 124
imgLogo.style = "padding : 10px"
navbar.prepend(imgLogo)
body.style.backgroundImage = `url(${Background})`
noTripSection.style.backgroundImage = `url(${NoTrip})`

