function Trip(){
    this.days = [];
    this.initMap();
    this.markers = [];
    this.currentDay = {};
    this.currentIndex = 0;
    this.init();
}

Trip.prototype = {
    init: function(){
        var that = this;
        if(that.days.length === 0){
            that.addDay();
        }
        ['Hotel', 'Restaurant', 'Activity'].forEach(function(label){
            $('#add'+label+'Btn').on('click',function(){
                var id = JSON.parse($('#'+label+'Selection').val());
                that.currentDay.addItemByLabelAndId(label, id).done(function(item){
                    //////////////////Here needs code to validate////////////////////
                    /////////////////prevent from duplicate adding///////////////////

                    that.currentDay[label].push(item);
                    that.showInPanel();


                });
            });
        }, this);

        $("#day-picker").on('click', '#addDayBtn', function(){
            that.addDay();
        });
        $("#day-picker").on('click', '#removeDayBtn', function(){
            that.removeDay();
        });
    },
    initMap : function(){
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.705189, lng: -74.009209 },
            zoom: 13
        });
    },
    addDay: function(){
        //add to model
        var day = new Day();
        this.days.push(day);

        //render on webpage
        this.renderDay(this.days.length);

        //render on map
    },
    renderDay: function(dayIndex){
        this.currentDay = this.days[dayIndex-1];
        this.currentIndex = dayIndex;
        this.showDayPicker();
        this.showInPanel();
        console.log(this.currentDay, this.currentIndex);
    },
    showInPanel: function(){
        var that = this;

        ['Hotel', 'Restaurant', 'Activity'].forEach(function(label){
            var itemList = this.currentDay[label];
            var $container = $('#'+label+'List').html('');

            itemList.forEach(function(item){

                var $item = $('<li />');
                $item.attr('_id', item._id);
                $item.append(item.name);
                $delBtn = $('<i class="fa fa-times-circle pull-right"></i>');
                $delBtn.click(function(){
                    that.currentDay.removeItemByLabelAndId(label, item._id);
                    console.log(that.currentDay);
                    that.showInPanel();
                })
                $item.append($delBtn);
                $container.append($item);
            }, this);
        }, this);
    },
    showDayPicker: function(){
        var $addDayBtn = $('#addDayBtn');
        var $removeDayBtn = $('#removeDayBtn');
        $('#day-picker').html('');
        $('#day-picker').append($addDayBtn);
        $('#day-picker').append($removeDayBtn);
        var counter = 1;
        var that = this;
        this.days.forEach(function(day){
            var $listItem = $('<li />');
            $listItem.attr('day-id',counter);
            $listItem.click(function(){
                var id = parseInt($(this).attr('day-id'));
                that.renderDay(id);
            });
            var $item = $('<a />');
            if(this.currentIndex === counter){
                $item.addClass('active');
            }
            $item.html(counter);
            counter ++;
            $listItem.append($item);
            $addDayBtn.before($listItem);
        }, this);
    },
    removeDay: function(){
        this.days.splice(this.currentIndex-1, 1);
        if(this.days.length === 0){
            this.addDay();
        }
        else {
            this.currentIndex = 1;
            this.renderDay(this.currentIndex);
        }
    }
};