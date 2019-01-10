var gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel');
uglify = require('gulp-uglify');

var srcDirPath = '../meta/src/gengine';
var destDirPath = '../meta/.maker/gengine';

gulp.task('clean', function () {
    return del([destDirPath], { force: true });
});

gulp.task('compile', ['clean'], function () {
    return gulp.src(srcDirPath + '/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(destDirPath));
});

gulp.task('build', ['compile'], function () {
    return gulp.src([
        srcDirPath + '/**/*.json',
        srcDirPath + '/**/*.md',
        srcDirPath + '/**/*.png',
        srcDirPath + '/**/*.tpl'
    ]).pipe(gulp.dest(destDirPath));
});
