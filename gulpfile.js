const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const BUILD_DIRECTORY = 'dist';

const tsProject = ts.createProject('tsconfig.json');

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('clean-scripts', function () {
    return gulp.src(BUILD_DIRECTORY, {read: false}).pipe(clean());
});


gulp.task('scripts', function () {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(BUILD_DIRECTORY));
});

gulp.task('build', ['scripts']);