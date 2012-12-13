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

    events: {
      'click .continue-arrow' : 'continueSequence'
    },

    serialize: function() {
      return {
        id: this.options.collection_id,
        name: 'Black Gold Boom'
      };
    },

    afterRender: function() {
      this.initPlayer();
    },

    initPlayer: function() {
      this.player = new Zeega.player({
        "collection_mode": "slideshow",
        "div_id": "ZEEGA-popup-"+ this.options.collection_id,
        "window_fit": true,
        "autoplay": true
      });

      this.player.on("all", function(e, obj){ if(e!="media_timeupdate") console.log('    zeega popup event:',e,obj);});

      this.player.load({
        url: 'http://alpha.zeega.org/api/items/'+ this.options.collection_id // sequence test
      });
    },

    continueSequence: function() {
      app.player.cueNext();
    },

    dispose: function() {
      var _this = this;
      this.player.destroy();
      this.player.on('player_destroyed', function() {
        _this.remove();
      });
    }

  });

  return CollectionPopup;

});
