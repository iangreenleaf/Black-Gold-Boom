define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Controls = {};

  // This will fetch the tutorial template and render it.
  Controls.View = Backbone.View.extend({
    
    template: 'controls',

    className: 'ZEEGA-player-controls',

    initialize: function() {
      /* update the arrow state whenever a frame is rendered */
      this.model.on('frame_rendered', this.updateArrowState, this);
    },

    events: {
      "click .continue-arrow": "skip"
    },

    skip: function() {
      this.model.cueNextSequence();
    }

  });

  return Controls;

});
