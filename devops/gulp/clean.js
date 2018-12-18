const path = require("path");
const gulp = require("gulp");
const run = require("gulp-run-command").default;
const runSequence = require("run-sequence");

function createTasks(project) {
  const projectRoot = path.resolve(__filename, `../../@pii-${project}`);
  gulp.task(
    `clean-${project}`,
    run("rm -rdf node_modules && rm package-lock.json", { cwd: projectRoot })
  );
}

createTasks("scope");
createTasks("moduleLoader");
createTasks("di");
createTasks("application");
createTasks("server-express");
createTasks("router-express");

gulp.task("clean", function(callback) {
  runSequence(
    "clean-scope",
    "clean-moduleLoader",
    "clean-di",
    "clean-application",
    "clean-server-express",
    "clean-router-express",
    callback
  );
});
