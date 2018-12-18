const path = require("path");
const gulp = require("gulp");
const run = require("gulp-run-command").default;
const runSequence = require("run-sequence");

function createTasks(project) {
  const projectRoot = path.resolve(__filename, `../../@pii-${project}`);
  gulp.task(`${project}-lint`, run("node_modules/.bin/gulp lint", { cwd: projectRoot }));
  gulp.task(
    `${project}-typecheck`,
    run("node_modules/.bin/gulp typecheck", { cwd: projectRoot })
  );
  gulp.task(`${project}-build`, run("node_modules/.bin/gulp build", { cwd: projectRoot }));
  gulp.task(`build-${project}`, function(callback) {
    runSequence(
      `${project}-lint`,
      `${project}-typecheck`,
      `${project}-build`,
      callback
    );
  });
}

createTasks("scope");
createTasks("moduleLoader");
createTasks("di");
createTasks("application");
createTasks("server-express");
createTasks("router-express");

gulp.task("build", function(callback) {
  runSequence(
    "build-scope",
    "build-moduleLoader",
    "build-di",
    "build-application",
    "build-server-express",
    "build-router-express",
    callback
  );
});
