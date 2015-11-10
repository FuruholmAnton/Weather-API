var app = app || {};

app.weather = Backbone.Model.extend({

  defaults: {
    day: 'unknown',
    temp: 'No info',
    icon: "rain"
  }

});