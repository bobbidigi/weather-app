// Please make sure this is run over HTTP and not HTTPS

$(document).ready(function(){
  
  $.getJSON("http://freegeoip.net/json/", function(ipGeo){
    var city = ipGeo.city
    //var country = ipGeo.country_name
    var api="http://api.openweathermap.org/data/2.5/weather?";
    var lat = "lat=" + ipGeo.latitude;
    var long = "&lon=" + ipGeo.longitude;
    var appid = "&APPID=894f152b37bf9b22da6f4ccbbf502844"
    var units = "&units=metric"

    var url = api + lat + long + appid + units   

    $.getJSON(url, function(data){
      if(data){
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var clouds = data.clouds.all;
        var celsius = data.main.temp;
        var fahrenheit = Math.round((celsius*1.8+32)*10)/10;
      }
      
      $("#city").html(city);
      //$("#country").html(country);
      $("#temp").html(celsius+"°C");
      $("#humidity").html("Humidity: "+humidity+"%");
      $("#windSpeed").html("Wind Speed: "+windSpeed+"m/s");
      $("#clouds").html("Clouds: " + clouds+"%");
      
      var tempChange = true;
      $("#temp").click(function(){
        if(tempChange === true){
          $("#temp").html(fahrenheit+"℉");
          tempChange = false;   
        } else{
          $("#temp").html(celsius+"°C")
          tempChange = true;
        }
      });
      
      if(celsius > 20 && clouds > 50){
        $("body").css("background-image", "url(http://retouchthesky.com/wp-content/uploads/2014/08/IMG_4952.jpg)")   
      } else if (celsius > 20 && clouds < 50){
        $("body").css("background-image", "url(https://balancebox.files.wordpress.com/2012/04/dsc_0494-edit.jpg)")   
      } else if (celsius < 20 && clouds > 50){
        $("body").css("background-image", "url(https://asianspring.files.wordpress.com/2013/05/img_2402.jpg)")   
      } else {
        $("body").css("background-image", "url(http://way-up-north.com/wp-content/uploads/2016/04/ice-edge-and-blue-sky.jpg)")  
      }
      
      
    });
  });    
});

// VANILLA JAVASCRIPT METHOD
// console.clear();

// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://api.forismatic.com/api/1.0/?method=getQuote&format=xml&xml=callback&lang=en");
// xhr.onload = function (){
//   console.log(xhr.responseText);
// }

// xhr.send();





