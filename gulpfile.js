(function()
{
	'use strict';
	var gulp = require('gulp');
	var nodemon = require('gulp-nodemon');
	var jshint = require('gulp-jshint');
	var exec = require('child_process').exec;

	gulp.task('phpdoc', function(e)
	{
		// phpdoc -d build/src -t build/site
		console.log('Rebuilding...');
		exec('phpdoc -d build/src -t build/site -p', function(err, stdout, stderr)
		{
			console.log(stdout);
			console.log(stderr);
			e(err);
		})
	});

	gulp.task('rebuild',function()
	{
		gulp.watch('build/src/**/*.php',['phpdoc']);
	})


	gulp.task('reload',function()
	{
		nodemon(
		{
			script: 'index.js',
			ext: 'js',
			env: {'NODE_ENV' : 'development'}
			// tasks: ['lint']
		})
	});

	/*this one is not used...for now...*/
	gulp.task('lint',function()
	{
		console.log('linting...');
		gulp.src('index.js').pipe(jshint());
	});
	
	gulp.task('default',['rebuild','reload'])
}());