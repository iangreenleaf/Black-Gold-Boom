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

    initialize: function() {
      this.collectionModel = new CollectionModel({ id: this.options.collection_id });
      this.collectionModel.fetch().success(function( response ) {
        this.$('.popup-title').text( this.collectionModel.get("title") );
      }.bind( this ));
    },

    serialize: function() {
      return {
        id: this.options.collection_id,
        name: ''
      };
    },

    afterRender: function() {
      this.initPlayer();
    },

    initPlayer: function() {
      this.player = new Zeega.player({
        "collection_mode": "slideshow",
        "div_id": "ZEEGA-popup-"+ this.options.collection_id,
        "slides_bleed": false,
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
      
    }

  });

  var CollectionModel = Backbone.Model.extend({
    url: function() {
      return 'http://alpha.zeega.org/api/items/' + this.id;
    },

    parse: function( response ) {
      return response.items[0];
    }
  });

  return CollectionPopup;

});
