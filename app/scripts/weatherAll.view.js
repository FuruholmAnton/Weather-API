// Namespace our flowerApp
var app = app || {};

app.weatherAllView = Backbone.View.extend({

  tagName: "section",
  className: "following-days--inner",

  render: function() {
    this.collection.each(this.addWeather, this);
    return this;
  },

 addWeather: function(weather) {
    var weatherView = new app.weatherView ({ model: weather });
    this.$el.append(weatherView.render().el);
 }

});
