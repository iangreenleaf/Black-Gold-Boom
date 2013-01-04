/*

the controller model should remove any non-route code from router.js
*/

define([
  "app",
  // Libs
  "backbone",

  "modules/state",
  "modules/ui",
   // Plugins
  'zeegaplayer'

],

function(app, Backbone, State, UI ) {

  // Create a new module
  var Controller = {};

  // Does this need to be a model?? why not right?
  Controller.Model = Backbone.Model.extend({
    
    initialize: function() {
  
      this.initPlayer();

      /*
        app.state stores information on the current state of the application
      */
      app.state = new State();
      /*
        render base layout
        the base layout contains the logic for the player skin (citations, ui, etc)
      */
      app.layout = new UI.Layout();
    },

    initPlayer: function() {
      var player = new Zeega.player({
        window_fit: true,
        autoplay: false,
        preloadRadius: 5,
        startFrame: 27708,
        url: 'http://alpha.zeega.org/api/projects/3678' // bgb test
      });

      player.on("all", function(e, obj){ if(e!="media_timeupdate") console.log('    zeega player event:',e,obj);});
      player.on("frame_rendered window_resized", this.updateYoutubeSize, this);

      app.player = player;
    },

    /* temporary until full-bleed video support is added to the player */
    updateYoutubeSize : function() {
      _.delay( function() {
        var width = window.innerHeight * (16 / 9);
        var left = (window.innerWidth - width) / 2;
        
        $('.ZEEGA-player .visual-element-video').css({
          'height': window.innerHeight,
          'width' : width,
          'left' : left
        });
      }, 0);
    }

  });


  // Required, return the module for AMD compliance
  return Controller;

});
