// watch-sphero.js
/*
 * Control sphero with pebble watch
 * */

var Cylon = require('cylon');

var speed = 0;
var heading = 0;

Cylon.config({
  api: {
    host: '0.0.0.0',
    port: '8080',
    ssl: false
  }
});

Cylon.api();

Cylon.robot({

  name: 'hello',

  connection: {
    name: 'pebble',
    adaptor: 'pebble'
  },

  device: {
    name: 'pebble',
    driver: 'pebble'
  },

  work: function(my) {

    my.pebble.on('accel', function(data) {

      values = data.split(",");
      x      = values[0];
      y      = values[1];

      speed   = Math.round(Math.max(Math.abs(x)/6, Math.abs(y)/6));
      heading = Math.round(((180.0 - (Math.atan2(y,x) * (180.0 / Math.PI)))));
    });
 }
  
}).start();

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-BYO-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    every((0.1).second(), function() {
      my.sphero.roll(100, heading);
    });

  }
  
}).start();