var gulp = require('gulp'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	browserSync = require('browser-sync'),
	port = process.env.port || 5000;

gulp.task('live', function(){
	browserSync({
    	files: ['scripts/**/*.js', '*.html'],
        server: {
            baseDir: "./"
        }
    });
})

gulp.task('js',function(){
	gulp.src('./scripts/**/*.js')
	.pipe( connect.reload() )
})

gulp.task('html',function(){
	gulp.src('*.html')
	.pipe( connect.reload() )
});

gulp.task('watch',function(){
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('./app/**/*.html',['html']);
})

gulp.task('default',['js', 'htm;']);

gulp.task('serve',['live','watch']);
