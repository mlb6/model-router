var gulp = require('gulp');
var browserSync = require("browser-sync");
var es5buildDev = require("./tools/es5build");


gulp.task("build", function () {
    es5buildDev({
        src : "src/",
        dest: "dist/",
        modules: "instantiate"
    });
});

gulp.task("example-build", ['example-copy-lib'], function () {
    es5buildDev({
        src : "example/src/",
        dest: "example/dist/",
        modules: "instantiate"
    });
});

gulp.task("example-copy-lib", function () {
    gulp.src([
        "node_modules/systemjs/dist/system.*",
        "node_modules/systemjs/node_modules/es6-module-loader/dist/es6-module-loader.*"])
        .pipe(gulp.dest("example/dist"))
});

gulp.task("serve", function () {
    browserSyncInit(".", [
        "./**/*.css",
        "./**/*.js",
        "./**/*.map",
        "./**/*.es6",
        "./**/*.html"
    ] );
});

function browserSyncInit(baseDir, files, browser, notify) {
    browser = browser === undefined ? "default" : browser;
    notify = notify === undefined ? true : notify;

    /*    var routes = {
     "/bower_components": "./bower_components",
     "/node_modules":"./node_modules"
     }; */

    browserSync.init(files, {
        startPath: "example/index.html",
        server: {
            baseDir: baseDir,
            directory:true
            //routes: routes
        },
        browser: browser,
        notify: notify
    });

}


