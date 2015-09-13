// $(document).ready(function () {
  var currentDay;
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
      currentDay = newDay;
      var currentPage = days.length;
      $('#days .active').removeClass();
      var listItem = '<li class="active" onclick="switchDay('+currentPage+')"><a href="#">'+currentPage+'</a></li>';
      $('#days').append(listItem);
  }

// });
