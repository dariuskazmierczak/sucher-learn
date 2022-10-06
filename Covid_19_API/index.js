let covidData;

(function () {
  //INVOKING ELEMNTS FUNCTION's
  setElFunctions();

  // FETCH FROM API WHEN THE PAGE LOADS
  getLatestCovidData();
})();

// SET FUNCTION FOR EACH ELEMENT
function setElFunctions() {
  document.getElementById("countries").onchange = function () {
    const selectedValue = document.getElementById("countries").value;
    const countryData = covid19data.filter(
      (c) => c.country == selectedValue
    )[0];

    //DISPLAY DATA
    const newConfirmed = document.getElementById("newConfirmed");
    const totalConfirmed = document.getElementById("totalConfirmed");
    const newDeaths = document.getElementById("newDeaths");
    const totalDeaths = document.getElementById("totalDeaths");
    const lastUpdated = document.getElementById("lastUpdate");

    // conditional statements
    countryData.cases.new
      ? (newConfirmed.innerHTML =
          "New confirmed cases: " + countryData.cases.new)
      : (newConfirmed.innerHTML = "New confirmed cases: 0");
    countryData.cases.total
      ? (totalConfirmed.innerHTML =
          "Total confirmed cases: " + countryData.cases.total)
      : (totalConfirmed.innerHTML = "Total confirmed cases: 0");
    countryData.deaths.new
      ? (newDeaths.innerHTML = "New deaths: " + countryData.deaths.new)
      : (newDeaths.innerHTML = "New deaths: 0");
    countryData.deaths.total
      ? (totalDeaths.innerHTML = "Total deaths: " + countryData.deaths.total)
      : (totalDeaths.innerHTML = "Total deaths: 0");
    lastUpdated.innerHTML = "Last updated: " + countryData.day;
  };
}

//FETCH DATA
async function getLatestCovidData() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "MY_API_KEY",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  await fetch("https://covid-193.p.rapidapi.com/statistics", options)
    .then((response) => response.json())
    .then((response) => {
      // console.log("COVID 19 API object:");
      // console.log(response);
      // console.log("\n");

      // ADD ALL COUNTRIES TO ELEMENT
      response.response.forEach((c) => {
        const option = document.createElement("option");
        option.innerHTML = c.country;
        document.getElementById("countries").appendChild(option);
      });

      // SAVE DATA TO VARIABLE
      covidData = response.response;
    })

    .catch((err) => console.error(err));
}
