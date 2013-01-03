define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var BGBEnd = {};

  // This will fetch the tutorial template and render it.
  BGBEnd.View = Backbone.View.extend({
    template: 'bgb-end',

    className: "BGB-end",

    serialize: function() {
      return {
        rndImgUrl: app.endImageUrl
      };
    }

  });

  return BGBEnd;

});
