define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Titles = {};

  // This will fetch the tutorial template and render it.
  Titles.View = Backbone.View.extend({
    
    visible : true,

    template: 'titles',

    className: 'BGB-player-titles',

    serialize: function() {
        return _.extend({title:''},this.model.toJSON());
    },

    initialize: function() {
      /* update the arrow state whenever a frame is rendered */
      this.model.on('frame_rendered', this.render, this);
      this.model.on('data_loaded', this.render, this);
    }

  });

  return Titles;

});
