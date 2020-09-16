const path = require("path")

module.exports = {
    entry: "./src/main.js",
    mode: "development",
    output: {
        filename: "p5.smoothColors.js",
        path: path.resolve(__dirname, "dist")
    }
}