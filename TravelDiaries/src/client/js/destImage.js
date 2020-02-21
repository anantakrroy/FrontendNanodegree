import Loading from '../images/loading.gif'

const imageDiv = document.querySelector('.destImage')
const imageDefault = document.createElement('img')
const imageDest = document.createElement('img')

imageDefault.src = Loading
imageDefault.alt = 'Default images'
imageDefault.className = 'default-img'
imageDefault.width = 270
imageDefault.height = 270

imageDest.src = 'https://picsum.photos/id/1016/270/270'
imageDest.alt = 'Destination images'
imageDest.className = 'dest-img'

imageDiv.appendChild(imageDefault)

imageDest.addEventListener('load', (event) => {
    imageDefault.style.display = 'none'
    imageDiv.appendChild(imageDest)
})
