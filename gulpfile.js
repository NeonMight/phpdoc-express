var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var exec = require('child_process').exec;

gulp.task('rebuild-docs', function(e)
{
	// phpdoc -d build/src -t build/site
	console.log('Rebuilding...');
	exec('phpdoc -d build/src -t build/site', function(err, stdout, stderr)
	{
		console.log(stdout);
		console.log(stderr);
		e(err);
	})
});

gulp.task('lint',function()
{
	console.log('linting...');
	gulp.src('index.js').pipe(jshint());
});

gulp.task('start',function()
{
	gulp.watch('build/src/**/*.php',['rebuild-docs']);
	nodemon(
	{
		script: 'index.js',
		ext: 'js',
		env: {'NODE_ENV' : 'development'}
		// tasks: ['lint']
	})
});