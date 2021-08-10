const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  //   res.send("Server is up!");
});

app.post("/", function (req, res) {
  //   console.log(req.body.cityName);
  //   console.log("Post request received.");
  const query = req.body.cityName;
  const apiKey = "51fefd94e1b02b4095f801c708dfea23";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //   console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      //   console.log(weatherDescription);

      const iconId = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
      //   console.log(iconURL);

      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celsius.</h1>"
      );
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
