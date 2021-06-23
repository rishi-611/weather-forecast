const fetchForecast = async function (address) {
  const forecast = document.querySelector("#forecast");
  const location = document.querySelector("#location");
  const visibility = document.querySelector("#visibility");
  const image = document.querySelector("#weather-icon");

  forecast.textContent = "Loading...";
  location.textContent = "";
  visibility.textContent = "";
  image.style.display = "none";

  const response = await fetch(`/weather?address=${address}`);
  const data = await response.json();
  if (data.Error) {
    forecast.textContent = data.Error;
    return;
  }

  console.log(data);
  location.textContent = data.exactLocation;
  forecast.textContent = data.forecast;
  visibility.textContent = `Visibility is ${data.visibility} metres`;
  image.src = data.image;
  image.style.display = "unset";
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  document.querySelector("#submit-btn").blur();
  const address = document.querySelector("#address");
  fetchForecast(address.value);
  address.value = "";
};

const form = document.querySelector(".form");

form.addEventListener("submit", handleFormSubmit);
