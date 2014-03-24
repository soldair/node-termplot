
var undef;

module.exports = function(points){
  var d = module.exports.grid(points);
  return module.exports.format(d.maxx,d.maxy,d.minx,d.miny,d.grid);
}

module.exports.grid = function(points){

  var maxx = 0;
  var maxy = 0;

  var minx;
  var miny;
  var longest = 0;

  points.forEach(function(p){
    if(minx === undef) minx = p[0];
    if(miny === undef) miny = p[1];

    if(p[0] < minx) minx = p[0];
    if(p[1] < miny) miny = p[1]; 

    if(p[0] > maxx) maxx = p[0];
    if(p[1] > maxy) maxy = p[1]; 
  });

  var grid = [];

  points.forEach(function(p){

    var xKey = Math.round(p[0]-minx);
    var yKey = Math.round(p[1]-miny);

    if(!grid[xKey]) {
      grid[xKey] = new Array(yKey+1);
      grid[xKey][yKey] = 1;
    } else {

      if(grid[xKey].length < yKey+1) {
        var splice = new Array((yKey+1)-grid[xKey].length);
        splice.unshift(grid[xKey].length,0);
        grid[xKey].splice.apply(grid[xKey],splice);
        grid[xKey][grid[xKey].length-1] = 1;
      } else {
        if(grid[xKey][yKey]) {
          grid[xKey][yKey]++;
        } else {
          grid[xKey][yKey] = 1;
        }
      }
    }

  });
  
  return {maxx:maxx,maxy:maxy,minx:minx,miny:miny,grid:grid};
}

module.exports.format = function(maxx,maxy,minx,miny,grid){

  var str = "";

  // prepare padding for values and legeneds.
  padding = new Array((""+maxx).length+2).join(' ');
  xpadding = new Array((""+maxy).length+1).join(' ');

  // make room for x axis legend in the leftmost column
  str += padding+" ";
  
  // echo x axis legend
  for(var i=Math.round(miny);i<=Math.round(maxy);++i){
    str += i+xpadding.substr((""+i).length)+'|';
  }

  var s,y,r,v;
  for(var i=0;i<grid.length;++i){
    s = "\n";
    y = i+minx;
    r = grid[i]||[];

    s += y+(padding.substr((y+"").length))+'|';
    for(var j=0;j<r.length;++j){
      v = r[j];
      if(!v) s += xpadding+" ";
      else s += v+xpadding.substr((v+'').length)+'|';
    }

    str += s;
  }

  str += "\n";
  return str;
}










