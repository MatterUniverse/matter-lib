var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("build", function () {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(ts({
              "module": "amd",
              "declaration": true,
              "outDir": "./dist",
              "strict": true,
              "noImplicitAny": false,
              "target": "es5",
              "lib": ["es2015", "es2017", "dom"],
              noImplicitAny: true,
              out: "output.js",
              moduleResolution: "node"
        }));
    return tsResult.js.pipe(gulp.dest("dist"));
});
