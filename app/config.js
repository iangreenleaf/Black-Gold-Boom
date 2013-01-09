// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ['zeegaplayer', "main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/vendor",

    // Libraries.
    jquery: "../assets/js/libs/jquery",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",

    zeega: "../assets/js/zeega",

    zeegaplayer: "../assets/vendor/zeegaplayer/dist/debug/zeega",

    modernizr: "../assets/js/libs/modernizr"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["jquery", "lodash",'zeegaplayer'],
      exports: "Backbone"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],
    "plugins/jquery-ui" : ["jquery"],
    
    zeegaplayer: ['jquery','plugins/jquery-ui'],

    modernizr: {
      exports: "Modernizr"
    }
  }

});