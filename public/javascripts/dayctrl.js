function Dayctrl() {
  this.days = [];
  this.currentDay = {};
  this.currentDayNumber = 0;
}

Dayctrl.prototype = {
  add: function() {
    var newDay = new Day();
    this.days.push(newDay);
    this.currentDay = newDay;
    this.currentDayNumber = this.days.length;

    var newButton = $('<li data-id='+this.currentDayNumber+'><a href="">'+this.currentDayNumber+'</a></li>');
    newButton.click((function() {
      console.log(this.currentDayNumber);
      // need a render function here for the hotels/restaurants/activities
    }).bind(this));
    $("#add-day-button").before(newButton);
  },
}
