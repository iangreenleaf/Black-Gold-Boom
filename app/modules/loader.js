define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Loader = {};

  Loader.View = Backbone.View.extend({

    DELAY: 3000,
    /* variables keeping track of generic layer states */
    layerCount : 0,
    layersReady : 0,

    className: 'ZEEGA-loader-overlay',
    template: 'bgbloader',

    initialize: function() {
      var _this = this;

      this.bgImages = new Loader.ImagesCollection(69796);
      this.bgImages.fetch().success(function() {
        _this.render();
      });

      if ( !app.state.get('first_visit') ) {
        this.DELAY = 0;
      }
      this.model.on('layer_loading', this.onLayerLoading, this );
      this.model.on('layer_ready', this.onLayerReady, this );
      this.model.on('data_loaded', this.onDataLoaded, this);
      //this.model.on('can_play', this.onCanPlay, this );

    },

    serialize: function()
    {
      var rndImgNumber = ( Math.floor( Math.random() * this.bgImages.length ) ),
          rndImgUrl = this.bgImages.at(rndImgNumber).get('uri');

      return {
        rndImgUrl: rndImgUrl
      };
    },

    onDataLoaded: function() {
      this.render();
    },

    onLayerLoading: function(layer) {
      this.layerCount++;
    },

    onLayerReady: function(layer) {
      this.layersReady++;

      this.$('.logo-splat').stop().animate({
        'height': (this.layersReady/this.layerCount*100) +'%'
      });
      if(this.layersReady == this.layerCount) this.onCanPlay();
    },

    onCanPlay: function() {

      var _this = this;
  
      _.delay(function(){

        _this.$('.loader-content').fadeOut( 500, function() {

          _.delay(function(){

            _this.$el.fadeOut( 500, function(){
              _this.remove();
            });

          }, 500);

        });

        _this.model.play();

      }, this.DELAY);

    }

  });

  Loader.ImagesCollection = Backbone.Collection.extend({
    initialize: function(zeegaId) {
      this.zeegaId = zeegaId;
    },
    url: function() {
      return 'http://alpha.zeega.org/api/items/' + this.zeegaId;
    },
    parse: function(response) {
      return response.items[0].child_items;
    }
  });

  // Required, return the module for AMD compliance
  return Loader;

});
