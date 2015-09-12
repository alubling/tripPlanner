// $(document).ready(function () {

  var Day = function() {
    this.hotels = [];
    this.restaurants = [];
    this.activities = [];
  }

  var days = [];

  //button to add days
  function addDay() {
      var newDay = new Day();
      days.push(newDay);
      var currentPage = days.length;
      $('#days .active').removeClass();
      var listItem = '<li class="active"><a href="#">'+currentPage+'</a></li>';
      $('#days').append(listItem);
  }

// });
