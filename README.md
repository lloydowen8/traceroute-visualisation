# Traceroute Visualisation

---

### An simple application to show the path a traceroute takes to its destination

</div>

## About
This tool uses the ipstack API to get coordinates for IP addresses along a traceroute. An account is needed to access the API, this can be set up here https://ipstack.com/. You get 10,000 free calls to the API per month.

## Screenshot
<!--<img src= "Screenshot.png">-->
<img src= "Screenshot5.png">

## Technologies
##### - Typescript 
##### - Cesium
##### - ipstack 

(All open source)

## Running Instructions
First you need to set the ```apiKey``` field in the index.js file to your personal API key.

To run, make sure you have node(npm) > 6.0.0 (https://nodejs.org/en/), the most recent one will work well, then open a terminal at the directory and run
```
npm install

npm run start
```
That installs all the required packages and starts a server on [localhost:8080](localhost:8080).  Due to using webpack, this also has hot-reloading.

To build the project, run:
```
npm run build
```
This produces a build which must be served by a server (which serves index.html).