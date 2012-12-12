define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var CollectionPopup = {};

  // This will fetch the tutorial template and render it.
  CollectionPopup.View = Backbone.View.extend({
    
    template: 'zeega-popup',

    className: 'ZEEGA-popup',

    serialize: function() {
      return { id: this.options.collection_id };
    },

    afterRender: function() {
      this.initPlayer();
    },

    initPlayer: function() {
      var player = new Zeega.player({
        "collection_mode": "slideshow",
        "div_id": "ZEEGA-popup-"+ this.options.collection_id,
        "window_fit": true,
        "autoplay": true
      });

      player.on("all", function(e, obj){ if(e!="media_timeupdate") console.log('    zeega popup event:',e,obj);});

      player.load({
        url: 'http://alpha.zeega.org/api/items/'+ this.options.collection_id // sequence test
      });
      app.player = player;
    }

  });

  return CollectionPopup;

});
