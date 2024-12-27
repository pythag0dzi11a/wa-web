const gulp = require("gulp");
const fs = require("fs-extra");

gulp.task("post-build", async function() {
    fs.emptyDirSync("./dist/");
    fs.copySync("./backend/dist/app.js", "./dist/app.js");
    fs.copySync("./backend/dist/app.js.map", "./dist/app.js.map");
    fs.copySync("./backend/sql", "./dist/sql");
    fs.copySync("./frontend/dist", "./dist/public");
    fs.copySync("./build/package.run.json", "./dist/package.json");
    fs.copySync("./build/start.sh", "./dist/start.sh");
    fs.copySync("./build/start.bat", "./dist/start.bat");
});