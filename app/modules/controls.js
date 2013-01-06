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
      "click .next-arrow": "skip",
      "click .prev-arrow": "skipBack",

      "mouseenter .prev-arrow" : "mouseenterPrev",
      "mouseenter .next-arrow" : "mouseenterNext",
      "mouseout .prev-arrow" : "mouseoutPrev",
      "mouseout .next-arrow" : "mouseoutNext"
    },

    mouseenterNext: function() {
      this.$(".arrow-text").addClass("next");
    },
    mouseoutNext: function() {
      this.$(".arrow-text").removeClass("next");
    },
    mouseenterPrev: function() {
      this.$(".arrow-text").addClass("prev");
    },
    mouseoutPrev: function() {
      this.$(".arrow-text").removeClass("prev");
    },

    skip: function() {
      if ( this.model.status.attributes.current_frame_model.get("_prev") === null && this.model.status.attributes.current_frame != 27708 && this.model.status.attributes.current_frame != 28506 ) {
        var adv = this.model.status.attributes.current_frame_model.layers.models[0].get("attr").cue_in + this.model.status.attributes.current_frame_model.get("attr").advance / 1000;
        
        this.model.status.attributes.current_frame_model.layers.models[0].visualElement.mediaPlayer.setCurrentTime( adv );
        this.model.cueNext();
      } else {
        this.model.cueNextSequence();
      }
    },

    skipBack: function() {
      this.model.cuePrevSequence();
    }

  });

  return Controls;

});
