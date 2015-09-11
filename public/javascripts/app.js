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

    var hotelSelection;
    $("#target1").click(function(){
        // get the value of the selection
        hotelSelection=$('select[name=Hotels]').val();

        // update the value of the selection
        $('#hotelsList').html(hotelSelection);

        // not even sure why this post request is necessary, we've already updated the page with the value, its just not persistent
        $.post("/",{hotelSelection: hotelSelection}, function(data){
          if(data==='done') {
            alert("login success");
          }
        });
    });
    $("#target2").click(function(){
        restaurantSelection=$('select[name=Restaurants]').val();
        $('#restaurantsList').html(restaurantSelection);
    });
    $("#target3").click(function(){
        activitySelection=$('select[name=Activities]').val();
        $('#activitiesList').html(activitySelection);
    });
});
