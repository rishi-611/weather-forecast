const fetchForecast = async function (address) {
  const response = await fetch(`/weather?address=${address}`);

  const data = await response.json();
  if (data.Error) {
    return console.log(data.Error);
  }
  console.log(data);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const address = document.querySelector("#address");
  fetchForecast(address.value);
  address.value = "";
};

const form = document.querySelector(".form");

form.addEventListener("submit", handleFormSubmit);
