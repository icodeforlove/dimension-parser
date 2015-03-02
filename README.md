# dimension-parser [![Build Status](https://travis-ci.org/icodeforlove/dimension-parser.png?branch=master)](https://travis-ci.org/icodeforlove/dimension-parser)

parse dimensions out of strings

## install

```
npm install dimension-parser
```

or

```
bower install dimension-parser
```

## examples

```javascript
var dimensionParser = require('dimension-parser');

dimensionParser('171.5 x 141.5 cm (67.5 x 55.75 in.)', 'in'); // returns {width: "67.50", height: "55.75"}

// or

dimensionParser('171.5 x 141.5 x 141.5 cm (67.5 x 55¾ x 55 3/4 in.)', 'in'); // returns {width: "67.50", height: "55.75", length: "55.75"}
```
