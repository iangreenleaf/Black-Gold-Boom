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
      
      _.bindAll(this, 'render', 'fixSplatBgSize');

      app.bgImages = new Loader.ImagesCollection(69796);
      app.bgImages.fetch().success(function() {
        console.log('fetchedit');
        _this.bgImagesFetched = true;
        _this.rndImgNumber = ( Math.floor( Math.random() * app.bgImages.length ) );
        _this.render();
        _this.preloadEndImg();
      });

      if ( !app.state.get('first_visit') ) {
        this.DELAY = 0;
      }

      this.model.on('layer_loading', this.onLayerLoading, this );
      this.model.on('layer_ready', this.onLayerReady, this );
      this.model.on('data_loaded', this.onDataLoaded, this);
      //this.model.on('can_play', this.onCanPlay, this );

    },

    afterRender: function() {
      this.fixSplatBgSize();
      $(window).on('resize', this.fixSplatBgSize);
    },

    fixSplatBgSize: function() {
      this.$('.logo-splat').css('background-size', 'auto ' + this.$('.logo').height() + 'px');
    },

    preloadEndImg: function() {
       var rndImgNumber = ( Math.floor( Math.random() * app.bgImages.length ) ),
          rndImgUrl = app.bgImages.at(rndImgNumber).get('uri'),
          preloadImg = $('<img />');

        preloadImg.attr('src',rndImgUrl);

        app.endImageUrl = rndImgUrl;
    },

    serialize: function() {
      if (this.bgImagesFetched) {
        return {
          rndImgUrl: app.bgImages.at(this.rndImgNumber).get('uri')
        };
      } else {
        return {
          rndImgUrl: ''
        };
      }
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

    },

    events: {
      "click .fullscreen": "goFullscreen"
    },

    goFullscreen: function() {
      docElm = document.getElementById('body-main');
          
      if (docElm.requestFullscreen) docElm.requestFullscreen();
      else if (docElm.mozRequestFullScreen) docElm.mozRequestFullScreen();
      else if (docElm.webkitRequestFullScreen) docElm.webkitRequestFullScreen();

      this.$('#project-fullscreen-toggle i').removeClass('icon-resize-full').addClass('icon-resize-small');
      return false;
    }

  });

  Loader.ImagesCollection = Backbone.Collection.extend({
    initialize: function(zeegaId) {
      this.zeegaId = zeegaId;
    },
    url: function() {
      return localStorage.api + "/items/" + this.zeegaId + "/items";
    },
    parse: function(response) {
      return response.items;
    }
  });

  // Required, return the module for AMD compliance
  return Loader;

});
