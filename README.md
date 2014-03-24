node-termplot
=============

plot x,y, and hits to view in your terminal for much win

right now it only works with numbers. and rounds floats. it should auto scale each axis and a bunch of other cool things but a 3 dimensional plot in your terminal this simple is pretty neat i think.

## how

#### read points from stdin

```
echo -e "[5,7]\n[7,9]\n[6,8]\n[6,8]" | termplot
   7|8|9|
5 |1|
6 |  2|
7 |    1|
```

#### read points from json file

```
termplot -p points.json
   7|8|9|
5 |1|
6 |  2|
7 |    1|
```

#### pick x and y from json properties 

new line delimited json from stdin.

```
echo -e '{"a":5,"b":7}\n{"a":7,"b":9}\n{"a":6,"b":8}\n{"a":6,"b":8}' | termplot -x a -y b
   7|8|9|
5 |1|
6 |  2|
7 |    1|
```

## install

```
npm install -g termplot
```
