define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var State = {};

  // This will fetch the tutorial template and render it.
  State = Backbone.Model.extend({
    defaults: {
      'base_rendered': false,
      'first_visit': true
    },

    initialize: function() {
      this.checkFirstVisit();
    },

    checkFirstVisit: function() {
      if (localStorage['visited'] == 'true') {
        this.set('first_visit', false);
      } else {
        localStorage['visited'] = true;
      }
    }
  });

  // Required, return the module for AMD compliance
  return State;

});
