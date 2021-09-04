const flag = document.getElementById("flags");
const countryName = document.getElementById("county");
const confirmend = document.getElementById("confirmend");
const deaths = document.getElementById("deaths");
const recovered = document.getElementById("recovered");
const active = document.getElementById("active");
const input = document.getElementById("input-text");
const searchBtn = document.getElementById("search-button");

// events
searchBtn.addEventListener("click", searchCountry);

//function
function searchCountry(e) {
  e.preventDefault();
  const nameOfCountry = input.value;
  showResult(nameOfCountry);
}

function randomCountryData() {
  // random number
  const random = Math.floor(Math.random() * 251);

  // random Country
  const api = `https://restcountries.eu/rest/v2/all
`;
  fetch(api)
    .then(function (data) {
      return data.json();
    })
    .then(getCountry);

  function getCountry(dataCountry) {
    showResult(dataCountry[random].name);
  }
}

randomCountryData();

//quruvchi funksiya
function showResult(nameCountry) {
  // api
  const api = `https://api.covid19api.com/live/country/${nameCountry}/status/confirmed`;
  fetch(api)
    .then(function (data) {
      return data.json();
    })
    .then(getResult);

  function getResult(dataJson) {
    const allInfo = dataJson[dataJson.length - 1];
    // flags
    flag.src = `https://www.countryflags.io/${allInfo.CountryCode}/flat/64.png`;

    // country name
    countryName.textContent = allInfo.Country;

    //confirmend
    confirmend.textContent = allInfo.Confirmed;

    // deaths
    deaths.textContent = allInfo.Deaths;

    //recovered
    recovered.textContent = allInfo.Recovered;

    // active
    active.textContent = allInfo.Active;
  }
}
