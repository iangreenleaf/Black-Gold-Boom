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

    titlebarHeight: 84, // used for hiding, set in afterRender

    titlebarHidden: true,

    serialize: function() {
        return _.extend({title:''}, {
          title : this.seqTitle,
          seqTitle : this.seqDescription
        });
    },

    initialize: function() {
      var _this = this;
      _.bindAll(this, 'showTitlebar', 'hideTitlebar', 'showOnHover');

      /* update the arrow state whenever a frame is rendered */
      this.model.on('frame_rendered', this.render, this);
      this.model.on('data_loaded', this.render, this);
      this.model.on('sequence_enter', _.after(2, function() { this.showTitlebar(7000); }), this);
      this.model.on('sequence_enter', this.getSequenceTitle, this);

      $('body').on('mousemove', _.debounce(this.showOnHover, 100) );
    },

    afterRender: function() {
      this.titlebarHeight = this.$el.height();
    },

    showOnHover: function(e){
      if (!this.hideTimerRunning) {

        if (e.pageY > (window.innerHeight - this.titlebarHeight) && this.titlebarHidden) {
          this.showTitlebar();
        } else if (e.pageY < (window.innerHeight - this.titlebarHeight) && !this.titlebarHidden) {
          this.hideTitlebar();
        }

      }
    },

    showTitlebar: function(hideAfter) {
      this.titlebarHidden = false;

      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimerRunning = false;
      }

      this.$el.stop().animate({
        bottom: 0
      }, 500);

      if (hideAfter) {
        this.hideTimer = setTimeout(this.hideTitlebar, hideAfter);
        this.hideTimerRunning = true;
      }
    },

    hideTitlebar: function() {
      this.titlebarHidden = true;
      this.hideTimerRunning = false;

      this.$el.stop().animate({
        bottom: this.titlebarHeight * -1
      }, 500);
    },

    getSequenceTitle: function(info) {
      //this.seqTitle = info.title ? info.title : '';
      //this.seqDescription = info.description ? info.description : '';
      this.seqTitle = "This is a very long title which serves to test long titles. Maybe it will go to two lines, who knows. Need to add more text so it is long! " + info.title;
      this.seqDescription = "This is a very long description which is mostly nonsense so we can test long descriptions. Testing long descriptions! That's what we need to do. Sooooooo long. Okay. Just a little bit longer and we'll be set. " + info.description;
      this.render();
    }

  });

  return Titles;

});
