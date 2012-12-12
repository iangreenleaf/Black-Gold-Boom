define([
  "app",
  // Libs
  "backbone"
],

function(app, Backbone) {

  // Create a new module
  var Titles = {};

  // This will fetch the tutorial template and render it.
  Titles.View = Backbone.View.extend({
    
    visible : true,

    template: 'titles',

    className: 'BGB-player-titles',

    seqTitle: '',

    serialize: function() {
        return _.extend({title:''}, {
          title : this.model.get('title'),
          seqTitle : this.seqTitle
        });
    },

    initialize: function() {
      /* update the arrow state whenever a frame is rendered */
      this.model.on('frame_rendered', this.render, this);
      this.model.on('data_loaded', this.render, this);
      this.model.on('sequence_enter', this.showTitlebar, this);
      this.model.on('sequence_enter', this.getSequenceTitle, this);
    },

    showTitlebar: _.after(2, function() {
      this.$el.animate({
        bottom: 0
      }, 500);
    }),

    getSequenceTitle: function(info) {
      this.seqTitle = info.title;
      this.render();
    }

  });

  return Titles;

});
