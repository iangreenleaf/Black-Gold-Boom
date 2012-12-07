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
  'modules/citations'

],

function(app, Backbone, Loader, Controls, Citations) {

  // Create a new module
  var UI = {};

  var FADE_OUT_DELAY = 3000;

  UI.Layout = Backbone.Layout.extend({
    
    el: '#main',

    initialize: function() {

      this.loader = new Loader.View({model: app.player});
      this.controls = new Controls.View({model: app.player});
      this.citations = new Citations.View({model: app.player});

      this.insertView( this.loader );
      this.insertView( this.controls );
      this.insertView( this.citations );
      this.render();
    },

    afterRender: function() {
      app.state.set('base_rendered', true);
    }
  
  });

  // Required, return the module for AMD compliance
  return UI;

});
