"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var test_1 = __importDefault(require("./routes/test"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.disable("etag");
app.use("/test", test_1["default"]);
app.get("/", function (req, res) {
    return res.status(200).json({
        msg: "This is the API for following application on GitHub: https://github.com/sanqro/chat"
    });
});
if (!process.env.DETA_RUNTIME) {
    app.listen(3001, function () { return console.log("Started on http://localhost:3001"); });
}
module.exports = app;
