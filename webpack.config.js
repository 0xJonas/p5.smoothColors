const path = require("path")

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "p5.smoothColors.js",
        path: path.resolve(__dirname, "dist")
    }
}