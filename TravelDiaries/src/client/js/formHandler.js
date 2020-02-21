const spinner = document.querySelector('.spinner')
const tripDetails = {}

function handleSubmit(event) {
    event.preventDefault()
    showSpinner()
    const tripName = document.getElementById('trip-name')
    const tripDest = document.getElementById('trip-dest')
    const startDate = document.getElementById('start-date')
    const endDate = document.getElementById('end-date')
    tripDetails.tripName = tripName.value
    tripDetails.tripDest = tripDest.value
    tripDetails.startDate = startDate.value
    tripDetails.endDate = endDate.value
    fetch('/postTrip', {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripDetails)
    })
        .then(res => res.json())
        .catch(err => console.log(`Fetch failed ${err}`))
        .then(data => { 
            console.log('Expecting weather data ', data)
            showDestInfo(data) 
        })
        .catch(err => console.log(`Error ${err}`))
        .then(res => hideSpinner())

}

function showSpinner() {
    console.log('printed 1st')
    spinner.style.display = 'block'
}

function hideSpinner() {
    console.log('printed last')
    spinner.style.display = 'none'
}

function showDestInfo(data) {
    console.log('Data to update UI ', data)
    const noTripSection = document.querySelector('.no-trip')
    const destDetailsDiv = document.querySelector('.destDetails')
    const destName = document.querySelector('.dest-name')
    const destForecast = document.querySelector('.dest-forecast')
    const heading = document.createElement('h1')
    const subheading = document.createElement('h3')
    heading.innerHTML = tripDetails.tripDest
    subheading.innerHTML = `${data.currently.temperature} F with ${data.currently.summary} and winds at ${data.currently.windSpeed} mph`
    destName.appendChild(heading)
    destForecast.appendChild(subheading)
    noTripSection.style.display = 'none'
    destDetailsDiv.style.backgroundImage = `url('')`
}

export { handleSubmit }