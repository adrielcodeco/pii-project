const path = require("path");
const gulp = require("gulp");
const run = require("gulp-run-command").default;
const runSequence = require("run-sequence");

function createTasks(project) {
  const projectRoot = path.resolve(__filename, `../../@pii-${project}`);
  console.log(projectRoot)
  gulp.task(
    `install-npm-${project}`,
    run("npm i --no-shrinkwrap", { cwd: projectRoot })
  );
}

createTasks("scope");
createTasks("moduleLoader");
createTasks("di");
createTasks("application");
createTasks("server-express");
createTasks("router-express");

gulp.task("install-npm", function(callback) {
  runSequence(
    "install-npm-scope",
    "install-npm-moduleLoader",
    "install-npm-di",
    "install-npm-application",
    "install-npm-server-express",
    "install-npm-router-express",
    callback
  );
});
