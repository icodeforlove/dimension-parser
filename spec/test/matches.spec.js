var dimensionParser = require('../../index');

describe('General', function() {
	it('can match simple dimensions', function() {
		expect(dimensionParser('h: 29,20 w: 26,30 cm', 'in')).toEqual({width: '10.35', height: '11.50'});
		expect(dimensionParser('h: 29,20 w: 26,30 d: 60,1 cm', 'in')).toEqual({width : '10.35', height : '11.50', length : '23.66'});
		expect(dimensionParser('Height 27 in.; Width 20 in. / Height 68.6 cm.; Width 50.8 cm.', 'in')).toEqual({width: '20.00', height: '27.01'});
		expect(dimensionParser('Height 18.5 in.; Width 14.3 in. / Height 47 cm.; Width 36.2 cm.', 'in')).toEqual({width: '14.25', height: '18.50'});
		expect(dimensionParser('495x340 mm; 19 1/2x13 3/8 inches', 'in')).toEqual({width: '19.50', height: '13.38'});
		expect(dimensionParser('622x460 mm; 24 3/8x18 inches', 'in')).toEqual({width: '24.38', height: '18.00'});
		expect(dimensionParser('640x500 mm; 25x19 1/2 inches', 'in')).toEqual({width : '25.00', height : '19.50'});
		expect(dimensionParser('171.5 x 141.5 cm (67.5 x 55.75 in.)', 'in')).toEqual({ width: '67.50', height: '55.75' });
		expect(dimensionParser('171.5x141.5cm', 'in')).toEqual({ width : '67.52', height : '55.71' });
		expect(dimensionParser('88.9 x 203.2 cm (35 x 80 in.) overall 177.8 x 203.2 cm (70 x 80 in.)', 'in')).toEqual({ width : '70.00', height : '80.00' });
		expect(dimensionParser('32 x 22,5 cm; 12 5/8 x 8,5 in.', 'in')).toEqual({ width : '12.63', height : '8.50' });
		expect(dimensionParser('88.9 x 203.2 x 203.2 cm (35 x 80 in.) overall 177.8 x 203.2 x 203.2 cm (70 x 80 x 80 in.)', 'in')).toEqual({ width : '70.00', height : '80.00', length : '80.00' });
		expect(dimensionParser('12"x10"', 'in')).toEqual({ width : '12.00', height : '10.00' });
		expect(dimensionParser('12"x10"', 'in')).toEqual({ width : '12.00', height : '10.00' });
		expect(dimensionParser('12 " x10"', 'in')).toEqual({ width : '12.00', height : '10.00' });
		expect(dimensionParser('12 " x10"x30"', 'in')).toEqual({ width : '12.00', height : '10.00', length: '30.00' });
		expect(dimensionParser('12 " ×10"×30"', 'in')).toEqual({ width : '12.00', height : '10.00', length: '30.00' });
		expect(dimensionParser('12 " ×10"x30"', 'in')).toEqual({ width : '12.00', height : '10.00', length: '30.00' });
		expect(dimensionParser('(1)832, 25 x 19,5 in', null, null, true)).toEqual({ width : '25.00', height : '19.50' });
		expect(dimensionParser('832 25 x 19,5 in', null, null, true)).toEqual({ width : '25.00', height : '19.50' });
		expect(dimensionParser('26.5 cm. x 17.1 cm.', 'in')).toEqual({ width: '10.43', height: '6.73' });
		expect(dimensionParser('in 17.5x17.5', 'in')).toEqual({ width : '17.50', height : '17.50' });
		expect(dimensionParser('cm 17,5x17,5', 'in')).toEqual({ width : '6.89', height : '6.89' });
        expect(dimensionParser('cm 17,5x17,5x12,22', 'in')).toEqual({ width : '6.89', height : '6.89', length : '4.81' });
        expect(dimensionParser('11/0 x 7.0 x 5.5mm', 'in')).toEqual({ width: '0.43', height: '0.28', length: '0.22' });
	});

	it('can match basic fractions', function () {
		expect(dimensionParser('171.5 x 141.5 cm (67 1/2 x 55 3/4 in.)', 'in')).toEqual({ width: '67.50', height: '55.75' });
		expect(dimensionParser('(67 1/2 x 55 3/4 in.)', 'cm')).toEqual({ width : '171.45', height : '141.60' });
		expect(dimensionParser('155 x 109.2 cm (61 x 42 7/8 in.)', 'in')).toEqual({ width : '61.00', height : '42.88' });
		expect(dimensionParser('107 x 150 cm (42 1/8 x 59 in.)', 'in')).toEqual({ width : '42.13', height : '59.00' });
		expect(dimensionParser('200.2 x 255.3 cm (78 7/8 x 100 1/2 in.)', 'in')).toEqual({ width : '78.88', height : '100.50' });

		expect(dimensionParser('200.2 x 255.3 x 255.3 cm (78 7/8 x 100 1/2 x 100 1/2 in.)', 'in')).toEqual({ width : '78.88', height : '100.50', length : '100.50' });
	});

	it('can support HxWxL format', function () {
		expect(dimensionParser('171.5 x 141.5 cm (67 1/2 x 55 3/4 in.)', 'in', 'HxWxL')).toEqual({ height: '67.50', width: '55.75' });
		expect(dimensionParser('(67 1/2 x 55 3/4 in.)', 'cm', 'HxWxL')).toEqual({ height : '171.45', width : '141.60' });
		expect(dimensionParser('155 x 109.2 cm (61 x 42 7/8 in.)', 'in', 'HxWxL')).toEqual({ height : '61.00', width : '42.88' });
		expect(dimensionParser('107 x 150 cm (42 1/8 x 59 in.)', 'in', 'HxWxL')).toEqual({ height : '42.13', width : '59.00' });
		expect(dimensionParser('200.2 x 255.3 cm (78 7/8 x 100 1/2 in.)', 'in', 'HxWxL')).toEqual({ height : '78.88', width : '100.50' });

		expect(dimensionParser('200.2 x 255.3 x 255.3 cm (78 7/8 x 100 1/2 x 100 1/2 in.)', 'in', 'HxWxL')).toEqual({ height : '78.88', width : '100.50', length : '100.50' });

		expect(dimensionParser('5 x 2.75 x 7 in.', 'in', 'WxLxH')).toEqual({ height : '7.00', width : '5.00', length: '2.75' });
	});

	it('can match entity fractions', function () {
		expect(dimensionParser('18¾ x 15 1/8 in. (47.6 x 38¾ cm.) ', 'in')).toEqual({ width : '18.74', height : '15.26' });
		expect(dimensionParser('18 ¾ x 15 1/8 in. (47.6 x 38 ¾ cm.)', 'in')).toEqual({ width : '18.74', height : '15.26' });

		expect(dimensionParser('12 x 39 1/4 x 39 1/4 in. (30.5 x 99.7 x 99.7 cm).', 'in')).toEqual({ width : '12.01', height : '39.25', length : '39.25' });
	});

	it('can match odd phrasing', function () {
		expect(dimensionParser('171.5 by 141.5 cm (67.5 by 55.75 in.)', 'in')).toEqual({ width: '67.50', height: '55.75' });
		expect(dimensionParser('171.5by141.5cm', 'in')).toEqual({ width : '67.52', height : '55.71' });
		expect(dimensionParser('88.9 by 203.2 cm (35 by 80 in.) overall 177.8 by 203.2 cm (70 by 80 in.)', 'in')).toEqual({ width : '70.00', height : '80.00' });
		expect(dimensionParser('46.50 in. (118.10 cm.) (height)', 'in')).toEqual({height: '46.50'});
		expect(dimensionParser('46.50 in. (118.10 cm.) (height)', 'in')).toEqual({height: '46.50'});
		expect(dimensionParser('85.98 in. (218.40 cm.) (width)', 'in')).toEqual({width: '85.98'});
		expect(dimensionParser('3.00 in. (7.62 cm.) (depth)', 'in')).toEqual({length: '3.00'});
		expect(dimensionParser('46.50 in. (118.10 cm.) (height) by 85.98 in. (218.40 cm.) (width)', 'in')).toEqual({width: '85.98', height: '46.50'});
		expect(dimensionParser('8.00 in. (20.32 cm.) (height) by 8.00 in. (20.32 cm.) (width) by 3.00 in. (7.62 cm.) (depth)', 'in')).toEqual({width: '8.00', height: '8.00', length: '3.00'});
	});

	it('can match named dimensions', function () {
		expect(dimensionParser('Hauteur : 92 cm (36  1/4  in.) Largeur : 203 cm (80 in.) Profondeur : 85 cm (33  1/2  in.)', 'in')).toEqual({ width : '79.92', height : '36.22', length : '33.46' });
		expect(dimensionParser('Hauteur : 92 cm (36  1/4  in.) Largeur : 203 cm (80 in.)', 'in')).toEqual({ width : '79.92', height : '36.22' });
		expect(dimensionParser('Hauteur : 92 cm Largeur : 203 cm Profondeur : 85 cm', 'in')).toEqual({ width : '79.92', height : '36.22', length : '33.46' });
		expect(dimensionParser('Hauteur : 92 cm Largeur : 203 cm', 'in')).toEqual({ width : '79.92', height : '36.22' });
		expect(dimensionParser('Hauteur : (36  1/4  in.) Largeur : (80 in.)', 'in')).toEqual({ width : '80.00', height : '36.25' });
		expect(dimensionParser('Hauteur : 70 cm Largeur : 49,5 cm Profondeur : 32,4 cm', 'in')).toEqual({ width : '19.49', height : '27.56' });
		expect(dimensionParser('Hauteur : 70 in Largeur : 49,5 in Profondeur : 32,4 in', 'in')).toEqual({ width : '49.50', height : '70.00' });
		expect(dimensionParser('height: 516mm 20 1/4 in; depth: 70mm 2 3/4in; width: 515mm 20 1/4 in', 'in')).toEqual({ width : '20.25', height : '20.25', length : '2.75' });
		expect(dimensionParser('Height 36.6 in.; Width 22 in.; Depth 11.4 in.', 'in')).toEqual({width : '22.00', height : '36.60', length : '11.40'});
    });

	it('can test if a string contains dimensions', function () {
		expect(dimensionParser.hasDimensions('Hauteur : 92 cm (36  1/4  in.) Largeur : 203 cm (80 in.) Profondeur : 85 cm (33  1/2  in.)')).toEqual(true);
		expect(dimensionParser.hasDimensions('foobar 9001 x')).toEqual(false);
	});
});
