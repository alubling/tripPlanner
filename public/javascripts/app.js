function initialize_gmaps() {
  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
  // set the map options hash
  var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map");
  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);
  // Add the marker to the map
  var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
  });
  // Add the marker to the map by calling setMap()
  marker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();
    $( "#draggable" ).draggable();
    $( "#draggable2" ).draggable();

    // ajax call for the maps api
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/all"
    }).done(function(data) {
      console.log(data);
    });

    // supposed to create a tabbed view but not working
    // $('#myTabs div').click(function (e) {
    //   e.preventDefault()
    //   $(this).tab('show')
    // });
    // $('#myTabs div[data-toggle="tab"]').tab('show') // Select tab by name

    var hotelSelection, restaurantSelection, activitySelection;
    var hotelLocation = [], restaurantLocation = [], activityLocation = [];
    var hotelArray = [], restaurantArray = [], activityArray = [];
    $("#target1").click(function(){
        // get the value of the selection
        hotelSelection=$('select[name=Hotels]').val();
        // update the value of the selection
        $('#hotelsList').html(hotelSelection);
        // get the hotels location
        hotelLocation = JSON.parse($('#Hotels option:selected').attr('place'))[0]["location"];
        hotelLocation.push(hotelSelection);
        hotelLocation.push("hotel");
        hotelArray.push(hotelLocation);

        // not even sure why this ajax post request is necessary, we've already updated the page with the value, its just not persistent
        // $.post("/",{hotelSelection: hotelSelection}, function(data){
        //   if(data==='done') {
        //     alert("login success");
        //   }
        // });
    });
    $("#target2").click(function(){
        restaurantSelection = $('select[name=Restaurants]').val();
        restaurantLocation = JSON.parse($('#Restaurants option:selected').attr('place'))[0]["location"];
        restaurantLocation.push(restaurantSelection);
        restaurantLocation.push("restaurant");
        restaurantArray.push(restaurantLocation);
        $('#restaurantsList').html(restaurantSelection);
    });
    $("#target3").click(function(){
        activitySelection=$('select[name=Activities]').val();
        activityLocation = JSON.parse($('#Activities option:selected').attr('place'))[0]["location"];
        activityLocation.push(activitySelection);
        activityLocation.push("activity");
        activityArray.push(activityLocation);
        $('#activitiesList').html(activitySelection);
    });
});
