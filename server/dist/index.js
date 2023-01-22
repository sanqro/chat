"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var keys_1 = __importDefault(require("./routes/keys"));
var auth_1 = __importDefault(require("./routes/auth"));
var users_1 = __importDefault(require("./routes/users"));
var checkAuth_1 = __importDefault(require("./middleware/checkAuth"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.disable("etag");
app.use("/keys", keys_1["default"]);
app.use("/auth", auth_1["default"]);
app.use("/users", checkAuth_1["default"], users_1["default"]);
app.get("/", function (req, res) {
    return res.status(200).json({
        msg: "This is the API for following application on GitHub: https://github.com/sanqro/chat"
    });
});
if (!process.env.DETA_RUNTIME) {
    app.listen(3001, function () { return console.log("Started on http://localhost:3001"); });
}
module.exports = app;
