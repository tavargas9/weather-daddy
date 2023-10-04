# Weather Daddy
![badge](https://img.shields.io/badge/MIT-License-blue.svg) ![Awesome](https://awesome.re/badge.svg)

A simple weather dashboard web application for seeing a breif 5-day weather outlook for your city of choice.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Usage

To use this application, go to the deployed website [here](https://tavargas9.github.io/weather-daddy/).

![Screenshot](./assets/icons/Screenshot%202023-10-03%20at%201.53.38%20AM.png)

- The search bar at the top of the screen is used to find weather data by location.
- To search for a city by name, select "City" from the dropdown menu and enter the city name in the search bar.
- To search for a city by zip code, select "Zip" from the dropdown menu and enter a zip code into the search bar. 
- If you would like to see a weather forecast for a random city, hit the "Get random forecast" button on the home screen.
- Every location you search for will be saved to your search history. To view search history from the home screen, hit the "View search history" link. Otherwise, search history will appear at the bottom of the page.
- To return to the homepage, click on the "Weather Daddy" logo at the top left corner of the screen.

## Technologies Used

Tailwind CSS, jQuery, OpenWeather API, Day.js, JavaScript

## Credits

Thanks to [erikflowers](https://github.com/erikflowers) for the [Weather Icons](https://github.com/erikflowers/weather-icons) used in this project.

## License

This is available under the MIT License. See LICENSE in the repo for more information.
