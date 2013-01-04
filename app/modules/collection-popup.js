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
      'click .continue-arrow' : 'continueSequence',
      "click .continue": "closeCaption",
      "click .skip": "continueSequence"
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
        name: '',
        caption: this.options.caption || ""
      };
    },

    afterRender: function() {
      this.initPlayer();
    },

    initPlayer: function() {
      this.player = new Zeega.player({
        target: this.$(".ZEEGA-popup-project-target"),
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

    skipGallery: function() {
      this.dispose();
      this.closeCaption();
    },

    dispose: function() {
      var _this = this;
      this.player.destroy();
    },

    closeCaption: function() {
      this.$(".caption").fadeOut(function() {
        $(this).remove();
      });
      return false;
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
