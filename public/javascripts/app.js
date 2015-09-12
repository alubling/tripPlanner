var markers = [];
var _bounds = new google.maps.LatLngBounds();


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

  // // Add the marker to the map
  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     title:"Hello World!"
  // });
  // // Add the marker to the map by calling setMap()
  // marker.setMap(map);

  return map;
}

function setMarkers(map, locations) {

//  if (!locations) {
//    var myLatlng = [40.705189,-74.009209];
//    locations.push(myLatlng);
//  }

   var _bounds = new google.maps.LatLngBounds();

   var shape = {
       coords: [1, 1, 1, 20, 18, 20, 18, 1],
       type: 'poly'
   };

   for (var i = 0; i < locations.length; i++) {
       var loc = locations[i];

         var marker = new google.maps.Marker({
             position: {lat: loc[0], lng: loc[1]},
             map: map,
            //  icon: image[loc[0]],
            //  shape: shape,
             title: loc[2],
             zIndex: 3
         });

         markers.push(marker);



       _bounds.extend(marker.getPosition());
   }
   map.fitBounds(_bounds);

}

function updateMarkers(map, location) {

 var shape = {
     coords: [1, 1, 1, 20, 18, 20, 18, 1],
     type: 'poly'
 };

       var marker = new google.maps.Marker({
           position: {lat: location[0], lng: location[1]},
           map: map,
          //  icon: image[location[0]],
          //  shape: shape,
           title: location[2],
           zIndex: 3
       });

       markers.push(marker);

 _bounds.extend(marker.getPosition());

 map.fitBounds(_bounds);

}

$(document).ready(function() {
    var map = initialize_gmaps();
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
    var locations = [];

    $("#target1").click(function(){
        // get the value of the selection
        hotelSelection=$('select[name=Hotels]').val();
        // update the value of the selection
        $('#hotelsList').html(hotelSelection);
        // get the hotels location
        hotelLocation = JSON.parse($('#Hotels option:selected').attr('place'))[0]["location"];
        hotelLocation.push(hotelSelection);
        hotelLocation.push("hotel");
        locations.push(hotelLocation);

        // set the marker for the hotel
        setMarkers(map, locations);

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
        locations.push(restaurantLocation);

        var listItem = $("<li />");
        listItem.html(restaurantSelection);
        $('#restaurantsList').append(listItem);
        // $('#restaurantsList').html(restaurantSelection);

        setMarkers(map, locations);

    });
    $("#target3").click(function(){
        activitySelection=$('select[name=Activities]').val();
        activityLocation = JSON.parse($('#Activities option:selected').attr('place'))[0]["location"];
        activityLocation.push(activitySelection);
        activityLocation.push("activity");
        locations.push(activityLocation);

        var listItem2 = $("<li />");
        listItem2.addClass("row");
        var genericDeleteButton = '<div class="col-lg-1">'+
            '<a href="#" class="anchor" name="removeItem">'+
              '<span name="removeItem" class="glyphicon glyphicon-remove-circle"></span>'+
            '</a>'+
          '</div>';
        var deleteButton = $(genericDeleteButton);
        deleteButton.attr('data-name', activitySelection);
        activitySelection = '<div class="col-lg-11">'+ activitySelection+'</div>'
        listItem2.append($(activitySelection));
        listItem2.append(deleteButton);
        $('#activitiesList').append(listItem2);
        updateMarkers(map, activityLocation);
    });

    // removing items from the itinerary
    $("body").on('click', 'span[name="removeItem"]', function(event) {
      // var name = $(event.target).parent().parent().siblings().html();
      var name = $(event.target).parent().parent().attr('data-name');
      console.log(name);
      $(event.target).parent().parent().parent().remove();
      for(var i=0; i< locations.length; i++){
        if(locations[i][2] === name){
          locations.splice(i,1);
        }
      }
      console.log(markers);
      for(var i=0; i<markers.length; i++){
        if(markers[i].title === name){
          markers[i].setMap(null);
          markers.splice(i,1);
        }
      }
      console.log(markers);
      // setMarkers(map, locations);
    });


});
