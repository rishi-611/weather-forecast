const axios = require("axios");

const getForecast = async function (coords, callback) {
  let current;
  try {
    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: "8f26e42c1cc112b819ded738fd88e445",
        query: `${coords.lat},${coords.lng}`,
      },
    });

    if (response.data.current) {
      current = response.data.current;
    } else {
      callback(
        "Could not retrieve Weather information for the location",
        undefined
      );
    }
  } catch (err) {
    callback(
      "Could not retrieve Weather information due to network problems",
      undefined
    );
  }

  if (current) {
    callback(undefined, current);
  }
};

module.exports = getForecast;
