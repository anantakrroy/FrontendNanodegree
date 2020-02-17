import Logo from '../images/logo.png'
import Background from '../images/background.jpg'

console.log(Background)

const navbar = document.querySelector('.navbar')
const body = document.querySelector('body')
const imgLogo = document.createElement('img')
imgLogo.src = Logo
imgLogo.width = 124
imgLogo.style = "padding : 10px"
navbar.prepend(imgLogo)
body.style.backgroundImage = `url(${Background})`
//  navbar.style.backgroundImage = `url(${Background})`

