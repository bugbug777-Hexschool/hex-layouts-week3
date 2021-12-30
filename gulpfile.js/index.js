const gulp = require("gulp");
const $ = require('gulp-load-plugins')();
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();
const { options } = require("./options");

// EJS to HTML
function ejs_with_layout() {
    return gulp.src("./app/**/*.html")
        .pipe($.frontMatter())
        .pipe(
            $.layout((file) => {
                return file.frontMatter;
            }),
        )
        .pipe(gulp.dest("./public/"))
        .pipe(browserSync.stream());
}
// Sass
function scss_to_css() {
    return gulp.src("./app/css/**/*.scss")
        .pipe($.sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe($.postcss([autoprefixer()]))
        .pipe($.if(
            options.env === "production",
            $.postcss([cssnano()])
        ))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest("./public/css/"))
        .pipe(browserSync.stream());
}
// Babel
function es6_to_es5() {
    return gulp.src("./app/js/**/*.js")
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ["@babel/env"]
        }))
        .pipe($.concat("bundle.js"))
        .pipe($.if(
            options.env === "production",
            $.terser({
                keep_fnames: true,
                mangle: false
            })))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest("./public/js/"))
        .pipe(browserSync.stream());
}
// Images
function img() {
    // 並沒有過濾檔案總類
    return gulp.src("./app/img/**/*")
        .pipe($.changed("./public/"))
        .pipe(gulp.dest("./public/img/"))
}
// Browser Sync
function serve(done) {
    browserSync.init({
        server: {
            baseDir: "./public/"
        },
        // reloadDebounce: 500,
        port: 8080
    });
    done();
}
// Clean Files
function cleanFiles() {
    return gulp.src("./public/", {
            read: false,
            allowEmpty: true,
        })
        .pipe($.clean());
}
// Deploy
function deploy() {
    return gulp.src("./public/**/*")
        .pipe($.ghPages());
}
// Listener
function watch(done) {
    gulp.watch(["./app/**/*.ejs", "./app/**/*.html"], gulp.series(ejs_with_layout));
    gulp.watch(["./app/css/**/*.scss"], gulp.series(scss_to_css));
    gulp.watch(["./app/js/**/*.js"], gulp.series(es6_to_es5));
    gulp.watch(["./app/img/**/*"], gulp.series(img));
    done();
}


// 預設連續任務指令
exports.default = gulp.series(
    gulp.parallel(
        ejs_with_layout,
        scss_to_css,
        es6_to_es5,
        img
    ),
    serve,
    watch
);
exports.build = gulp.series(
    cleanFiles,
    gulp.parallel(
        ejs_with_layout,
        scss_to_css,
        es6_to_es5,
        img
    )
);

// 單一任務指令
exports.ejs = ejs_with_layout;
exports.scss = scss_to_css;
exports.babel = es6_to_es5;
exports.img = img;
exports.clean = cleanFiles;
exports.serve = serve;
exports.watch = watch;
exports.deploy = deploy;