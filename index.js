var Qty = require('js-quantities'),
	saw = require('string-saw');

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