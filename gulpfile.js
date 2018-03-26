const gulp = require("gulp");
const sourceMaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");

/* PostCSS Plugins */
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const customProperties = require("postcss-custom-properties");
const cssImports = require("postcss-import");

/*** CSS Task:
 * Combine Imports
 * Process Custom Properties
 * Add Prefixes
 * Create Source Maps (for easy debugging)
 */
gulp.task("css", function() {
  const plugins = [cssImports(), customProperties(), autoprefixer({ browsers: ["last 1 version"] })];

  return gulp
    .src("start.css")
    .pipe(sourceMaps.init())
    .pipe(postcss(plugins))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./dist"));
});

/***
 * Watch CSS Files for Changes
 */
gulp.task("css:watch", function() {
  gulp.watch("./*.css", ["css"]);
});

/**
 * Move HTML Files to ./dist directory
 */
gulp.task("html", function() {
  return gulp.src("index.html").pipe(gulp.dest("./dist"));
});

/**
 * Move Images to ./dist directory
 */
gulp.task("images", function() {
  return gulp.src("./images/*").pipe(gulp.dest("./dist/images"));
});

/**
 * Define our task runners (where to start)
 */
gulp.task("dev", ["css", "css:watch", "html", "images"]);

gulp.task("default", ["dev"]);
