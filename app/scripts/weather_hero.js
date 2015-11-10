

var weatherHero = Backbone.Model.extend({

  defaults: {
    temp: 'No info',
    icon: "placeholder",
    location: "",
    summary: ""
  }

});

var weatherHeroView = Backbone.View.extend({

  tagName: "div",
  className: "hero--inner",

  template: _.template( $("#weatherHeroElement").html() ),

  render: function() {
    this.$el.html( this.template(this.model.toJSON()));
  },

  initialize: function(){
    this.render();
    this.model.on('change', this.render, this);
  }

});



