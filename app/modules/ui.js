/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
  "app",

  // Libs
  "backbone",

  // Modules,
  'modules/loader',
  'modules/controls',
  'modules/titles',
  "modules/collection-popup"

],

function(app, Backbone, Loader, Controls, Titles, CollectionPopup ) {

  // Create a new module
  var UI = {};

  var FADE_OUT_DELAY = 3000;

  UI.Layout = Backbone.LayoutView.extend({
    
    el: '#main',

    template: 'ui-base',

    initialize: function() {
      
      app.player.on("frame_rendered", this.checkForCollectionFrame, this );


      this.loader = new Loader.View({model: app.player});
      //this.controls = new Controls.View({model: app.player});
      this.titles = new Titles.View({model: app.player});

      this.insertView( this.loader );
      //this.insertView( this.controls );
      this.insertView( this.titles );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
    },

    checkForCollectionFrame: function( info ) {

    console.log('***** info', info.id);

      if ( this.popup ) {
        this.popup.player.on('player_destroyed', function() {
          this.popup.remove();
          this.popup = null;
        }, this);
        this.popup.dispose();
      }
      // if the frame is the designated frame, then start the collection popup

      // decompose these
      if ( info.id == 28729 ) {
        this.popup = new CollectionPopup.View({"collection_id": 67060 });
        this.insertView( this.popup );
        this.popup.render();
      } else if ( info.id == 28562 ) {
        this.popup = new CollectionPopup.View({"collection_id": 67034 });
        this.insertView( this.popup );
        this.popup.render();
      }




    }
  
  });

  // Required, return the module for AMD compliance
  return UI;

});
