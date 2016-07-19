/*
*	Task Automation to make my life easier.
*	Author: Jean-Pierre Sierens
*	===========================================================================
*/
 
// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify')
 
// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  	'react-dom'
];
// keep a count of the times a task refires
var scriptsCount = 0;
 
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});
 
gulp.task('deploy', function (){
	bundleApp(true);
});
 
gulp.task('watch', function () {
	gulp.watch(['./jeyson_freelance/web_app/static/js/dev/**/*', './jeyson_freelance/web_app/static/css/*.sass'], ['scripts']);
});
 
// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch']);
 
// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
    //process.env.NODE_ENV = 'development';
    process.env.NODE_ENV = 'production';
	scriptsCount++;
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: './jeyson_freelance/web_app/static/js/dev/app.js',
    	debug: true
  	})
 
	// If it's not for production, a separate vendors.js file will be created
	// the first time gulp is run so that we don't have to rebundle things like
	// react everytime there's a change in the js file
  	if (!isProduction && scriptsCount === 1){
  		// create vendors.js for dev environment.
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
            .pipe(streamify(uglify()))
			.pipe(gulp.dest('./jeyson_freelance/web_app/static/js/'));
  	}
  	if (!isProduction){
  		// make the dependencies external so they dont get bundled by the 
		// app bundler. Dependencies are already bundled in vendor.js for
		// development environments.
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}
 
  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
	    .pipe(gulp.dest('./jeyson_freelance/web_app/static/js'));

    // Compile general SASS files from  web_base/static/css
    gulp.src("./jeyson_freelance/web_app/static/css/styles.sass")
    .pipe(sass())
    .pipe(gulp.dest("./jeyson_freelance/web_app/static/css"));

    // Compile SASS files from static/js/dev and bundle it into app.js
    gulp.src("./jeyson_freelance/web_app/static/js/dev/**/*.scss")
    // Run Sass on those files
    .pipe(sass())
    //Concat
    .pipe(concat('app.css'))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest("./jeyson_freelance/web_app/static/css"));

  // Execute django collectstatic
  exec("python manage.py collectstatic --noinput", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
}
