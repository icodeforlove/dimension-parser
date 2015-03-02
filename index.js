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
	unitTypes = ['in', 'cm', 'mm', 'ft'],
	matches = [
		{
			match: '([0-9\\.]+)(?:\\s*([0-9\\/]+|' + entitiesArray.join('|') + '))?\\s*x\\s*([0-9\\.]+)(?:\\s*([0-9\\/]+|' + entitiesArray.join('|') + '))?(?:\\s*x\\s*([0-9\\.]+)(?:\\s*([0-9\\/]+|' + entitiesArray.join('|') + '))?)?\\s*(' + unitTypes.join('|') + ')\\.?',
			props: ['width', 'width_remainder', 'height', 'height_remainder', 'length', 'length_remainder', 'type']
		}
	];

function matchObject(string, regExp, props) {
	var match = saw(string)
		.match(new RegExp(regExp, 'gi'))
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

module.exports = function (string, unitType) {
	var match;

	for (var i = 0; i < matches.length; i++) {
		if ((match = matchObject(string, matches[i].match, matches[i].props))) {
			break;
		}
	}

	if (match) {
		if (match.width) {
			match.width = parseFloat(match.width);
		}

		if (match.height) {
			match.height = parseFloat(match.height);
		}

		if (match.length) {
			match.length = parseFloat(match.length);
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

		match.width = new Qty(match.width + ' ' + match.type).to(unitType).scalar;
		match.height = new Qty(match.height + ' ' + match.type).to(unitType).scalar;
		if (match.length) {
			match.length = new Qty(match.length + ' ' + match.type).to(unitType).scalar;
		}
	}

	if (match) {
		var result = {
			width: match.width.toFixed(2),
			height: match.height.toFixed(2)
		};

		if (match.length) {
			result.length = match.length.toFixed(2);
		}

		return result;
	} else {
		return null;
	}
};