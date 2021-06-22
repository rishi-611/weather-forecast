const axios = require("axios");

const getPosition = async function (address, callback) {
  let lat, lng, placeName;
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=pk.eyJ1IjoicmlzaGk2MTEiLCJhIjoiY2txNTl5b21xMWdsajJvcXIyMGRuZ3g0MCJ9.LCIaYACiiOZM3Lf0rMdH6g`,
      {
        params: {
          limit: 1,
        },
      }
    );
    if (response.data.features.length === 0) {
      callback(
        "Could not retrieve the location. There might be some issue in the provided address.",
        undefined
      );
    } else {
      [lng, lat] = response.data.features[0].center;
      placeName = response.data.features[0].place_name;
    }
  } catch (err) {
    callback("Could not fetch location due to network issues.", undefined);
  }

  if (lat && lng) {
    callback(undefined, { lat, lng, placeName });
  }
};

module.exports = getPosition;
