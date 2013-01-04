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
  "modules/collection-popup",
  "modules/bgb-end"

],

function(app, Backbone, Loader, Controls, Titles, CollectionPopup, BGBEnd ) {

  // Create a new module
  var UI = {};

  var FADE_OUT_DELAY = 3000;

  UI.Layout = Backbone.LayoutView.extend({
    
    el: '#main',

    template: 'ui-base',

    initialize: function() {
      app.player.on("frame_rendered", this.checkForCollectionFrame, this );
      app.player.on("frame_rendered", this.updateContinue, this );
      app.player.on("deadend_frame", this.showBGBEnd, this);

      this.loader = new Loader.View({model: app.player});
      this.controls = new Controls.View({model: app.player});
      this.titles = new Titles.View({model: app.player});

      this.insertView( this.loader );
      this.insertView( this.controls );
      this.insertView( this.titles );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
    },

    updateContinue: function( info ) {
      if ( info.attr.advance ) {
        this.$('.continue-arrow').removeClass('show');
      } else {
        this.$('.continue-arrow').addClass('show');
      }
    },

    checkForCollectionFrame: function( info ) {

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
        this.popup = new CollectionPopup.View({"collection_id": 67060 }); // sticker gallery
        this.insertView( this.popup );
        this.popup.render();
      } else if ( info.id == 31018 ) {
        this.popup = new CollectionPopup.View({"collection_id": 67034 }); // housing gallery
        this.insertView( this.popup );
        this.popup.render();
      } else if ( info.id == 30928 ) {
        this.controls.remove();
      } else if ( info.id == 31358 ) {
        this.showBGBEnd();
      }
    },

    showBGBEnd: function() {
      if ( !this.ending ) {
        this.ending = new BGBEnd.View();
        this.insertView( this.ending );
        this.ending.render();
      }
    }
  
  });

  // Required, return the module for AMD compliance
  return UI;

});
