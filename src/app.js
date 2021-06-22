const path = require("path");
const hbs = require("hbs");
const express = require("express");
const getPosition = require("../src/utils/getPosition");
const getForecast = require("../src/utils/getForecast");

const app = express();

// express config paths
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebar engine and config paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup to be able to serve public files like css, imgs, etc
app.use(express.static(publicDir));

// routing
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    description: "This is a weather forecast web app",
    author: "Rishi Dubey",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    author: "Rishi Dubey",
    message:
      "On this website, you can get the weather forecast of any location, by simply searching for an address, city or country. ",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    author: "Rishi Dubey",
    message:
      "You can contact us to get further information, or clear out any query",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  if (!location) {
    return res.send({
      Error: "Error! You must provide an address as a query string",
    });
  }

  // get forecast for the address
  getPosition(location, function (err, positiondata) {
    if (err) {
      return res.send({
        Error: err,
      });
    }
    getForecast(
      { lat: positiondata.lat, lng: positiondata.lng },
      function (err, data) {
        if (err) {
          return res.send({
            Error: err,
          });
        }

        // if everything goes well
        res.send({
          forecast: `${data.weather_descriptions[0]} in ${positiondata.placeName}. The temperature is ${data.temperature} degree Celsius. There are ${data.humidity}% chances of rain`,
          author: "Rishi Dubey",
          exactLocation: positiondata.placeName,
          address: location,
        });
      }
    );
  });
});

// customizing 404 error pages

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "The requested Help article does not exist",
    author: "Rishi Dubey",
  });
});

app.get("/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Requested URL does not exist",
    Author: "Rishi Dubey",
  });
});

app.listen(3000, () => console.log("Listening to port 3000"));
