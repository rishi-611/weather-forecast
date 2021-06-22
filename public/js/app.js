

const fetchForecast = async function (address) {
  const forecast  = document.querySelector("#forecast");
  const location = document.querySelector("#location");
  

  forecast.textContent = "Loading...";
  location.textContent = "";
  const response = await fetch(`/weather?address=${address}`);

  const data = await response.json();
  if (data.Error) {
    forecast.textContent = data.Error;
    return;
  }
  location.textContent = data.exactLocation;
  forecast.textContent = data.forecast;
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
