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
      console.log('init inner slideshow', "ZEEGA-popup-"+ this.options.collection_id, $("ZEEGA-popup-"+ this.options.collection_id))
      this.player = new Zeega.player({
        target: "#ZEEGA-popup-"+ this.options.collection_id,
        //window_fit: true,
        autoplay: true,
        layerOptions: {
          slideshow: {
            display: true,
            bleed: false
          }
        },
        // url: "http://alpha.zeega.org/api/items/72666"
        url: 'http://alpha.zeega.org/api/items/'+ this.options.collection_id + "/items" // sequence test
      });
      this.player.on("all", function(e, obj){ if(e!="media_timeupdate") console.log('    zeega popup event:',e,obj);});
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
