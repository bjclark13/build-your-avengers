const gulp = require("gulp");

const browserSync = require("browser-sync");
const reload = browserSync.reload;

const concat = require('gulp-concat');

const uglify = require("gulp-uglify-es").default;

const concatFiles = _ => gulp
  .src([
    "./public/app.module.js",
    "./public/app.controller.js",
    "./public/hero.service.js",
    "./public/components/hero-list/heroList.js",
    "./public/components/hero-roster/heroRoster.js",
    "./public/components/add-hero-form/addHeroForm.js",
    "./public/components/team-list/teamList.js",
  ]).pipe(concat("main.js")).pipe(gulp.dest("public/js"));

gulp.task("concat", concatFiles);

const lineOne = (done) => {
    console.log("Nice to meet, where you been?");
    done();
};

gulp.task("runServer", () => {
  browserSync({
    server: {
      baseDir: "./public"
    }
  });
  gulp.watch([
    "./public/app.module.js",
    "./public/app.controller.js",
    "./public/hero.service.js",
    "./public/components/hero-list/heroList.js",
    "./public/components/hero-roster/heroRoster.js",
    "./public/components/add-hero-form/addHeroForm.js",
    "./public/components/team-list/teamList.js",
    ]).on("change", () => {
      concatFiles();

      console.log('deploying changes');
  });

  
  gulp.watch(['./public/js/main.js']).on("change", () => {
    console.log('reloading main');
    reload();
  });


});

const minify = _ => gulp.src("public/js/main.js").pipe(uglify()).pipe(gulp.dest("public/js"));
gulp.task("minify", minify);

gulp.task("default", lineOne);

const nodemon = require('gulp-nodemon');

// Watch for changes in back end code, restart npm and reload browser
const restartServer = (cb) => {
    let called = false;
    return nodemon({ script: "server.js" })
      .on("start", _ => { if (!called) { called = true; cb(); } })
      .on("restart", _ => { 
          console.log('Reloading browser');
          setTimeout(_ => reload(), 1000);
     });
};
  
// Watch for changes in front end code, reload on changes
const restartBrowser = _ => {
    browserSync({ proxy: "localhost:5000", port: 8080, notify: true });
    gulp.watch(["**/*.html", "**/*.css", "**/*.js"], { cwd: "public" }, reload);
};
gulp.task("restartServer", restartServer);
gulp.task("restartBrowser", gulp.series(("restartServer"), restartBrowser));