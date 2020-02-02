/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const myKey = 'b2715585670e356f6a77d0d47b451a7b';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener on button
let button = document.getElementById('generate');
button.addEventListener('click', sendData);

// Function to call on event listener
function sendData() {
    // Get zipcode and country from inputs
    let zip = document.getElementById('zip').value;
    let country = document.getElementById('country').value;
    // Country code = first two letters of country name
    let countryCode = country.toLowerCase().slice(0, 2);
    let feeling = document.getElementById('feelings').value;
    apiData(baseURL, zip, countryCode, myKey).then(function (data) {
        console.log('Data from API', data);
        postFeeling('/addZip', {
            location: data.name,
            country: data.sys.country,
            feelings: feeling,
            currentTemp: data.main.temp,
            feelsLike: data.main.feels_like,
            weather: data.weather[0].main,
            wind: data.wind
        });

        // wait until posted the data to the server
        updateUI();
    })
}

// Function to get Web API data
const apiData = async (baseURL, zip, countryCode, myKey) => {
    // Open weather url endpoint
    let urlString = baseURL + zip + ',' + countryCode + '&appid=' + myKey;
    const data = await fetch(urlString);
    try {
        const resData = await data.json();
        console.log('Resdata from server- ', resData);
        if(resData.cod === '404') {
            alert(resData.message);
        }
        return resData;
    }
    catch (err) {
        return ('Error', err);
    }
}

// Function to POST data

const postFeeling = async (url = '', data = {}) => {
    const resData = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });

    console.log('Resdata', resData);

    try {
        const newData = await resData.json();
        console.log('Data to be posted - ', newData);
        return newData;
    } catch (err) {
        console.log('Error: ', err);
    }
}

// Function to update UI
const updateUI = async () => {
    const request = await fetch('/getWeather');
    try {
        const projectData = await request.json();
        console.log('Project Data', projectData);
        // date
        let dateElem = document.getElementById('date');
        dateElem.innerHTML = newDate;
        // current temperature
        let tempElem = document.getElementById('temp');
        tempElem.innerHTML = projectData.currentTemp + ' &#8451';
        // location
        let locElem = document.getElementById('location');
        locElem.innerHTML = projectData.location;
        // content
        let weatherElem = document.getElementById('weather');
        weatherElem.innerHTML = projectData.weather;
        let speedElem = document.getElementById('speed');
        speedElem.innerHTML = projectData.wind.speed + 'kmph';
        let dirElem = document.getElementById('direction');
        dirElem.innerHTML = projectData.wind.deg + 'degrees';
        let feelElem = document.getElementById('feeling');
        feelElem.innerHTML = projectData.feelings; 
    }
    catch (err) {
        return ('Error', err);
    }
}



