# Travel App Project
Create a basic travel planner application which fetches the weather and an image of the location by allowing users to choose the location and trip dates 

## Overview
An asynchronous web app that uses Web API and user data to dynamically update the UI.

## Application design
* A form to enter the location with the dates of travel (Start date - End date). 
* If the trip is within a week, current weather forecast is displayed. 
* If the trip is beyond a week, a predicted forecast is shown.

The application is made possible by using APIs - [Pixabay](https://pixabay.com/) , [DarkSky API](https://darksky.net/dev/docs).

## Running the App
* `git clone https://github.com/anantakrroy/FrontendNanodegree.git`
* cd into TravelApp_Capstone
* Run `npm install` to install dependencies from the package.json file.
* Create a .env file in the root of the project directory.
* Sign up on [DarkSky](https://darksky.net/dev) and [Pixabay](https://pixabay.com/accounts/register/?source=signup_button_header) to receive your API keys.
* Add the API keys in the .env file using variable names DARK_SKY_API_KEY and PIXABAY_API_KEY for Dark Sky and Pixabay API keys respectively.
* Build the project using `npm run build-prod`
* Run the project by `npm start`
* The project runs on the 8080 port. Open the project on http://localhost:8080/


## Extend the project
Two additional implementations have been made beyond the minimum requirements
* Add end date and display length of trip.
* Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities). The best image of the entered city shows up fetched from Pixabay.
