/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable quotes */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src('src/styles/scss/**/*.+(scss|sass)')
        /*.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(gulp.dest("css"))*/

        //for draft
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(autoprefixer({
                overrideBrowserslist: [
                "last 2 versions"
                ],
                cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/styles"))

         //for docs
        .pipe(gulp.dest("docs/styles"))
        .pipe(browserSync.stream());
        
});


gulp.task('watch', function () {
    gulp.watch('src/styles/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('src/icons/**/*').on('change', browserSync.reload);
    gulp.watch('src/image/**/*').on('change', browserSync.reload);
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('docs/'));
});

gulp.task('scripts', function(){
    return gulp.src('src/scripts/**/*.js')
        .pipe(gulp.dest('docs/scripts'));
});

gulp.task('audio', function(){
    return gulp.src('src/audio/**/*')
        .pipe(gulp.dest('docs/audio'));
});

gulp.task('css', function(){
    return gulp.src('src/styles/**/*')
        .pipe(gulp.dest('docs/styles'));
});

gulp.task('video', function(){
    return gulp.src('src/video/**/*')
        .pipe(gulp.dest('docs/video'));
});

gulp.task('fonts', function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('docs/fonts'));
});

gulp.task('radio', function(){
    return gulp.src('src/radio/**/*')
        .pipe(gulp.dest('docs/radio'));
});

gulp.task('favicon', function(){
    return gulp.src('src/favicon/**/*')
        .pipe(gulp.dest('docs/favicon'));
});

gulp.task('icons', function(){
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('docs/icons'));
});


gulp.task('image', function(){
    return gulp.src('src/image/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('docs/image'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'icons', 'image',
 'fonts', 'audio', 'video', 'radio', 'favicon', 'css'));