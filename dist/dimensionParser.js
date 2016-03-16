/**
 * dimensionParser.js v0.0.18
 */
var dimensionParser =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Qty = __webpack_require__(2),
		saw = __webpack_require__(1);
	
	var entitiesMap = {
			'¼': 1/4,
			'½': 1/2,
			'¾': 3/4,
			'⅛': 1/8,
			'⅜': 3/8,
			'⅝': 5/8,
			'⅞': 7/8,
			'⅓': 1/3,
			'⅔': 2/3,
			'⅕': 1/5,
			'⅖': 2/5,
			'⅗': 3/5,
			'⅘': 4/5,
			'⅙': 1/6,
			'⅚': 5/6
		},
		entitiesArray = Object.keys(entitiesMap),
		unitTypes = ['in', 'cm', 'mm', 'ft', '"'],
		matches = [
			{
				strict: true,
				match: 'h\\: ([0-9][0-9\\.,]*) w\\: ([0-9][0-9\\.,]*) (' + unitTypes.join('|') + ')',
				props: ['height', 'width', 'type']
			},
			{
				strict: true,
				match:  '(?:(?:\\s*by\\s*)?([0-9][0-9\\.,]*)\\s+(' + unitTypes.join('|') + ')\\.?\\s*\\([0-9][0-9\\.,]* (?:' + unitTypes.join('|') + ')\\.\\)\\s*\\(height\\))?' +
						'(?:(?:\\s*by\\s*)?([0-9][0-9\\.,]*)\\s+(' + unitTypes.join('|') + ')\\.?\\s*\\([0-9][0-9\\.,]* (?:' + unitTypes.join('|') + ')\\.\\)\\s*\\(width\\))?' +
						'(?:(?:\\s*by\\s*)?([0-9][0-9\\.,]*)\\s+(' + unitTypes.join('|') + ')\\.?\\s*\\([0-9][0-9\\.,]* (?:' + unitTypes.join('|') + ')\\.\\)\\s*\\(depth\\))?',
				props: ['height', 'type', 'width', 'type', 'length', 'type']
			},
			{
				strict: true,
				match:
					// height
					'(?:height|hauteur)\\s*:' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?(?:\\s*\\([^\\)]+\\))?\\s*' +
	
					// width
					'(?:width|largeur)\\s*:' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?(?:\\s*\\([^\\)]+\\))?\\s*' +
	
					// length
					'(?:(?:length|depth|profondeur)\\s*:' +
					'\\s*([0-9][0-9\\.]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?(?:\\s*\\([^\\)]+\\))?)?',
				props: ['height', 'height_remainder', 'type', 'width', 'width_remainder', 'type', 'length', 'length_remainder', 'type']
			},
			{
				strict: true,
				match:
					// height
					'(?:height|hauteur)\\s*:[^\\(]*' +
					'\\(\\s*' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?' +
					'\\)\\s*' +
	
					// width
					'(?:width|largeur)\\s*:[^\\(]*' +
					'\\(\\s*' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?' +
					'\\)\\s*' +
	
					// length
					'(?:(?:length|depth|profondeur)\\s*:[^\\(]*' +
					'\\(\\s*' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?' +
					'\\))?',
				props: ['height', 'height_remainder', 'type', 'width', 'width_remainder', 'type', 'length', 'length_remainder', 'type']
			},
			{
				strict: true,
				match:
					// height
					'(?:height|hauteur):\\s*(?:[0-9][0-9\\.,]*)(?:\\s*(?:[0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?(?:' + unitTypes.join('|') + ')?\\.?\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?\\s*(' + unitTypes.join('|') + ');\\s*' +
	
					// length
					'(?:length|depth|profondeur):\\s*(?:[0-9][0-9\\.,]*)(?:\\s*(?:[0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?(?:' + unitTypes.join('|') + ')?\\.?\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?\\s*(' + unitTypes.join('|') + ');\\s*' +
	
					// width
					'(?:width|largeur):\\s*(?:[0-9][0-9\\.,]*)(?:\\s*(?:[0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?(?:' + unitTypes.join('|') + ')?\\.?\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?\\s*(' + unitTypes.join('|') + ')',
	
				props: ['height', 'height_remainder', 'type', 'length', 'length_remainder', 'type', 'width', 'width_remainder', 'type']
			},
			{
				strict: false,
				match:
					'([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')?\\.?\\s*(?:x|×|by)\\s*' +
					'([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'(?:\\s*(' + unitTypes.join('|') + ')?\\.?\\s*(?:x|×|by)\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?)?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?\\.?',
				props: ['width', 'width_remainder', 'type', 'height', 'height_remainder', 'type', 'length', 'length_remainder', 'type']
			},
			{
				strict: true,
				match:
					'([0-9][0-9\\.,]*)(?:\\s*(' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')?\\.?\\s*(?:x|×|by)\\s*' +
					'([0-9][0-9\\.,]*)(?:\\s*(' + entitiesArray.join('|') + '))?' +
					'(?:\\s*(' + unitTypes.join('|') + ')?\\.?\\s*(?:x|×|by)\\s*([0-9][0-9\\.,]*)(?:\\s*(' + entitiesArray.join('|') + '))?)?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?',
				props: ['width', 'width_remainder', 'type', 'height', 'height_remainder', 'type', 'length', 'length_remainder', 'type']
			},
			// units first
			{
				strict: true,
				match:
					'(' + unitTypes.join('|') + ')\\.?\\s*' +
					'([0-9][0-9\\.,]*)(?:\\s*(' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')?\\.?\\s*(?:x|×|by)\\s*' +
					'([0-9][0-9\\.,]*)(?:\\s*(' + entitiesArray.join('|') + '))?' +
					'(?:\\s*(' + unitTypes.join('|') + ')?\\.?\\s*(?:x|×|by)\\s*([0-9][0-9\\.,]*)(?:\\s*(' + entitiesArray.join('|') + '))?)?',
				props: ['type', 'width', 'width_remainder', 'type', 'height', 'height_remainder', 'type', 'length', 'length_remainder']
			},
			{
				strict: true,
				match:
					// height
					'height ' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?;\\s*' +
	
					// width
					'width ' +
					'\\s*([0-9][0-9\\.,]*)(?:\\s*([0-9][0-9\\/]*|' + entitiesArray.join('|') + '))?' +
					'\\s*(' + unitTypes.join('|') + ')\\.?',
				props: ['height', 'height_remainder', 'type', 'width', 'width_remainder', 'type']
			}
		];
	
	function matchObject(string, regExp, props) {
		var match = saw(string)
			.match(new RegExp(regExp, 'gi'))
			.filter(function (item) {
				return item;
			})
			.last()
			.match(new RegExp(regExp, 'i'));
	
		if (match.toBoolean()) {
			return match.toObject(props);
		} else {
			return null;
		}
	}
	
	function parseFraction(string) {
		var fraction = saw(string).match(/(\d+)\/(\d+)/).toObject('numerator', 'denominator');
	
		if (fraction.numerator && fraction.denominator) {
			return fraction.numerator/fraction.denominator;
		} else {
			return 0;
		}
	}
	
	function parseEntity(string) {
		if (entitiesArray.indexOf(string) !== -1) {
			return entitiesMap[string];
		} else {
			return 0;
		}
	}
	
	function parseRemainder (string) {
		return parseEntity(string) || parseFraction(string);
	}
	
	function replaceDecimals (string) {
		return string.replace(/,/g, '.');
	}
	
	function matchDimensions (string, strict) {
		var match;
	
		for (var i = 0; i < matches.length; i++) {
	
			if (strict && !matches[i].strict) continue;
			if ((match = matchObject(string, matches[i].match, matches[i].props))) {
				break;
			}
		}
	
		return match;
	}
	
	var Parser = function (string, unitType, format, strict) {
		var match = matchDimensions(string, strict);
	
		format = format || 'WxHxL';
	
		if (match) {
			if (match.width) {
				match.width = parseFloat(replaceDecimals(match.width));
			}
	
			if (match.height) {
				match.height = parseFloat(replaceDecimals(match.height));
			}
	
			if (match.length) {
				match.length = parseFloat(replaceDecimals(match.length));
			}
	
			if (match.width_remainder) {
				match.width = match.width + parseRemainder(match.width_remainder);
			}
	
			if (match.height_remainder) {
				match.height = match.height + parseRemainder(match.height_remainder);
			}
	
			if (match.length_remainder) {
				match.length = match.length + parseRemainder(match.length_remainder);
			}
	
			match.type = String(match.type).toLowerCase();
	
			// remap shorthand
			if (match.type === '"') {
				match.type = 'in';
			}
	
			if (match.type !== unitType) {
				if (match.width) {
					match.width = new Qty(match.width + ' ' + match.type).to(unitType).scalar;
				}
	
				if (match.height) {
					match.height = new Qty(match.height + ' ' + match.type).to(unitType).scalar;
				}
	
				if (match.length) {
					match.length = new Qty(match.length + ' ' + match.type).to(unitType).scalar;
				}
			}
		}
	
		if (match) {
			var result = {};
	
			if (format === 'WxHxL') {
				if (match.width) {
					result.width = match.width.toFixed(2);
				}
	
				if (match.height) {
					result.height = match.height.toFixed(2);
				}
	
				if (match.length) {
					result.length = match.length.toFixed(2);
				}
			} else if (format === 'HxWxL') {
				if (match.width) {
					result.height = match.width.toFixed(2);
				}
	
				if (match.height) {
					result.width = match.height.toFixed(2);
				}
	
				if (match.length) {
					result.length = match.length.toFixed(2);
				}
	        } else if (format === 'WxLxH') {
	            if (match.width) {
	                result.width = match.width.toFixed(2);
	            }
	
	            if (match.height) {
	                result.length = match.height.toFixed(2);
	            }
	
	            if (match.length) {
	                result.height = match.length.toFixed(2);
	            }
	        }
	
			return result;
		} else {
			return null;
		}
	};
	
	Parser.hasDimensions = function (string) {
		return !!matchDimensions(string);
	};
	
	module.exports = Parser;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Saw = __webpack_require__(3);
	
	module.exports = function (string) {
		return new Saw(string);
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	Copyright © 2006-2007 Kevin C. Olbrich
	Copyright © 2010-2013 LIM SAS (http://lim.eu) - Julien Sanchez
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	/*jshint eqeqeq:true, immed:true, undef:true */
	/*global module:false, define:false */
	(function (root, factory) {
	    "use strict";
	
	    if (true) {
	        // Node. Does not work with strict CommonJS, but
	        // only CommonJS-like enviroments that support module.exports,
	        // like Node.
	        module.exports = factory();
	    } else if (typeof define === "function" && define.amd) {
	        // AMD. Register as an anonymous module.
	        define(factory);
	    } else {
	        // Browser globals
	        root.Qty = factory();
	    }
	}(this, function() {
	  "use strict";
	
	  var UNITS = {
	    /* prefixes */
	    "<googol>" : [["googol"], 1e100, "prefix"],
	    "<kibi>"  :  [["Ki","Kibi","kibi"], Math.pow(2,10), "prefix"],
	    "<mebi>"  :  [["Mi","Mebi","mebi"], Math.pow(2,20), "prefix"],
	    "<gibi>"  :  [["Gi","Gibi","gibi"], Math.pow(2,30), "prefix"],
	    "<tebi>"  :  [["Ti","Tebi","tebi"], Math.pow(2,40), "prefix"],
	    "<pebi>"  :  [["Pi","Pebi","pebi"], Math.pow(2,50), "prefix"],
	    "<exi>"   :  [["Ei","Exi","exi"], Math.pow(2,60), "prefix"],
	    "<zebi>"  :  [["Zi","Zebi","zebi"], Math.pow(2,70), "prefix"],
	    "<yebi>"  :  [["Yi","Yebi","yebi"], Math.pow(2,80), "prefix"],
	    "<yotta>" :  [["Y","Yotta","yotta"], 1e24, "prefix"],
	    "<zetta>" :  [["Z","Zetta","zetta"], 1e21, "prefix"],
	    "<exa>"   :  [["E","Exa","exa"], 1e18, "prefix"],
	    "<peta>"  :  [["P","Peta","peta"], 1e15, "prefix"],
	    "<tera>"  :  [["T","Tera","tera"], 1e12, "prefix"],
	    "<giga>"  :  [["G","Giga","giga"], 1e9, "prefix"],
	    "<mega>"  :  [["M","Mega","mega"], 1e6, "prefix"],
	    "<kilo>"  :  [["k","kilo"], 1e3, "prefix"],
	    "<hecto>" :  [["h","Hecto","hecto"], 1e2, "prefix"],
	    "<deca>"  :  [["da","Deca","deca","deka"], 1e1, "prefix"],
	    "<deci>"  :  [["d","Deci","deci"], 1e-1, "prefix"],
	    "<centi>"  : [["c","Centi","centi"], 1e-2, "prefix"],
	    "<milli>" :  [["m","Milli","milli"], 1e-3, "prefix"],
	    "<micro>"  : [
	      ["u","\u03BC"/*µ as greek letter*/,"\u00B5"/*µ as micro sign*/,"Micro","mc","micro"],
	      1e-6,
	      "prefix"
	    ],
	    "<nano>"  :  [["n","Nano","nano"], 1e-9, "prefix"],
	    "<pico>"  :  [["p","Pico","pico"], 1e-12, "prefix"],
	    "<femto>" :  [["f","Femto","femto"], 1e-15, "prefix"],
	    "<atto>"  :  [["a","Atto","atto"], 1e-18, "prefix"],
	    "<zepto>" :  [["z","Zepto","zepto"], 1e-21, "prefix"],
	    "<yocto>" :  [["y","Yocto","yocto"], 1e-24, "prefix"],
	
	    "<1>"     :  [["1", "<1>"], 1, ""],
	    /* length units */
	    "<meter>" :  [["m","meter","meters","metre","metres"], 1.0, "length", ["<meter>"] ],
	    "<inch>"  :  [["in","inch","inches","\""], 0.0254, "length", ["<meter>"]],
	    "<foot>"  :  [["ft","foot","feet","'"], 0.3048, "length", ["<meter>"]],
	    "<yard>"  :  [["yd","yard","yards"], 0.9144, "length", ["<meter>"]],
	    "<mile>"  :  [["mi","mile","miles"], 1609.344, "length", ["<meter>"]],
	    "<naut-mile>" : [["nmi"], 1852, "length", ["<meter>"]],
	    "<league>":  [["league","leagues"], 4828, "length", ["<meter>"]],
	    "<furlong>": [["furlong","furlongs"], 201.2, "length", ["<meter>"]],
	    "<rod>"   :  [["rd","rod","rods"], 5.029, "length", ["<meter>"]],
	    "<mil>"   :  [["mil","mils"], 0.0000254, "length", ["<meter>"]],
	    "<angstrom>"  :[["ang","angstrom","angstroms"], 1e-10, "length", ["<meter>"]],
	    "<fathom>" : [["fathom","fathoms"], 1.829, "length", ["<meter>"]],
	    "<pica>"  : [["pica","picas"], 0.00423333333, "length", ["<meter>"]],
	    "<point>" : [["pt","point","points"], 0.000352777778, "length", ["<meter>"]],
	    "<redshift>" : [["z","red-shift"], 1.302773e26, "length", ["<meter>"]],
	    "<AU>"    : [["AU","astronomical-unit"], 149597900000, "length", ["<meter>"]],
	    "<light-second>":[["ls","light-second"], 299792500, "length", ["<meter>"]],
	    "<light-minute>":[["lmin","light-minute"], 17987550000, "length", ["<meter>"]],
	    "<light-year>" : [["ly","light-year"], 9460528000000000, "length", ["<meter>"]],
	    "<parsec>"  : [["pc","parsec","parsecs"], 30856780000000000, "length", ["<meter>"]],
	
	    /* mass */
	    "<kilogram>" : [["kg","kilogram","kilograms"], 1.0, "mass", ["<kilogram>"]],
	    "<AMU>" : [["u","AMU","amu"], 6.0221415e26, "mass", ["<kilogram>"]],
	    "<dalton>" : [["Da","Dalton","Daltons","dalton","daltons"], 6.0221415e26, "mass", ["<kilogram>"]],
	    "<slug>" : [["slug","slugs"], 14.5939029, "mass", ["<kilogram>"]],
	    "<short-ton>" : [["tn","ton"], 907.18474, "mass", ["<kilogram>"]],
	    "<metric-ton>":[["tonne"], 1000, "mass", ["<kilogram>"]],
	    "<carat>" : [["ct","carat","carats"], 0.0002, "mass", ["<kilogram>"]],
	    "<pound>" : [["lbs","lb","pound","pounds","#"], 0.45359237, "mass", ["<kilogram>"]],
	    "<ounce>" : [["oz","ounce","ounces"], 0.0283495231, "mass", ["<kilogram>"]],
	    "<gram>"    :  [["g","gram","grams","gramme","grammes"], 1e-3, "mass", ["<kilogram>"]],
	    "<grain>" : [["grain","grains","gr"], 6.479891e-5, "mass", ["<kilogram>"]],
	    "<dram>"  : [["dram","drams","dr"], 0.0017718452, "mass",["<kilogram>"]],
	    "<stone>" : [["stone","stones","st"],6.35029318, "mass",["<kilogram>"]],
	
	    /* area */
	    "<hectare>":[["hectare"], 10000, "area", ["<meter>","<meter>"]],
	    "<acre>":[["acre","acres"], 4046.85642, "area", ["<meter>","<meter>"]],
	    "<sqft>":[["sqft"], 1, "area", ["<feet>","<feet>"]],
	
	    /* volume */
	    "<liter>" : [["l","L","liter","liters","litre","litres"], 0.001, "volume", ["<meter>","<meter>","<meter>"]],
	    "<gallon>":  [["gal","gallon","gallons"], 0.0037854118, "volume", ["<meter>","<meter>","<meter>"]],
	    "<quart>":  [["qt","quart","quarts"], 0.00094635295, "volume", ["<meter>","<meter>","<meter>"]],
	    "<pint>":  [["pt","pint","pints"], 0.000473176475, "volume", ["<meter>","<meter>","<meter>"]],
	    "<cup>":  [["cu","cup","cups"], 0.000236588238, "volume", ["<meter>","<meter>","<meter>"]],
	    "<fluid-ounce>":  [["floz","fluid-ounce","fluid-ounces"], 2.95735297e-5, "volume", ["<meter>","<meter>","<meter>"]],
	    "<tablespoon>":  [["tbs","tablespoon","tablespoons"], 1.47867648e-5, "volume", ["<meter>","<meter>","<meter>"]],
	    "<teaspoon>":  [["tsp","teaspoon","teaspoons"], 4.92892161e-6, "volume", ["<meter>","<meter>","<meter>"]],
	    "<bushel>":  [["bu","bsh","bushel","bushels"], 0.035239072, "volume", ["<meter>","<meter>","<meter>"]],
	
	    /* speed */
	    "<kph>" : [["kph"], 0.277777778, "speed", ["<meter>"], ["<second>"]],
	    "<mph>" : [["mph"], 0.44704, "speed", ["<meter>"], ["<second>"]],
	    "<knot>" : [["kt","kn","kts","knot","knots"], 0.514444444, "speed", ["<meter>"], ["<second>"]],
	    "<fps>"  : [["fps"], 0.3048, "speed", ["<meter>"], ["<second>"]],
	
	    /* acceleration */
	    "<gee>" : [["gee"], 9.80665, "acceleration", ["<meter>"], ["<second>","<second>"]],
	
	    /* temperature_difference */
	    "<kelvin>" : [["degK","kelvin"], 1.0, "temperature", ["<kelvin>"]],
	    "<celsius>" : [["degC","celsius","celsius","centigrade"], 1.0, "temperature", ["<kelvin>"]],
	    "<fahrenheit>" : [["degF","fahrenheit"], 5/9, "temperature", ["<kelvin>"]],
	    "<rankine>" : [["degR","rankine"], 5/9, "temperature", ["<kelvin>"]],
	    "<temp-K>"  : [["tempK"], 1.0, "temperature", ["<temp-K>"]],
	    "<temp-C>"  : [["tempC"], 1.0, "temperature", ["<temp-K>"]],
	    "<temp-F>"  : [["tempF"], 5/9, "temperature", ["<temp-K>"]],
	    "<temp-R>"  : [["tempR"], 5/9, "temperature", ["<temp-K>"]],
	
	    /* time */
	    "<second>":  [["s","sec","secs","second","seconds"], 1.0, "time", ["<second>"]],
	    "<minute>":  [["min","mins","minute","minutes"], 60.0, "time", ["<second>"]],
	    "<hour>":  [["h","hr","hrs","hour","hours"], 3600.0, "time", ["<second>"]],
	    "<day>":  [["d","day","days"], 3600*24, "time", ["<second>"]],
	    "<week>":  [["wk","week","weeks"], 7*3600*24, "time", ["<second>"]],
	    "<fortnight>": [["fortnight","fortnights"], 1209600, "time", ["<second>"]],
	    "<year>":  [["y","yr","year","years","annum"], 31556926, "time", ["<second>"]],
	    "<decade>":[["decade","decades"], 315569260, "time", ["<second>"]],
	    "<century>":[["century","centuries"], 3155692600, "time", ["<second>"]],
	
	    /* pressure */
	    "<pascal>" : [["Pa","pascal","Pascal"], 1.0, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<bar>" : [["bar","bars"], 100000, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<mmHg>" : [["mmHg"], 133.322368, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<inHg>" : [["inHg"], 3386.3881472, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<torr>" : [["torr"], 133.322368, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<atm>" : [["atm","ATM","atmosphere","atmospheres"], 101325, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<psi>" : [["psi"], 6894.76, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<cmh2o>" : [["cmH2O"], 98.0638, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	    "<inh2o>" : [["inH2O"], 249.082052, "pressure", ["<kilogram>"],["<meter>","<second>","<second>"]],
	
	    /* viscosity */
	    "<poise>"  : [["P","poise"], 0.1, "viscosity", ["<kilogram>"],["<meter>","<second>"] ],
	    "<stokes>" : [["St","stokes"], 1e-4, "viscosity", ["<meter>","<meter>"], ["<second>"]],
	
	    /* substance */
	    "<mole>"  :  [["mol","mole"], 1.0, "substance", ["<mole>"]],
	
	    /* concentration */
	    "<molar>" : [["M","molar"], 1000, "concentration", ["<mole>"], ["<meter>","<meter>","<meter>"]],
	    "<wtpercent>"  : [["wt%","wtpercent"], 10, "concentration", ["<kilogram>"], ["<meter>","<meter>","<meter>"]],
	
	    /* activity */
	    "<katal>" :  [["kat","katal","Katal"], 1.0, "activity", ["<mole>"], ["<second>"]],
	    "<unit>"  :  [["U","enzUnit"], 16.667e-16, "activity", ["<mole>"], ["<second>"]],
	
	    /* capacitance */
	    "<farad>" :  [["F","farad","Farad"], 1.0, "capacitance", ["<farad>"]],
	
	    /* charge */
	    "<coulomb>" :  [["C","coulomb","Coulomb"], 1.0, "charge", ["<ampere>","<second>"]],
	
	    /* current */
	    "<ampere>"  :  [["A","Ampere","ampere","amp","amps"], 1.0, "current", ["<ampere>"]],
	
	    /* conductance */
	    "<siemens>" : [["S","Siemens","siemens"], 1.0, "conductance", ["<second>","<second>","<second>","<ampere>","<ampere>"], ["<kilogram>","<meter>","<meter>"]],
	
	    /* inductance */
	    "<henry>" :  [["H","Henry","henry"], 1.0, "inductance", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<ampere>","<ampere>"]],
	
	    /* potential */
	    "<volt>"  :  [["V","Volt","volt","volts"], 1.0, "potential", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<second>","<ampere>"]],
	
	    /* resistance */
	    "<ohm>" :  [
	      ["Ohm","ohm","\u03A9"/*Ω as greek letter*/,"\u2126"/*Ω as ohm sign*/],
	      1.0,
	      "resistance",
	      ["<meter>","<meter>","<kilogram>"],["<second>","<second>","<second>","<ampere>","<ampere>"]
	    ],
	    /* magnetism */
	    "<weber>" : [["Wb","weber","webers"], 1.0, "magnetism", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<ampere>"]],
	    "<tesla>"  : [["T","tesla","teslas"], 1.0, "magnetism", ["<kilogram>"], ["<second>","<second>","<ampere>"]],
	    "<gauss>" : [["G","gauss"], 1e-4, "magnetism",  ["<kilogram>"], ["<second>","<second>","<ampere>"]],
	    "<maxwell>" : [["Mx","maxwell","maxwells"], 1e-8, "magnetism", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>","<ampere>"]],
	    "<oersted>"  : [["Oe","oersted","oersteds"], 250.0/Math.PI, "magnetism", ["<ampere>"], ["<meter>"]],
	
	    /* energy */
	    "<joule>" :  [["J","joule","Joule","joules"], 1.0, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
	    "<erg>"   :  [["erg","ergs"], 1e-7, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
	    "<btu>"   :  [["BTU","btu","BTUs"], 1055.056, "energy", ["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
	    "<calorie>" :  [["cal","calorie","calories"], 4.18400, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
	    "<Calorie>" :  [["Cal","Calorie","Calories"], 4184.00, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
	    "<therm-US>" : [["th","therm","therms","Therm"], 105480400, "energy",["<meter>","<meter>","<kilogram>"], ["<second>","<second>"]],
	
	    /* force */
	    "<newton>"  : [["N","Newton","newton"], 1.0, "force", ["<kilogram>","<meter>"], ["<second>","<second>"]],
	    "<dyne>"  : [["dyn","dyne"], 1e-5, "force", ["<kilogram>","<meter>"], ["<second>","<second>"]],
	    "<pound-force>"  : [["lbf","pound-force"], 4.448222, "force", ["<kilogram>","<meter>"], ["<second>","<second>"]],
	
	    /* frequency */
	    "<hertz>" : [["Hz","hertz","Hertz"], 1.0, "frequency", ["<1>"], ["<second>"]],
	
	    /* angle */
	    "<radian>" :[["rad","radian","radians"], 1.0, "angle", ["<radian>"]],
	    "<degree>" :[["deg","degree","degrees"], Math.PI / 180.0, "angle", ["<radian>"]],
	    "<gradian>"   :[["gon","grad","gradian","grads"], Math.PI / 200.0, "angle", ["<radian>"]],
	    "<steradian>"  : [["sr","steradian","steradians"], 1.0, "solid_angle", ["<steradian>"]],
	
	    /* rotation */
	    "<rotation>" : [["rotation"], 2.0*Math.PI, "angle", ["<radian>"]],
	    "<rpm>"   :[["rpm"], 2.0*Math.PI / 60.0, "angular_velocity", ["<radian>"], ["<second>"]],
	
	    /* memory */
	    "<byte>"  :[["B","byte"], 1.0, "memory", ["<byte>"]],
	    "<bit>"  :[["b","bit"], 0.125, "memory", ["<byte>"]],
	
	    /* currency */
	    "<dollar>":[["USD","dollar"], 1.0, "currency", ["<dollar>"]],
	    "<cents>" :[["cents"], 0.01, "currency", ["<dollar>"]],
	
	    /* luminosity */
	    "<candela>" : [["cd","candela"], 1.0, "luminosity", ["<candela>"]],
	    "<lumen>" : [["lm","lumen"], 1.0, "luminous_power", ["<candela>","<steradian>"]],
	    "<lux>" :[["lux"], 1.0, "illuminance", ["<candela>","<steradian>"], ["<meter>","<meter>"]],
	
	    /* power */
	    "<watt>"  : [["W","watt","watts"], 1.0, "power", ["<kilogram>","<meter>","<meter>"], ["<second>","<second>","<second>"]],
	    "<horsepower>"  :  [["hp","horsepower"], 745.699872, "power", ["<kilogram>","<meter>","<meter>"], ["<second>","<second>","<second>"]],
	
	    /* radiation */
	    "<gray>" : [["Gy","gray","grays"], 1.0, "radiation", ["<meter>","<meter>"], ["<second>","<second>"]],
	    "<roentgen>" : [["R","roentgen"], 0.009330, "radiation", ["<meter>","<meter>"], ["<second>","<second>"]],
	    "<sievert>" : [["Sv","sievert","sieverts"], 1.0, "radiation", ["<meter>","<meter>"], ["<second>","<second>"]],
	    "<becquerel>" : [["Bq","bequerel","bequerels"], 1.0, "radiation", ["<1>"],["<second>"]],
	    "<curie>" : [["Ci","curie","curies"], 3.7e10, "radiation", ["<1>"],["<second>"]],
	
	    /* rate */
	    "<cpm>" : [["cpm"], 1.0/60.0, "rate", ["<count>"],["<second>"]],
	    "<dpm>" : [["dpm"], 1.0/60.0, "rate", ["<count>"],["<second>"]],
	    "<bpm>" : [["bpm"], 1.0/60.0, "rate", ["<count>"],["<second>"]],
	
	    /* resolution / typography */
	    "<dot>" : [["dot","dots"], 1, "resolution", ["<each>"]],
	    "<pixel>" : [["pixel","px"], 1, "resolution", ["<each>"]],
	    "<ppi>" : [["ppi"], 1, "resolution", ["<pixel>"], ["<inch>"]],
	    "<dpi>" : [["dpi"], 1, "typography", ["<dot>"], ["<inch>"]],
	
	    /* other */
	    "<cell>" : [["cells","cell"], 1, "counting", ["<each>"]],
	    "<each>" : [["each"], 1.0, "counting", ["<each>"]],
	    "<count>" : [["count"], 1.0, "counting", ["<each>"]],
	    "<base-pair>"  : [["bp"], 1.0, "counting", ["<each>"]],
	    "<nucleotide>" : [["nt"], 1.0, "counting", ["<each>"]],
	    "<molecule>" : [["molecule","molecules"], 1.0, "counting", ["<1>"]],
	    "<dozen>" :  [["doz","dz","dozen"],12.0,"prefix_only", ["<each>"]],
	    "<percent>": [["%","percent"], 0.01, "prefix_only", ["<1>"]],
	    "<ppm>" :  [["ppm"],1e-6, "prefix_only", ["<1>"]],
	    "<ppt>" :  [["ppt"],1e-9, "prefix_only", ["<1>"]],
	    "<gross>" :  [["gr","gross"],144.0, "prefix_only", ["<dozen>","<dozen>"]],
	    "<decibel>"  : [["dB","decibel","decibels"], 1.0, "logarithmic", ["<decibel>"]]
	  };
	
	
	  var BASE_UNITS = ["<meter>","<kilogram>","<second>","<mole>", "<farad>", "<ampere>","<radian>","<kelvin>","<temp-K>","<byte>","<dollar>","<candela>","<each>","<steradian>","<decibel>"];
	  var UNITY = "<1>";
	  var UNITY_ARRAY= [UNITY];
	  var SIGN = "[+-]";
	  var INTEGER = "\\d+";
	  var SIGNED_INTEGER = SIGN + "?" + INTEGER;
	  var FRACTION = "\\." + INTEGER;
	  var FLOAT = "(?:" + INTEGER + "(?:" + FRACTION + ")?" + ")" +
	              "|" +
	              "(?:" + FRACTION + ")";
	  var EXPONENT = "[Ee]" + SIGNED_INTEGER;
	  var SCI_NUMBER = "(?:" + FLOAT + ")(?:" + EXPONENT + ")?";
	  var SIGNED_NUMBER = SIGN + "?\\s*" + SCI_NUMBER;
	  var QTY_STRING = "(" + SIGNED_NUMBER + ")?" + "\\s*([^/]*)(?:\/(.+))?";
	  var QTY_STRING_REGEX = new RegExp("^" + QTY_STRING + "$");
	  var POWER_OP = "\\^|\\*{2}";
	  var TOP_REGEX = new RegExp ("([^ \\*]+?)(?:" + POWER_OP + ")?(-?\\d+)");
	  var BOTTOM_REGEX = new RegExp("([^ \\*]+?)(?:" + POWER_OP + ")?(\\d+)");
	
	  var SIGNATURE_VECTOR = ["length", "time", "temperature", "mass", "current", "substance", "luminosity", "currency", "memory", "angle", "capacitance"];
	  var KINDS = {
	    "-312058": "resistance",
	    "-312038": "inductance",
	    "-152040": "magnetism",
	    "-152038": "magnetism",
	    "-152058": "potential",
	    "-39": "acceleration",
	    "-38": "radiation",
	    "-20": "frequency",
	    "-19": "speed",
	    "-18": "viscosity",
	    "0": "unitless",
	    "1": "length",
	    "2": "area",
	    "3": "volume",
	    "20": "time",
	    "400": "temperature",
	    "7942": "power",
	    "7959": "pressure",
	    "7962": "energy",
	    "7979": "viscosity",
	    "7961": "force",
	    "7997": "mass_concentration",
	    "8000": "mass",
	    "159999": "magnetism",
	    "160000": "current",
	    "160020": "charge",
	    "312058": "conductance",
	    "3199980": "activity",
	    "3199997": "molar_concentration",
	    "3200000": "substance",
	    "63999998": "illuminance",
	    "64000000": "luminous_power",
	    "1280000000": "currency",
	    "25600000000": "memory",
	    "511999999980": "angular_velocity",
	    "512000000000": "angle",
	    "10240000000000": "capacitance"
	  };
	
	  var baseUnitCache = {};
	
	  function Qty(initValue) {
	    assertValidInitializationValueType(initValue);
	
	    if(!(isQty(this))) {
	      return new Qty(initValue);
	    }
	
	    this.scalar = null;
	    this.baseScalar = null;
	    this.signature = null;
	    this._conversionCache = {};
	    this.numerator = UNITY_ARRAY;
	    this.denominator = UNITY_ARRAY;
	
	    if (isDefinitionObject(initValue)) {
	      this.scalar = initValue.scalar;
	      this.numerator = (initValue.numerator && initValue.numerator.length !== 0)? initValue.numerator : UNITY_ARRAY;
	      this.denominator = (initValue.denominator && initValue.denominator.length !== 0)? initValue.denominator : UNITY_ARRAY;
	    }
	    else {
	      parse.call(this, initValue);
	    }
	
	    // math with temperatures is very limited
	    if(this.denominator.join("*").indexOf("temp") >= 0) {
	      throw new QtyError("Cannot divide with temperatures");
	    }
	    if(this.numerator.join("*").indexOf("temp") >= 0) {
	      if(this.numerator.length > 1) {
	        throw new QtyError("Cannot multiply by temperatures");
	      }
	      if(!compareArray(this.denominator, UNITY_ARRAY)) {
	        throw new QtyError("Cannot divide with temperatures");
	      }
	    }
	
	    this.initValue = initValue;
	    updateBaseScalar.call(this);
	
	    if(this.isTemperature() && this.baseScalar < 0) {
	      throw new QtyError("Temperatures must not be less than absolute zero");
	    }
	  }
	
	  /**
	   * Parses a string as a quantity
	   * @param {string} value - quantity as text
	   * @throws if value is not a string
	   * @returns {Qty|null} Parsed quantity or null if unrecognized
	   */
	  Qty.parse = function parse(value) {
	    if(!isString(value)) {
	      throw new QtyError("Argument should be a string");
	    }
	
	    try {
	      return Qty(value);
	    }
	    catch(e) {
	      return null;
	    }
	  };
	
	  /**
	   * Configures and returns a fast function to convert
	   * Number values from units to others.
	   * Useful to efficiently convert large array of values
	   * with same units into others with iterative methods.
	   * Does not take care of rounding issues.
	   *
	   * @param {string} srcUnits Units of values to convert
	   * @param {string} dstUnits Units to convert to
	   *
	   * @returns {Function} Converting function accepting Number value
	   *   and returning converted value
	   *
	   * @throws "Incompatible units" if units are incompatible
	   *
	   * @example
	   * // Converting large array of numbers with the same units
	   * // into other units
	   * var converter = Qty.swiftConverter("m/h", "ft/s");
	   * var convertedSerie = largeSerie.map(converter);
	   *
	   */
	  Qty.swiftConverter = function swiftConverter(srcUnits, dstUnits) {
	    var srcQty = Qty(srcUnits);
	    var dstQty = Qty(dstUnits);
	
	    if(srcQty.eq(dstQty)) {
	      return identity;
	    }
	
	    var convert;
	    if(!srcQty.isTemperature()) {
	      convert = function(value) {
	        return value * srcQty.baseScalar / dstQty.baseScalar;
	      };
	    }
	    else {
	      convert = function(value) {
	        // TODO Not optimized
	        return srcQty.mul(value).to(dstQty).scalar;
	      };
	    }
	
	    return function converter(value) {
	      var i,
	          length,
	          result;
	      if(!Array.isArray(value)) {
	        return convert(value);
	      }
	      else {
	        length = value.length;
	        result = [];
	        for(i = 0; i < length; i++) {
	          result.push(convert(value[i]));
	        }
	        return result;
	      }
	    };
	  };
	
	  /**
	   * Returns the list of available well-known kinds of units, e.g.
	   * "radiation" or "length".
	   *
	   * @returns {string[]} names of kinds of units
	   */
	  Qty.getKinds = function() {
	    var knownKinds = Object.keys(KINDS).map(function(knownSignature) {
	      return KINDS[knownSignature];
	    }).sort();
	    return knownKinds;
	  };
	
	  /**
	   * Default formatter
	   *
	   * @param {number} scalar
	   * @param {string} units
	   *
	   * @returns {string} formatted result
	   */
	  function defaultFormatter(scalar, units) {
	    return (scalar + " " + units).trim();
	  }
	
	  /**
	   *
	   * Configurable Qty default formatter
	   *
	   * @type {function}
	   *
	   * @param {number} scalar
	   * @param {string} units
	   *
	   * @returns {string} formatted result
	   */
	  Qty.formatter = defaultFormatter;
	
	  var updateBaseScalar = function () {
	    if(this.baseScalar) {
	      return this.baseScalar;
	    }
	    if(this.isBase()) {
	      this.baseScalar = this.scalar;
	      this.signature = unitSignature.call(this);
	    }
	    else {
	      var base = this.toBase();
	      this.baseScalar = base.scalar;
	      this.signature = base.signature;
	    }
	  };
	
	  /*
	  calculates the unit signature id for use in comparing compatible units and simplification
	  the signature is based on a simple classification of units and is based on the following publication
	
	  Novak, G.S., Jr. "Conversion of units of measurement", IEEE Transactions on Software Engineering,
	  21(8), Aug 1995, pp.651-661
	  doi://10.1109/32.403789
	  http://ieeexplore.ieee.org/Xplore/login.jsp?url=/iel1/32/9079/00403789.pdf?isnumber=9079&prod=JNL&arnumber=403789&arSt=651&ared=661&arAuthor=Novak%2C+G.S.%2C+Jr.
	  */
	  var unitSignature = function () {
	    if(this.signature) {
	      return this.signature;
	    }
	    var vector = unitSignatureVector.call(this);
	    for(var i = 0; i < vector.length; i++) {
	      vector[i] *= Math.pow(20, i);
	    }
	
	    return vector.reduce(function(previous, current) {return previous + current;}, 0);
	  };
	
	  // calculates the unit signature vector used by unit_signature
	  var unitSignatureVector = function () {
	    if(!this.isBase()) {
	      return unitSignatureVector.call(this.toBase());
	    }
	
	    var vector = new Array(SIGNATURE_VECTOR.length);
	    for(var i = 0; i < vector.length; i++) {
	      vector[i] = 0;
	    }
	    var r, n;
	    for(var j = 0; j < this.numerator.length; j++) {
	      if((r = UNITS[this.numerator[j]])) {
	        n = SIGNATURE_VECTOR.indexOf(r[2]);
	        if(n >= 0) {
	          vector[n] = vector[n] + 1;
	        }
	      }
	    }
	
	    for(var k = 0; k < this.denominator.length; k++) {
	      if((r = UNITS[this.denominator[k]])) {
	        n = SIGNATURE_VECTOR.indexOf(r[2]);
	        if(n >= 0) {
	          vector[n] = vector[n] - 1;
	        }
	      }
	    }
	    return vector;
	  };
	
	  /* parse a string into a unit object.
	   * Typical formats like :
	   * "5.6 kg*m/s^2"
	   * "5.6 kg*m*s^-2"
	   * "5.6 kilogram*meter*second^-2"
	   * "2.2 kPa"
	   * "37 degC"
	   * "1"  -- creates a unitless constant with value 1
	   * "GPa"  -- creates a unit with scalar 1 with units 'GPa'
	   * 6'4"  -- recognized as 6 feet + 4 inches
	   * 8 lbs 8 oz -- recognized as 8 lbs + 8 ounces
	   */
	  var parse = function (val) {
	    if (!isString(val)) {
	      val = val.toString();
	    }
	    val = val.trim();
	    if (val.length === 0) {
	      throw new QtyError("Unit not recognized");
	    }
	
	    var result = QTY_STRING_REGEX.exec(val);
	    if(!result) {
	      throw new QtyError(val + ": Quantity not recognized");
	    }
	
	    var scalarMatch = result[1];
	    if(scalarMatch) {
	      // Allow whitespaces between sign and scalar for loose parsing
	      scalarMatch = scalarMatch.replace(/\s/g, "");
	      this.scalar = parseFloat(scalarMatch);
	    }
	    else {
	      this.scalar = 1;
	    }
	    var top = result[2];
	    var bottom = result[3];
	
	    var n, x, nx;
	    // TODO DRY me
	    while((result = TOP_REGEX.exec(top))) {
	      n = parseFloat(result[2]);
	      if(isNaN(n)) {
	        // Prevents infinite loops
	        throw new QtyError("Unit exponent is not a number");
	      }
	      // Disallow unrecognized unit even if exponent is 0
	      if(n === 0 && !UNIT_TEST_REGEX.test(result[1])) {
	        throw new QtyError("Unit not recognized");
	      }
	      x = result[1] + " ";
	      nx = "";
	      for(var i = 0; i < Math.abs(n) ; i++) {
	        nx += x;
	      }
	      if(n >= 0) {
	        top = top.replace(result[0], nx);
	      }
	      else {
	        bottom = bottom ? bottom + nx : nx;
	        top = top.replace(result[0], "");
	      }
	    }
	
	    while((result = BOTTOM_REGEX.exec(bottom))) {
	      n = parseFloat(result[2]);
	      if(isNaN(n)) {
	        // Prevents infinite loops
	        throw new QtyError("Unit exponent is not a number");
	      }
	      // Disallow unrecognized unit even if exponent is 0
	      if(n === 0 && !UNIT_TEST_REGEX.test(result[1])) {
	        throw new QtyError("Unit not recognized");
	      }
	      x = result[1] + " ";
	      nx = "";
	      for(var j = 0; j < n ; j++) {
	        nx += x;
	      }
	
	      bottom = bottom.replace(result[0], nx, "g");
	    }
	
	    if(top) {
	      this.numerator = parseUnits(top.trim());
	    }
	    if(bottom) {
	      this.denominator = parseUnits(bottom.trim());
	    }
	
	  };
	
	  /*
	   * Throws incompatible units error
	   *
	   * @throws "Incompatible units" error
	   */
	  function throwIncompatibleUnits() {
	    throw new QtyError("Incompatible units");
	  }
	
	  Qty.prototype = {
	
	    // Properly set up constructor
	    constructor: Qty,
	
	    // Converts the unit back to a float if it is unitless.  Otherwise raises an exception
	    toFloat: function() {
	      if(this.isUnitless()) {
	        return this.scalar;
	      }
	      throw new QtyError("Can't convert to Float unless unitless.  Use Unit#scalar");
	    },
	
	    // returns true if no associated units
	    // false, even if the units are "unitless" like 'radians, each, etc'
	    isUnitless: function() {
	      return compareArray(this.numerator, UNITY_ARRAY) && compareArray(this.denominator, UNITY_ARRAY);
	    },
	
	    /*
	    check to see if units are compatible, but not the scalar part
	    this check is done by comparing signatures for performance reasons
	    if passed a string, it will create a unit object with the string and then do the comparison
	    this permits a syntax like:
	    unit =~ "mm"
	    if you want to do a regexp on the unit string do this ...
	    unit.units =~ /regexp/
	    */
	    isCompatible: function(other) {
	      if(isString(other)) {
	        return this.isCompatible(Qty(other));
	      }
	
	      if(!(isQty(other))) {
	        return false;
	      }
	
	      if(other.signature !== undefined) {
	        return this.signature === other.signature;
	      }
	      else {
	        return false;
	      }
	    },
	
	    /*
	    check to see if units are inverse of each other, but not the scalar part
	    this check is done by comparing signatures for performance reasons
	    if passed a string, it will create a unit object with the string and then do the comparison
	    this permits a syntax like:
	    unit =~ "mm"
	    if you want to do a regexp on the unit string do this ...
	    unit.units =~ /regexp/
	    */
	    isInverse: function(other) {
	      return this.inverse().isCompatible(other);
	    },
	
	    kind: function() {
	      return KINDS[this.signature.toString()];
	    },
	
	    // Returns 'true' if the Unit is represented in base units
	    isBase: function() {
	      if(this._isBase !== undefined) {
	        return this._isBase;
	      }
	      if(this.isDegrees() && this.numerator[0].match(/<(kelvin|temp-K)>/)) {
	        this._isBase = true;
	        return this._isBase;
	      }
	
	      this.numerator.concat(this.denominator).forEach(function(item) {
	        if(item !== UNITY && BASE_UNITS.indexOf(item) === -1 ) {
	          this._isBase = false;
	        }
	      }, this);
	      if(this._isBase === false) {
	        return this._isBase;
	      }
	      this._isBase = true;
	      return this._isBase;
	    },
	
	    // convert to base SI units
	    // results of the conversion are cached so subsequent calls to this will be fast
	    toBase: function() {
	      if(this.isBase()) {
	        return this;
	      }
	
	      if(this.isTemperature()) {
	        return toTempK(this);
	      }
	
	      var cached = baseUnitCache[this.units()];
	      if(!cached) {
	        cached = toBaseUnits(this.numerator,this.denominator);
	        baseUnitCache[this.units()] = cached;
	      }
	      return cached.mul(this.scalar);
	    },
	
	    // returns the 'unit' part of the Unit object without the scalar
	    units: function() {
	      if(this._units !== undefined) {
	        return this._units;
	      }
	
	      var numIsUnity = compareArray(this.numerator, UNITY_ARRAY),
	          denIsUnity = compareArray(this.denominator, UNITY_ARRAY);
	      if(numIsUnity && denIsUnity) {
	        this._units = "";
	        return this._units;
	      }
	
	      var numUnits = stringifyUnits(this.numerator),
	          denUnits = stringifyUnits(this.denominator);
	      this._units = numUnits + (denIsUnity ? "":("/" + denUnits));
	      return this._units;
	    },
	
	    eq: function(other) {
	      return this.compareTo(other) === 0;
	    },
	    lt: function(other) {
	      return this.compareTo(other) === -1;
	    },
	    lte: function(other) {
	      return this.eq(other) || this.lt(other);
	    },
	    gt: function(other) {
	      return this.compareTo(other) === 1;
	    },
	    gte: function(other) {
	      return this.eq(other) || this.gt(other);
	    },
	
	    /**
	     * Returns the nearest multiple of quantity passed as
	     * precision
	     *
	     * @param {(Qty|string|number)} prec-quantity - Quantity, string formated
	     *   quantity or number as expected precision
	     *
	     * @returns {Qty} Nearest multiple of precQuantity
	     *
	     * @example
	     * Qty('5.5 ft').toPrec('2 ft'); // returns 6 ft
	     * Qty('0.8 cu').toPrec('0.25 cu'); // returns 0.75 cu
	     * Qty('6.3782 m').toPrec('cm'); // returns 6.38 m
	     * Qty('1.146 MPa').toPrec('0.1 bar'); // returns 1.15 MPa
	     *
	     */
	    toPrec: function(precQuantity) {
	      if(isString(precQuantity)) {
	        precQuantity = Qty(precQuantity);
	      }
	      if(isNumber(precQuantity)) {
	        precQuantity = Qty(precQuantity + " " + this.units());
	      }
	
	      if(!this.isUnitless()) {
	        precQuantity = precQuantity.to(this.units());
	      }
	      else if(!precQuantity.isUnitless()) {
	        throwIncompatibleUnits();
	      }
	
	      if(precQuantity.scalar === 0) {
	        throw new QtyError("Divide by zero");
	      }
	
	      var precRoundedResult = mulSafe(Math.round(this.scalar/precQuantity.scalar),
	                                         precQuantity.scalar);
	
	      return Qty(precRoundedResult + this.units());
	    },
	
	    /**
	     * Stringifies the quantity
	     * Deprecation notice: only units parameter is supported.
	     *
	     * @param {(number|string|Qty)} targetUnitsOrMaxDecimalsOrPrec -
	     *                              target units if string,
	     *                              max number of decimals if number,
	     *                              passed to #toPrec before converting if Qty
	     *
	     * @param {number=} maxDecimals - Maximum number of decimals of
	     *                                formatted output
	     *
	     * @returns {string} reparseable quantity as string
	     */
	    toString: function(targetUnitsOrMaxDecimalsOrPrec, maxDecimals) {
	      var targetUnits;
	      if(isNumber(targetUnitsOrMaxDecimalsOrPrec)) {
	        targetUnits = this.units();
	        maxDecimals = targetUnitsOrMaxDecimalsOrPrec;
	      }
	      else if(isString(targetUnitsOrMaxDecimalsOrPrec)) {
	        targetUnits = targetUnitsOrMaxDecimalsOrPrec;
	      }
	      else if(isQty(targetUnitsOrMaxDecimalsOrPrec)) {
	        return this.toPrec(targetUnitsOrMaxDecimalsOrPrec).toString(maxDecimals);
	      }
	
	      var out = this.to(targetUnits);
	
	      var outScalar = maxDecimals !== undefined ? round(out.scalar, maxDecimals) : out.scalar;
	      out = (outScalar + " " + out.units()).trim();
	      return out;
	    },
	
	    /**
	     * Format the quantity according to optional passed target units
	     * and formatter
	     *
	     * @param {string} [targetUnits=current units] -
	     *                 optional units to convert to before formatting
	     *
	     * @param {function} [formatter=Qty.formatter] -
	     *                   delegates formatting to formatter callback.
	     *                   formatter is called back with two parameters (scalar, units)
	     *                   and should return formatted result.
	     *                   If unspecified, formatting is delegated to default formatter
	     *                   set to Qty.formatter
	     *
	     * @example
	     * var roundingAndLocalizingFormatter = function(scalar, units) {
	     *   // localize or limit scalar to n max decimals for instance
	     *   // return formatted result
	     * };
	     * var qty = Qty('1.1234 m');
	     * qty.format(); // same units, default formatter => "1.234 m"
	     * qty.format("cm"); // converted to "cm", default formatter => "123.45 cm"
	     * qty.format(roundingAndLocalizingFormatter); // same units, custom formatter => "1,2 m"
	     * qty.format("cm", roundingAndLocalizingFormatter); // convert to "cm", custom formatter => "123,4 cm"
	     *
	     * @returns {string} quantity as string
	     */
	    format: function(targetUnits, formatter) {
	      if(arguments.length === 1) {
	        if(typeof targetUnits === "function") {
	          formatter = targetUnits;
	          targetUnits = undefined;
	        }
	      }
	
	      formatter = formatter || Qty.formatter;
	      var targetQty = this.to(targetUnits);
	      return formatter.call(this, targetQty.scalar, targetQty.units());
	    },
	
	    // Compare two Qty objects. Throws an exception if they are not of compatible types.
	    // Comparisons are done based on the value of the quantity in base SI units.
	    //
	    // NOTE: We cannot compare inverses as that breaks the general compareTo contract:
	    //   if a.compareTo(b) < 0 then b.compareTo(a) > 0
	    //   if a.compareTo(b) == 0 then b.compareTo(a) == 0
	    //
	    //   Since "10S" == ".1ohm" (10 > .1) and "10ohm" == ".1S" (10 > .1)
	    //     Qty("10S").inverse().compareTo("10ohm") == -1
	    //     Qty("10ohm").inverse().compareTo("10S") == -1
	    //
	    //   If including inverses in the sort is needed, I suggest writing: Qty.sort(qtyArray,units)
	    compareTo: function(other) {
	      if(isString(other)) {
	        return this.compareTo(Qty(other));
	      }
	      if(!this.isCompatible(other)) {
	        throwIncompatibleUnits();
	      }
	      if(this.baseScalar < other.baseScalar) {
	        return -1;
	      }
	      else if(this.baseScalar === other.baseScalar) {
	        return 0;
	      }
	      else if(this.baseScalar > other.baseScalar) {
	        return 1;
	      }
	    },
	
	    // Return true if quantities and units match
	    // Unit("100 cm").same(Unit("100 cm"))  # => true
	    // Unit("100 cm").same(Unit("1 m"))     # => false
	    same: function(other) {
	      return (this.scalar === other.scalar) && (this.units() === other.units());
	    },
	
	    // Returns a Qty that is the inverse of this Qty,
	    inverse: function() {
	      if(this.isTemperature()) {
	        throw new QtyError("Cannot divide with temperatures");
	      }
	      if(this.scalar === 0) {
	        throw new QtyError("Divide by zero");
	      }
	      return Qty({"scalar": 1/this.scalar, "numerator": this.denominator, "denominator": this.numerator});
	    },
	
	    isDegrees: function() {
	      // signature may not have been calculated yet
	      return (this.signature === null || this.signature === 400) &&
	        this.numerator.length === 1 &&
	        compareArray(this.denominator, UNITY_ARRAY) &&
	        (this.numerator[0].match(/<temp-[CFRK]>/) || this.numerator[0].match(/<(kelvin|celsius|rankine|fahrenheit)>/));
	    },
	
	    isTemperature: function() {
	      return this.isDegrees() && this.numerator[0].match(/<temp-[CFRK]>/);
	    },
	
	    /**
	     * Converts to other compatible units.
	     * Instance's converted quantities are cached for faster subsequent calls.
	     *
	     * @param {(string|Qty)} other - Target units as string or retrieved from
	     *                               other Qty instance (scalar is ignored)
	     *
	     * @returns {Qty} New converted Qty instance with target units
	     *
	     * @throws {QtyError} if target units are incompatible
	     *
	     * @example
	     * var weight = Qty("25 kg");
	     * weight.to("lb"); // => Qty("55.11556554621939 lbs");
	     * weight.to(Qty("3 g")); // => Qty("25000 g"); // scalar of passed Qty is ignored
	     */
	    to: function(other) {
	      var cached, target;
	
	      if(!other) {
	        return this;
	      }
	
	      if(!isString(other)) {
	        return this.to(other.units());
	      }
	
	      cached = this._conversionCache[other];
	      if(cached) {
	        return cached;
	      }
	
	      // Instantiating target to normalize units
	      target = Qty(other);
	      if(target.units() === this.units()) {
	        return this;
	      }
	
	      if(!this.isCompatible(target)) {
	        if(this.isInverse(target)) {
	          target = this.inverse().to(other);
	        }
	        else {
	          throwIncompatibleUnits();
	        }
	      }
	      else {
	        if(target.isTemperature()) {
	          target = toTemp(this,target);
	        }
	        else if(target.isDegrees()) {
	          target = toDegrees(this,target);
	        }
	        else {
	          var q = divSafe(this.baseScalar, target.baseScalar);
	          target = Qty({"scalar": q, "numerator": target.numerator, "denominator": target.denominator});
	        }
	      }
	
	      this._conversionCache[other] = target;
	      return target;
	    },
	
	    // Quantity operators
	    // Returns new instance with this units
	    add: function(other) {
	      if(isString(other)) {
	        other = Qty(other);
	      }
	
	      if(!this.isCompatible(other)) {
	        throwIncompatibleUnits();
	      }
	
	      if(this.isTemperature() && other.isTemperature()) {
	        throw new QtyError("Cannot add two temperatures");
	      }
	      else if(this.isTemperature()) {
	        return addTempDegrees(this,other);
	      }
	      else if(other.isTemperature()) {
	        return addTempDegrees(other,this);
	      }
	
	      return Qty({"scalar": this.scalar + other.to(this).scalar, "numerator": this.numerator, "denominator": this.denominator});
	    },
	
	    sub: function(other) {
	      if(isString(other)) {
	        other = Qty(other);
	      }
	
	      if(!this.isCompatible(other)) {
	        throwIncompatibleUnits();
	      }
	
	      if(this.isTemperature() && other.isTemperature()) {
	        return subtractTemperatures(this,other);
	      }
	      else if(this.isTemperature()) {
	        return subtractTempDegrees(this,other);
	      }
	      else if(other.isTemperature()) {
	        throw new QtyError("Cannot subtract a temperature from a differential degree unit");
	      }
	
	      return Qty({"scalar": this.scalar - other.to(this).scalar, "numerator": this.numerator, "denominator": this.denominator});
	    },
	
	    mul: function(other) {
	      if(isNumber(other)) {
	        return Qty({"scalar": mulSafe(this.scalar, other), "numerator": this.numerator, "denominator": this.denominator});
	      }
	      else if(isString(other)) {
	        other = Qty(other);
	      }
	
	      if((this.isTemperature()||other.isTemperature()) && !(this.isUnitless()||other.isUnitless())) {
	        throw new QtyError("Cannot multiply by temperatures");
	      }
	
	      // Quantities should be multiplied with same units if compatible, with base units else
	      var op1 = this;
	      var op2 = other;
	
	      // so as not to confuse results, multiplication and division between temperature degrees will maintain original unit info in num/den
	      // multiplication and division between deg[CFRK] can never factor each other out, only themselves: "degK*degC/degC^2" == "degK/degC"
	      if(op1.isCompatible(op2) && op1.signature !== 400) {
	        op2 = op2.to(op1);
	      }
	      var numden = cleanTerms(op1.numerator.concat(op2.numerator), op1.denominator.concat(op2.denominator));
	
	      return Qty({"scalar": mulSafe(op1.scalar, op2.scalar) , "numerator": numden[0], "denominator": numden[1]});
	    },
	
	    div: function(other) {
	      if(isNumber(other)) {
	        if(other === 0) {
	          throw new QtyError("Divide by zero");
	        }
	        return Qty({"scalar": this.scalar / other, "numerator": this.numerator, "denominator": this.denominator});
	      }
	      else if(isString(other)) {
	        other = Qty(other);
	      }
	
	      if(other.scalar === 0) {
	        throw new QtyError("Divide by zero");
	      }
	
	      if(other.isTemperature()) {
	        throw new QtyError("Cannot divide with temperatures");
	      }
	      else if(this.isTemperature() && !other.isUnitless()) {
	        throw new QtyError("Cannot divide with temperatures");
	      }
	
	      // Quantities should be multiplied with same units if compatible, with base units else
	      var op1 = this;
	      var op2 = other;
	
	      // so as not to confuse results, multiplication and division between temperature degrees will maintain original unit info in num/den
	      // multiplication and division between deg[CFRK] can never factor each other out, only themselves: "degK*degC/degC^2" == "degK/degC"
	      if(op1.isCompatible(op2) && op1.signature !== 400) {
	        op2 = op2.to(op1);
	      }
	      var numden = cleanTerms(op1.numerator.concat(op2.denominator), op1.denominator.concat(op2.numerator));
	
	      return Qty({"scalar": op1.scalar / op2.scalar, "numerator": numden[0], "denominator": numden[1]});
	    }
	
	  };
	
	  function toBaseUnits (numerator,denominator) {
	    var num = [];
	    var den = [];
	    var q = 1;
	    var unit;
	    for(var i = 0; i < numerator.length; i++) {
	      unit = numerator[i];
	      if(PREFIX_VALUES[unit]) {
	        // workaround to fix
	        // 0.1 * 0.1 => 0.010000000000000002
	        q = mulSafe(q, PREFIX_VALUES[unit]);
	      }
	      else {
	        if(UNIT_VALUES[unit]) {
	          q *= UNIT_VALUES[unit].scalar;
	
	          if(UNIT_VALUES[unit].numerator) {
	            num.push(UNIT_VALUES[unit].numerator);
	          }
	          if(UNIT_VALUES[unit].denominator) {
	            den.push(UNIT_VALUES[unit].denominator);
	          }
	        }
	      }
	    }
	    for(var j = 0; j < denominator.length; j++) {
	      unit = denominator[j];
	      if(PREFIX_VALUES[unit]) {
	        q /= PREFIX_VALUES[unit];
	      }
	      else {
	        if(UNIT_VALUES[unit]) {
	          q /= UNIT_VALUES[unit].scalar;
	
	          if(UNIT_VALUES[unit].numerator) {
	            den.push(UNIT_VALUES[unit].numerator);
	          }
	          if(UNIT_VALUES[unit].denominator) {
	            num.push(UNIT_VALUES[unit].denominator);
	          }
	        }
	      }
	    }
	
	    // Flatten
	    num = num.reduce(function(a,b) {
	      return a.concat(b);
	    }, []);
	    den = den.reduce(function(a,b) {
	      return a.concat(b);
	    }, []);
	
	    return Qty({"scalar": q, "numerator": num, "denominator": den});
	  }
	
	  var parsedUnitsCache = {};
	  /**
	   * Parses and converts units string to normalized unit array.
	   * Result is cached to speed up next calls.
	   *
	   * @param {string} units Units string
	   * @returns {string[]} Array of normalized units
	   *
	   * @example
	   * // Returns ["<second>", "<meter>", "<second>"]
	   * parseUnits("s m s");
	   *
	   */
	  function parseUnits(units) {
	    var cached = parsedUnitsCache[units];
	    if(cached) {
	      return cached;
	    }
	
	    var unitMatch, normalizedUnits = [];
	    // Scan
	    if(!UNIT_TEST_REGEX.test(units)) {
	      throw new QtyError("Unit not recognized");
	    }
	
	    while((unitMatch = UNIT_MATCH_REGEX.exec(units))) {
	      normalizedUnits.push(unitMatch.slice(1));
	    }
	
	    normalizedUnits = normalizedUnits.map(function(item) {
	      return PREFIX_MAP[item[0]] ? [PREFIX_MAP[item[0]], UNIT_MAP[item[1]]] : [UNIT_MAP[item[1]]];
	    });
	
	    // Flatten and remove null elements
	    normalizedUnits = normalizedUnits.reduce(function(a,b) {
	      return a.concat(b);
	    }, []);
	    normalizedUnits = normalizedUnits.filter(function(item) {
	      return item;
	    });
	
	    parsedUnitsCache[units] = normalizedUnits;
	
	    return normalizedUnits;
	  }
	
	  function NestedMap() {}
	
	  NestedMap.prototype.get = function(keys) {
	
	    // Allows to pass key1, key2, ... instead of [key1, key2, ...]
	    if(arguments.length > 1) {
	      // Slower with Firefox but faster with Chrome than
	      // Array.prototype.slice.call(arguments)
	      // See http://jsperf.com/array-apply-versus-array-prototype-slice-call
	      keys = Array.apply(null, arguments);
	    }
	
	    return keys.reduce(function(map, key, index) {
	      if (map) {
	
	        var childMap = map[key];
	
	        if (index === keys.length - 1) {
	          return childMap ? childMap.data : undefined;
	        }
	        else {
	          return childMap;
	        }
	      }
	    },
	    this);
	  };
	
	  NestedMap.prototype.set = function(keys, value) {
	
	      if(arguments.length > 2) {
	        keys = Array.prototype.slice.call(arguments, 0, -1);
	        value = arguments[arguments.length - 1];
	      }
	
	      return keys.reduce(function(map, key, index) {
	
	        var childMap = map[key];
	        if (childMap === undefined) {
	          childMap = map[key] = {};
	        }
	
	        if (index === keys.length - 1) {
	          childMap.data = value;
	          return value;
	        }
	        else {
	          return childMap;
	        }
	      },
	      this);
	  };
	
	  var stringifiedUnitsCache = new NestedMap();
	  /**
	   * Returns a string representing a normalized unit array
	   *
	   * @param {string[]} units Normalized unit array
	   * @returns {string} String representing passed normalized unit array and
	   *   suitable for output
	   *
	   */
	  function stringifyUnits(units) {
	
	    var stringified = stringifiedUnitsCache.get(units);
	    if(stringified) {
	      return stringified;
	    }
	
	    var isUnity = compareArray(units, UNITY_ARRAY);
	    if(isUnity) {
	      stringified = "1";
	    }
	    else {
	      stringified = simplify(getOutputNames(units)).join("*");
	    }
	
	    // Cache result
	    stringifiedUnitsCache.set(units, stringified);
	
	    return stringified;
	  }
	
	  function getOutputNames(units) {
	    var unitNames = [], token, tokenNext;
	    for(var i = 0; i < units.length; i++) {
	      token = units[i];
	      tokenNext = units[i+1];
	      if(PREFIX_VALUES[token]) {
	        unitNames.push(OUTPUT_MAP[token] + OUTPUT_MAP[tokenNext]);
	        i++;
	      }
	      else {
	        unitNames.push(OUTPUT_MAP[token]);
	      }
	    }
	    return unitNames;
	  }
	
	  function simplify (units) {
	    // this turns ['s','m','s'] into ['s2','m']
	
	    var unitCounts = units.reduce(function(acc, unit) {
	      var unitCounter = acc[unit];
	      if(!unitCounter) {
	        acc.push(unitCounter = acc[unit] = [unit, 0]);
	      }
	
	      unitCounter[1]++;
	
	      return acc;
	    }, []);
	
	    return unitCounts.map(function(unitCount) {
	      return unitCount[0] + (unitCount[1] > 1 ? unitCount[1] : "");
	    });
	  }
	
	  function compareArray(array1, array2) {
	    if (array2.length !== array1.length) {
	      return false;
	    }
	    for (var i = 0; i < array1.length; i++) {
	      if (array2[i].compareArray) {
	        if (!array2[i].compareArray(array1[i])) {
	          return false;
	        }
	      }
	      if (array2[i] !== array1[i]) {
	        return false;
	      }
	    }
	    return true;
	  }
	
	  function round(val, decimals) {
	    return Math.round(val*Math.pow(10, decimals))/Math.pow(10, decimals);
	  }
	
	  function subtractTemperatures(lhs,rhs) {
	    var lhsUnits = lhs.units();
	    var rhsConverted = rhs.to(lhsUnits);
	    var dstDegrees = Qty(getDegreeUnits(lhsUnits));
	    return Qty({"scalar": lhs.scalar - rhsConverted.scalar, "numerator": dstDegrees.numerator, "denominator": dstDegrees.denominator});
	  }
	
	  function subtractTempDegrees(temp,deg) {
	    var tempDegrees = deg.to(getDegreeUnits(temp.units()));
	    return Qty({"scalar": temp.scalar - tempDegrees.scalar, "numerator": temp.numerator, "denominator": temp.denominator});
	  }
	
	  function addTempDegrees(temp,deg) {
	    var tempDegrees = deg.to(getDegreeUnits(temp.units()));
	    return Qty({"scalar": temp.scalar + tempDegrees.scalar, "numerator": temp.numerator, "denominator": temp.denominator});
	  }
	
	  function getDegreeUnits(units) {
	    if(units === "tempK") {
	      return "degK";
	    }
	    else if(units === "tempC") {
	      return "degC";
	    }
	    else if(units === "tempF") {
	      return "degF";
	    }
	    else if(units === "tempR") {
	      return "degR";
	    }
	    else {
	      throw new QtyError("Unknown type for temp conversion from: " + units);
	    }
	  }
	
	  function toDegrees(src,dst) {
	    var srcDegK = toDegK(src);
	    var dstUnits = dst.units();
	    var dstScalar;
	
	    if(dstUnits === "degK") {
	      dstScalar = srcDegK.scalar;
	    }
	    else if(dstUnits === "degC") {
	      dstScalar = srcDegK.scalar ;
	    }
	    else if(dstUnits === "degF") {
	      dstScalar = srcDegK.scalar * 9/5;
	    }
	    else if(dstUnits === "degR") {
	      dstScalar = srcDegK.scalar * 9/5;
	    }
	    else {
	      throw new QtyError("Unknown type for degree conversion to: " + dstUnits);
	    }
	
	    return Qty({"scalar": dstScalar, "numerator": dst.numerator, "denominator": dst.denominator});
	  }
	
	  function toDegK(qty) {
	    var units = qty.units();
	    var q;
	    if(units.match(/(deg)[CFRK]/)) {
	      q = qty.baseScalar;
	    }
	    else if(units === "tempK") {
	      q = qty.scalar;
	    }
	    else if(units === "tempC") {
	      q = qty.scalar;
	    }
	    else if(units === "tempF") {
	      q = qty.scalar * 5/9;
	    }
	    else if(units === "tempR") {
	      q = qty.scalar * 5/9;
	    }
	    else {
	      throw new QtyError("Unknown type for temp conversion from: " + units);
	    }
	
	    return Qty({"scalar": q, "numerator": ["<kelvin>"], "denominator": UNITY_ARRAY});
	  }
	
	  function toTemp(src,dst) {
	    var dstUnits = dst.units();
	    var dstScalar;
	
	    if(dstUnits === "tempK") {
	      dstScalar = src.baseScalar;
	    }
	    else if(dstUnits === "tempC") {
	      dstScalar = src.baseScalar - 273.15;
	    }
	    else if(dstUnits === "tempF") {
	      dstScalar = (src.baseScalar * 9/5) - 459.67;
	    }
	    else if(dstUnits === "tempR") {
	      dstScalar = src.baseScalar * 9/5;
	    }
	    else {
	      throw new QtyError("Unknown type for temp conversion to: " + dstUnits);
	    }
	
	    return Qty({"scalar": dstScalar, "numerator": dst.numerator, "denominator": dst.denominator});
	  }
	
	  function toTempK(qty) {
	    var units = qty.units();
	    var q;
	    if(units.match(/(deg)[CFRK]/)) {
	      q = qty.baseScalar;
	    }
	    else if(units === "tempK") {
	      q = qty.scalar;
	    }
	    else if(units === "tempC") {
	      q = qty.scalar + 273.15;
	    }
	    else if(units === "tempF") {
	      q = (qty.scalar + 459.67) * 5/9;
	    }
	    else if(units === "tempR") {
	      q = qty.scalar * 5/9;
	    }
	    else {
	      throw new QtyError("Unknown type for temp conversion from: " + units);
	    }
	
	    return Qty({"scalar": q, "numerator": ["<temp-K>"], "denominator": UNITY_ARRAY});
	  }
	
	  /**
	   * Safely multiplies numbers while avoiding floating errors
	   * like 0.1 * 0.1 => 0.010000000000000002
	   *
	   * @returns {number} result
	   * @param {...number} number
	   */
	  function mulSafe() {
	    var result = 1, decimals = 0;
	    for(var i = 0; i < arguments.length; i++) {
	      var arg = arguments[i];
	      decimals = decimals + getFractional(arg);
	      result *= arg;
	    }
	
	    return decimals !== 0 ? round(result, decimals) : result;
	  }
	
	  /**
	   * Safely divides two numbers while avoiding floating errors
	   * like 0.3 / 0.05 => 5.999999999999999
	   *
	   * @returns {number} result
	   * @param {number} num Numerator
	   * @param {number} den Denominator
	   */
	  function divSafe(num, den) {
	    if(den === 0) {
	      throw new QtyError("Divide by zero");
	    }
	
	    var factor = Math.pow(10, getFractional(den));
	    var invDen = factor/(factor*den);
	
	    return mulSafe(num, invDen);
	  }
	
	  function getFractional(num) {
	    // Check for NaNs or Infinities
	    if(!isFinite(num)) {
	      return 0;
	    }
	
	    // Faster than parsing strings
	    // http://jsperf.com/count-decimals/2
	    var count = 0;
	    while(num % 1 !== 0) {
	      num *= 10;
	      count++;
	    }
	    return count;
	  }
	
	  Qty.mulSafe = mulSafe;
	  Qty.divSafe = divSafe;
	
	  function cleanTerms(num, den) {
	    num = num.filter(function(val) {return val !== UNITY;});
	    den = den.filter(function(val) {return val !== UNITY;});
	
	    var combined = {};
	
	    var k;
	    for(var i = 0; i < num.length; i++) {
	      if(PREFIX_VALUES[num[i]]) {
	        k = [num[i], num[i+1]];
	        i++;
	      }
	      else {
	        k = num[i];
	      }
	      if(k && k !== UNITY) {
	        if(combined[k]) {
	          combined[k][0]++;
	        }
	        else {
	          combined[k] = [1, k];
	        }
	      }
	    }
	
	    for(var j = 0; j < den.length; j++) {
	      if(PREFIX_VALUES[den[j]]) {
	        k = [den[j], den[j+1]];
	        j++;
	      }
	      else {
	        k = den[j];
	      }
	      if(k && k !== UNITY) {
	        if(combined[k]) {
	          combined[k][0]--;
	        }
	        else {
	          combined[k] = [-1, k];
	        }
	      }
	    }
	
	    num = [];
	    den = [];
	
	    for(var prop in combined) {
	      if(combined.hasOwnProperty(prop)) {
	        var item = combined[prop];
	        var n;
	        if(item[0] > 0) {
	          for(n = 0; n < item[0]; n++) {
	            num.push(item[1]);
	          }
	        }
	        else if(item[0] < 0) {
	          for(n = 0; n < -item[0]; n++) {
	            den.push(item[1]);
	          }
	        }
	      }
	    }
	
	    if(num.length === 0) {
	      num = UNITY_ARRAY;
	    }
	    if(den.length === 0) {
	      den = UNITY_ARRAY;
	    }
	
	    // Flatten
	    num = num.reduce(function(a,b) {
	      return a.concat(b);
	    }, []);
	    den = den.reduce(function(a,b) {
	      return a.concat(b);
	    }, []);
	
	    return [num, den];
	  }
	
	  /*
	   * Identity function
	   */
	  function identity(value) {
	    return value;
	  }
	
	  /**
	   * Tests if a value is a string
	   *
	   * @param {} value - Value to test
	   *
	   * @returns {boolean} true if value is a string, false otherwise
	   */
	  function isString(value) {
	    return typeof value === "string" || value instanceof String;
	  }
	
	  /*
	   * Prefer stricter Number.isFinite if currently supported.
	   * To be dropped when ES6 is finalized. Obsolete browsers will
	   * have to use ES6 polyfills.
	   */
	  var isFinite = Number.isFinite || window.isFinite;
	  /**
	   * Tests if a value is a number
	   *
	   * @param {} value - Value to test
	   *
	   * @returns {boolean} true if value is a number, false otherwise
	   */
	  function isNumber(value) {
	    // Number.isFinite allows not to consider NaN or '1' as numbers
	    return isFinite(value);
	  }
	
	  /**
	   * Tests if a value is a Qty instance
	   *
	   * @param {} value - Value to test
	   *
	   * @returns {boolean} true if value is a Qty instance, false otherwise
	   */
	  function isQty(value) {
	    return value instanceof Qty;
	  }
	
	  /**
	   * Tests if a value is a Qty definition object
	   *
	   * @param {} value - Value to test
	   *
	   * @returns {boolean} true if value is a definition object, false otherwise
	   */
	  function isDefinitionObject(value) {
	    return value && typeof value === "object" && value.hasOwnProperty("scalar");
	  }
	
	  /**
	   * Asserts initialization value type is valid
	   *
	   * @param {} value - Value to test
	   *
	   * @throws {QtyError} if initialization value type is not valid
	   */
	  function assertValidInitializationValueType(value) {
	    if (!(isString(value) || isNumber(value) || isQty(value) || isDefinitionObject(value))) {
	      throw new QtyError("Only strings, numbers or quantities " +
	                         "accepted as initialization values");
	    }
	  }
	
	  // Setup
	  var PREFIX_VALUES = {};
	  var PREFIX_MAP = {};
	  var UNIT_VALUES = {};
	  var UNIT_MAP = {};
	  var OUTPUT_MAP = {};
	  for(var unitDef in UNITS) {
	    if(UNITS.hasOwnProperty(unitDef)) {
	      var definition = UNITS[unitDef];
	      if(definition[2] === "prefix") {
	        PREFIX_VALUES[unitDef] = definition[1];
	        for(var i = 0; i < definition[0].length; i++) {
	          PREFIX_MAP[definition[0][i]] = unitDef;
	        }
	      }
	      else {
	        UNIT_VALUES[unitDef] = {
	          scalar: definition[1],
	          numerator: definition[3],
	          denominator: definition[4]
	        };
	        for(var j = 0; j < definition[0].length; j++) {
	          UNIT_MAP[definition[0][j]] = unitDef;
	        }
	      }
	      OUTPUT_MAP[unitDef] = definition[0][0];
	    }
	  }
	  var PREFIX_REGEX = Object.keys(PREFIX_MAP).sort(function(a, b) {
	    return b.length - a.length;
	  }).join("|");
	  var UNIT_REGEX = Object.keys(UNIT_MAP).sort(function(a, b) {
	    return b.length - a.length;
	  }).join("|");
	  /*
	   * Minimal boundary regex to support units with Unicode characters
	   * \b only works for ASCII
	   */
	  var BOUNDARY_REGEX = "\\b|$";
	  var UNIT_MATCH = "(" + PREFIX_REGEX + ")??(" +
	                   UNIT_REGEX +
	                   ")(?:" + BOUNDARY_REGEX + ")";
	  var UNIT_MATCH_REGEX = new RegExp(UNIT_MATCH, "g"); // g flag for multiple occurences
	  var UNIT_TEST_REGEX = new RegExp("^\\s*(" + UNIT_MATCH + "\\s*\\*?\\s*)+$");
	
	  /**
	   * Custom error type definition
	   * @constructor
	   */
	  function QtyError() {
	    var err;
	    if(!this) { // Allows to instantiate QtyError without new()
	      err = Object.create(QtyError.prototype);
	      QtyError.apply(err, arguments);
	      return err;
	    }
	    err = Error.apply(this, arguments);
	    this.name = "QtyError";
	    this.message = err.message;
	    this.stack = err.stack;
	  }
	  QtyError.prototype = Object.create(Error.prototype, {constructor: { value: QtyError }});
	  Qty.Error = QtyError;
	
	  return Qty;
	}));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Matches = __webpack_require__(4);
	
	/**
	 * Escapes a string to be used within a RegExp
	 * 
	 * @param  {String} string
	 * @return {String}
	 */
	function escapeRegExp (string) {
	  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}
	
	function toArray (object) {
		return Array.prototype.slice.call(object);
	}
	
	function Saw (object) {
		if (Array.isArray(object)) {
			this._context = object.slice(0);
		} else if (object instanceof Matches) {
			this._context = object.clone();
		} else {
			this._context = object;
		}
	}
	
	function argumentsToArray (args) {
		var result;
		
		if (args.length > 1) {
			result = toArray(args);
		} else if (Array.isArray(args[0])) {
			result = args[0];
		} else {
			result = [args[0]];
		}
	
		return result;
	}
	
	Saw.prototype = {
		match: function (match) {
			var matchArray = argumentsToArray(arguments),
				saw = new Saw(this._context),
				context = this._contextToString(this._context);
	
			matchArray.some(function (match) {
				var matches = context.match(match);
	
				if (!matches) {
					saw._context = '';
				} else {
					saw._context = new Matches(matches, match);
					return true;
				}
			});		
	
			return saw;
		},
	
		item: function (index) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches) {
				saw._context = saw._context.item(index);
			} else if (Array.isArray(saw._context)) {
				saw._context = saw._context[index] || '';
			}
	
			return saw;
		},
	
		itemFromRight: function (index) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches || Array.isArray(saw._context)) {
				var length = saw._context.length;
	
				index = length - 1 - index;
				if (index >= 0) {
					saw = saw.item(index);
				}
			}
	
			return saw;
		},
	
		first: function (index) {
			var saw = new Saw(this._context);
	
			return saw.item(0);
		},
	
		last: function () {
			var saw = new Saw(this._context);
		
			return saw.itemFromRight(0);
		},
	
		replace: function (match, replacement) {
			var saw = new Saw(this._context);
	
			if (Array.isArray(saw._context)) {
				saw._context = saw._context.map(function (string) {
					return string.replace(match, replacement);
				});
			} else {
				saw._context = this._contextToString(this._context).replace(match, replacement);
			}
	
			return saw;
		},
	
		join: function (separator) {
			var saw = new Saw(this._context);
	
			if (Array.isArray(saw._context)) {
				saw._context = saw._context.join(separator || '');
			}
	
			return saw;
		},
	
		each: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			array.forEach(function (item, index) {
				if (item) {
					func.bind(thisArg)(item, index, array);
				}
			});
	
			return saw;
		},
	
		map: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.map(function (item, index) {
				return func.bind(thisArg)(item, index, array);
			});
	
			return saw;
		},
	
		reduce: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = String(array.reduce(function (previousValue, currentValue, index, array) {
				return func.bind(thisArg)(previousValue, currentValue, index, array);
			}));
	
			return saw;
		},
	
		lowerCase: function (func) {
			return this.mapStringMethodAgainstContext('toLowerCase', func);
		},
	
		upperCase: function (func) {
			return this.mapStringMethodAgainstContext('toUpperCase', func);
		},
	
		mapStringMethodAgainstContext: function (methodName, func) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.map(function (item, index) {
				return item ? String(item)[methodName]() : item;
			});
	
			return saw;
		},
	
		filter: function (func, thisArg) {
			var saw = new Saw(this._context);
	
			// Note: adds array as a third param
			var array = saw.toArray();
			saw._context = array.filter(function (item, index) {
				return func.bind(thisArg)(item, index, array);
			});
	
			return saw;
		},
	
		remove: function () {
			var saw = new Saw(this._context);
	
			var context = saw.toArray(),
				matches = toArray(arguments);
			
			context = context.map(function (context) {
				matches.forEach(function (match) {
					match = typeof match === 'string' ? new RegExp(escapeRegExp(match), 'g') : match;
					context = context.replace(match, '');
				});
	
				return context;
			});
			
			saw._context = context;
			
			return saw;
		},
	
		trim: function () {
			var saw = new Saw(this._context);
	
			var context = Array.isArray(saw._context) ? saw._context : saw.toArray(saw._context);
	
			saw._context = context.map(function (item) {
				return item ? item.trim() : item;
			});
	
			return saw;
		},
	
		split: function (separator) {
			var saw = new Saw(this._context);
	
			saw._context = saw._contextToString(saw._context).split(separator);
	
			return saw;
		},
	
		slice: function (begin, end) {
			var saw = new Saw(this._context);
	
			if (saw._context instanceof Matches || Array.isArray(saw._context)) {
				saw._context = saw._context.slice(begin, end);
			}
	
			return saw;
		},
	
		toString: function () {
			return this._contextToString(this._context);
		},
	
		toArray: function () {
			if (Array.isArray(this._context)) {
				return toArray(this._context);
			} else if (this._context instanceof Matches) {
				return this._context.toArray();
			} else {
				return this.toBoolean() ? [this._context] : [];
			}
		},
	
		toNumber: function () {
			var result = this.toFloat();
			
			return isNaN(result) ? 0 : result;
		},
	
		toFloat: function () {
			var string = this.toString(),
				result = parseFloat(string, 10);
	
			if (isNaN(result) || string.length != String(result).length) {
				return NaN;
			} else {
				return result;
			}
		},
	
		toInt: function () {
			var string = this.toString(),
				result = parseInt(string, 10);
	
			if (isNaN(result) || string.length != String(result).length) {
				return NaN;
			} else {
				return result;
			}
		},
	
		toBoolean: function () {
			return !!this.toString();
		},
	
		toObject: function () {
			var props = argumentsToArray(arguments),
				array = this.toArray(),
				object = {};
	
			props.forEach(function (value, index) {
				if (typeof value !== 'undefined' && typeof array[index] != 'undefined') {
					object[value] = array[index] ;
				}
			});
	
			return object;
		},
	
		_contextToString: function (context) {
			if (typeof context === 'string') {
				return context;
			} else if (context instanceof Matches) {
				return context.toString();
			} else if (Array.isArray(context)) {
				return context.join('');
			}
	
			return '';
		}
	};
	
	module.exports = Saw;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	function Matches (matches, match) {
		if (!matches) return null;
	
		this.match = match;
	
		if (match instanceof RegExp && !match.global && match.length > 1) {
			this.matches = matches.slice(1);
		} else {
			this.matches = matches;
		}
	
		this.length = this.matches.length;
	}
	Matches.prototype = {
		item: function (index) {
			var string;
	
			if (this.matches.length === 1) {
				string = this.matches[0];
			} else if (this.matches.length > 1) {
				string = this.matches[this.match.global ? index : index + 1];
			}
	
			return string || '';
		},
	
		slice: function (begin, end) {
			var results = [];
	
			if (this.matches.length === 1 || this.match.global) {
				results = this.matches.slice(begin, end);
			} else if (this.matches.length > 1) {
				results = this.matches.slice(begin + 1, end);
			}
	
			return results;
		},
	
		toArray: function (begin, end) {
			var results = [];
	
			if (this.matches.length === 1 || this.match.global) {
				results = this.matches.slice(0);
			} else if (this.matches.length > 1) {
				results = this.matches.slice(1);
			}
	
			return results;
		},
	
		toString: function () {
			var string = '';
	
			if (this.matches.length === 1) {
				string = this.matches[0];
			} else {
				this.matches.forEach(function (item) {
					if (item) {
						string += item;
					}
				});
			}
	
			return string;
		},
	
		clone: function () {
			var matches = new Matches(null)
			matches.match = this.match;
			matches.matches = Array.prototype.slice.call(this.matches);
			matches.length = this.length;
			return matches;
		}
	};
	
	module.exports = Matches;

/***/ }
/******/ ])
//# sourceMappingURL=dimensionParser.js.map