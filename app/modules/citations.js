define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Citations = {};

  // This will fetch the tutorial template and render it.
  Citations.View = Backbone.View.extend({
    
    visible : true,

    template: 'citations',

    className: 'BGB-player-citations',

    serialize: function() {
        return this.model.toJSON();
    },

    initialize: function() {
      /* update the arrow state whenever a frame is rendered */
      this.model.on('frame_rendered', this.render, this);
      this.model.on('data_loaded', this.render, this);
    }

  });

  return Citations;

});
