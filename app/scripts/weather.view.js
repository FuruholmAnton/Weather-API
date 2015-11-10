
// Namespace our flowerApp
var app = app || {};

app.weatherView = Backbone.View.extend({

  tagName: "div",
  className: "container--half weather-days",

  template: _.template( $("#weatherDaysElement").html() ),

  render: function() {
    var weatherDaysTemplate = this.template(this.model.toJSON());
    this.$el.html(weatherDaysTemplate);
    return this;
  },

  initialize: function(){
    this.model.on('change', this.render, this);
  }

});