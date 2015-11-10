'use strict';

// Initiate global variables
var weatherData,
    longitude,
    latitude;

// Initiate Animations
$(".weather-app").hide();
$(".search-bar").hide();
$(".nav .icon-close").hide();


/*
* Get the Current location or Open the search bar 
*
*/
(function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCurrentPosition, showError);
    } else {

    }
})();
function showCurrentPosition(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    getWeather(longitude,latitude);
}
function showError(error) {
  $("#loadingCircle").hide();
  openSearchBar();
}



/*
* Ajax request for fetching the weather from Forecast.io
*
*/
function getWeather(longitude, latitude, location){
  $.ajax( 
    { url: "https://api.forecast.io/forecast/e550740d61115b913ad25f86b68f73be/" + latitude + "," + longitude + "?units=si",
      type: "GET",
      dataType: 'jsonp'
    } )
    .done(function(data) {

      weatherData = data;

      hero.set("temp", data.currently.temperature);
      hero.set("icon", data.currently.icon);
      hero.set('location', location || "Current location");
      hero.set('summary', data.currently.summary);
      hero.set('summary2', data.daily.summary);

      day1.set('temp', data.daily.data[1].temperatureMax);
      day1.set('icon', data.daily.data[1].icon);
      
      day2.set('temp', data.daily.data[2].temperatureMax);
      day2.set('icon', data.daily.data[2].icon);

      $(".weather-app").show();
      $("#loadingCircle").hide();
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      // console.log( "complete" );
    });
}


/*
* Ajax request to get the location from Google Geocode
*
*/
function getLocation(location){
  $.ajax( 
    { url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyCACgmBbuERO1cuPFn4GfkzsvtPNKPwe10",
      type: "GET",
      dataType: 'json',
      jsonpCallback: 'result'
    } )
    .done(function(data) {

      if(data.status != "ZERO_RESULTS" ){
        var longi = data.results[0].geometry.location.lng;
        var lati = data.results[0].geometry.location.lat;

        getWeather(longi, lati, data.results[0].formatted_address);
      }else{
        $("#loadingCircle").hide();
        $(".error-message").html("Sorry, It seem we can't find the location of your input.");
      }
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {

    });
}



// GET WEEKDAY
var weekday;
(function getWeekdays(){

  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var d = new Date();
  weekday = days[d.getDay()+2];

})();


// Initialise the day objects
var hero = new weatherHero({
  temp: 0,
  icon: "",
  location: "",
  summary: ""
});

var day1 = new app.weather({
  day: "Tomorrow",
  temp: 0,
  icon: "placeholder"
});

var day2 = new app.weather({
  day: weekday,
  temp: 0,
  icon: "placeholder"
});

// CREATES A COLLECTION
var weatherGroup = new app.weatherCollection([
  day1, day2
]);

var weatherGroupView = new app.weatherAllView({ collection: weatherGroup });

// RENDERS THE VIEW
$("#nextDays").html(weatherGroupView.render().el);



// Initialise todays Object
var hero = new weatherHero({
  temp: 0,
  icon: "placeholder",
  location: "Current location",
  summary: "",
  summary2: ""
});

var weatherHeroView = new weatherHeroView({ model: hero });
weatherHero.el;   
$("#hero").html(weatherHeroView.el); 


/*
* Add events and functions for the Search 
*
*/
$("#find").click(initNewLocation);
$(".nav-search").click(toggleSearchBar);
$(".search-bar_input").keyup(function(e){
    if(e.keyCode == 13)
    {
        initNewLocation();
    }
});

function initNewLocation(){
  $(".error-message").html("");
  $(".weather-app").fadeOut();
  $("#loadingCircle").show();
  var value = $(".search-bar_input").val();
  getLocation(value);
}
function toggleSearchBar(){

  $(".search-bar").slideToggle();
  $(".nav .icon-search").toggle();
  $(".nav .icon-close").toggle();
  $(".search-bar_input").focus();
}
function openSearchBar(){

  $(".search-bar").slideDown();
  $(".nav .icon-search").hide();
  $(".nav .icon-close").show();
  $(".search-bar_input").focus();
}

