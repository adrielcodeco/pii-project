const path = require("path");
const gulp = require("gulp");
const run = require("gulp-run-command").default;
const runSequence = require("run-sequence");

function createTasks(project) {
  const projectRoot = path.resolve(__filename, `../../@pii-${project}`);
  gulp.task(`test-${project}`, run("npm test", { cwd: projectRoot }));
}

createTasks("scope");
createTasks("moduleLoader");
createTasks("di");
createTasks("application");
createTasks("server-express");
createTasks("router-express");

gulp.task("test", function(callback) {
  runSequence(
    "test-scope",
    "test-moduleLoader",
    "test-di",
    "test-application",
    "test-server-express",
    "test-router-express",
    callback
  );
});
