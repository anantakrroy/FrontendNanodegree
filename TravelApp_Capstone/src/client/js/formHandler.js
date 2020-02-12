function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('place').value;
    let departureDate = document.getElementById('date').value;
    let theFinalTripDate = document.getElementById('endDate').value;

    if ((formText === "") | (departureDate === "")) {
      alert("Fill the Location or Date appropriately");
    } else {
      console.log("::: Form has been Submitted :::");

      const loaderIcon = document.getElementById("loader");
      loaderIcon.style.display = 'block';

      let baseURL = 'http://api.geonames.org/searchJSON?style=full&maxRows=12&name_startsWith=';
      let location = formText;
      let theDepartureDate = departureDate;
      const username = '&username=Samseen';

      let reqBody = {
          theText: formText
      };

      const getCoordinates = async (baseURL, location, username)=>{
          const res = await fetch(baseURL+location+username)

          try {
        
            const data = await res.json();
            
            let coord = {
                lat: data.geonames[0].lat,
                long: data.geonames[0].lng
            }
            return coord;
          }  catch(error) {
            console.log("error", error);
            // appropriately handle the error
          }
      }
      let weatherBaseUrl = 'https://api.darksky.net/forecast/';
      let apiKey = '398fd99b16ca038166479bfede77a859';

      getCoordinates(baseURL, location, username)
      .then(function(data) {
          console.log("Will be calling DarkSky API with: " + data.lat + " and " + data.long);
          const latitude = data.lat;
          const longitude = data.long;
          
          const reqBody = {
              lat: latitude,
              lng: longitude,
              location: formText,
              date: departureDate,
              endDate: theFinalTripDate
          }

          // Call the server to get the weather data

          const theReturnedWeatherData = postData('http://localhost:8080/getWeather', reqBody);
      }).then(function(mainResponse){
        loaderIcon.style.display = '';
      });

      /* Function to POST data */
      const postData = async(url = '', data = {})=>{
        //console.log(data);
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        try {
          const newData = await response.json();
          //console.log("Printing Post Data");

          console.log(newData);
          console.log("Summary: " + newData[newData.length-1].theSummary);
          console.log("Low: " + newData[newData.length-1].theLow);
          console.log("High: " + newData[newData.length-1].theHigh);
          console.log("Image Url: " + newData[newData.length-1].theImage);

          //Manipulate the UI
          let cityImage = document.getElementById('cityImg');
          cityImage.src = newData[newData.length-1].theImage;

          let high = document.getElementById('high');
          high.textContent = newData[newData.length-1].theHigh;

          let low = document.getElementById('low');
          low.textContent = newData[newData.length-1].theLow;

          let summary = document.getElementById('summary');
          summary.textContent = newData[newData.length-1].theSummary;

          let theDepartingDate = document.getElementById('departingDate');
          theDepartingDate.textContent = departureDate;

          let theLocation = document.getElementById('departingLocation');
          theLocation.textContent = formText;

          let theMainLocation = document.getElementById('mainLocation');
          theMainLocation.textContent = formText;

          let theTimeSpan = document.getElementById('timeSpan');
          theTimeSpan.textContent = newData[newData.length-1].tripDays;

          let tripLengthDuration = document.getElementById('tripLength');
          tripLengthDuration.textContent = newData[newData.length-1].mainTripDifference + " Days";

          //console.log("Trip Difference: " + newData[newData.length-1].mainTripDifference);
          //document.getElementById(tripLength).style.display = 'none';

          return newData;

        } catch(error) {
          console.log("error", error);
          // handle error
        }
      }
    }
  }
    //Client.checkForName(formText)

    

export { handleSubmit }
