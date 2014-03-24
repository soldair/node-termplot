#!/usr/bin/env node

var tp = require('../')
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var split = require('split');
var points = argv.p||argv.points;
var undef;

if(!points){

  var t = setTimeout(function(){
    console.error('did you forget to specify a points json file? -p --points. im trying to read from stdin but i have been waiting a while =/.')
  },10000);


  process.stdin.once('data',function(){
    clearTimeout(t);
  })

  points = [];
  process.stdin.pipe(split()).on('data',function(line){

    if(!line.length) return;
    var o = JSON.parse(line);

    var x = o[argv.x||0];
    var y = o[argv.y||1];

    if(x === undef || y === undef){
      return;
    }

    points.push([x,y]);

  }).on('end',function(){
    clearTimeout(t);
    render(points);
  })

 

} else {
  if(points.indexOf('.json') != points.length-5) {
    console.error('will only load json files right now. I support newline delimited json from stdin though!');
    process.exit();
  }

  points = require(path.resolve(process.cwd(),points));
  render(points);
}


function render(points){
  process.stdout.write(tp(points));
}
