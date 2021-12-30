const parseArgs = require("minimist")
// 預設參數
const defaultOptions = {
    string: "env",
    default: {
        env: "development"
    }
}
// 命令列接收參數
const options = parseArgs(process.argv.slice(2), defaultOptions);

exports.options = options;