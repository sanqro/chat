"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
app.get("/", function (req, res) {
    return res.send("This is the api for following application on GitHub: https://github.com/sanqro/chat");
});
if (!process.env.DETA_RUNTIME) {
    app.listen(3001, function () { return console.log("Started on http://localhost:3001"); });
}
module.exports = app;
