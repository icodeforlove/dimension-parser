module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		webpack: {
			build: {
				devtool: 'source-map',
				entry: './index.js',
				output: {
					library: 'dimensionParser',
					path: 'dist/',
					filename: 'dimensionParser.js'
				}
			}
		},

		uglify: {
			build: {
				files: {
					'dist/dimensionParser-min.js': ['dist/dimensionParser.js']
				}
			}
		},

		banner: '/**\n * dimensionParser.js v<%= pkg.version %>\n */',
		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					'dist/dimensionParser.js': ['dist/dimensionParser.js'],
					'dist/dimensionParser-min.js': ['dist/dimensionParser-min.js']
				}
			}
		},

		jshint: {
			options: {
				jshintrc: true
			},
			all: ['./*.js', './test/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['webpack', 'uglify', 'usebanner']);
};