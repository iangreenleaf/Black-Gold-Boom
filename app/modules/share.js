define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Share = {};

  // This will fetch the tutorial template and render it.
  Share.View = Backbone.View.extend({
    template: "share",

    className: "BGB-overlay",

    events : {
      "click .close-modal": 'close'
    },

    close: function() {
      this.model.play();
      this.remove();
    }

  });

  return Share;

});
