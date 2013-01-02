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
      var rndImgNumber = ( Math.floor( Math.random() * app.bgImages.length ) ),
          rndImgUrl = app.bgImages.at(rndImgNumber).get('uri');

      return {
        rndImgUrl: rndImgUrl
      };
    }

  });

  return BGBEnd;

});
