# weather-app

A Weather App created with React.js, Context API and OpenWeatherMap API

## How?

Created with Webpack and tools, as **create-react-app** doesn't provide me the control (it simply abtracts) i need.

## Demo

Check out <a href="https://abhuz-weather-app.netlify.app/" target="_blank">Weather App</a>!

## Features

- Displays Weather Report of current Location (User consent is required).
- By default displays Weather Report for top 15 cities by **population** sorted in **Alphabetical Order**
- Add/Remove Favorites
- Remove Default Cities
- Add/Edit/Delete notes for any cities
- Search Cities
- PWA

## Behaviour

- Search will be disabled when the application is offline.
- Owing to size restriction in LocalStorage notes with atmost 140 characters are allowed
- Search doesn't seems to autocomplete well since OpenWeatherMap API is not much reliable with the queries.

## Screenshots

![Intro](https://raw.githubusercontent.com/mum-never-proud/weather-app/main/demo/intro.gif)


![Comments](https://raw.githubusercontent.com/mum-never-proud/weather-app/main/demo/comments.gif)

![Lighthouse report](https://raw.githubusercontent.com/mum-never-proud/weather-app/main/demo/lighthouse.png)

## Improvements

- Rather then using LocalStorage API which is synchronous (blocking) we can move to IndexedDB which is asynchronouse (non-blocking) has a pretty descent browser support.
- LocalStorage has a limit of 10 mb, whereas IndexedDB provides is more flexibile.
- Improve best practices.
- Add more Tests.

## Tools Preference

if i would have been given ownership of this App i would have gone with

- Preact (much smaller footprint) than react
- Since its about realtime, i would used Node.js with MongoDB and pusher to live update the clients, if we were to display notes to other users



