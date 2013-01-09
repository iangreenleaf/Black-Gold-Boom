// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: [ "backbone", "zeegaplayer", "main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    // Libraries.
    // jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",

    zeega: "../assets/js/zeega",

    zeegaplayer: "../assets/vendor/zeegaplayer/dist/debug/zeega",

    modernizr: "../assets/js/libs/modernizr"
  },

  shim: {

    //"plugins/jquery-ui" : ["jquery"],
    //"libs/imagesloaded.jquery.min" : ["jquery"],

    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: [ "lodash"],
      exports: "Backbone"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],

    
    zeegaplayer: [ "backbone" ],

    modernizr: {
      exports: "Modernizr"
    }
  }

});