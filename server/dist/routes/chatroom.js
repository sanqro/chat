"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var deta_1 = require("deta");
var router = express_1["default"].Router();
var dotenv = __importStar(require("dotenv"));
var path_1 = __importDefault(require("path"));
var checkUser_1 = __importDefault(require("../middleware/checkUser"));
dotenv.config({ path: path_1["default"].resolve(__dirname, "../../.env") });
var projectKey = process.env.PROJECT_KEY;
var deta = (0, deta_1.Deta)(projectKey);
var chatroom = deta.Base("chatroom");
var users = deta.Base("users");
router.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var participantArray, msgArray, participantArraySorted, key, index, existing, chatroomJsonData, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                participantArray = req.body.participants;
                msgArray = req.body.messages;
                participantArraySorted = participantArray.sort(function (a, b) {
                    if (a.username < b.username)
                        return -1;
                });
                key = "";
                index = 0;
                _a.label = 1;
            case 1:
                if (!(index < participantArraySorted.length)) return [3, 4];
                key += participantArraySorted[index].username;
                return [4, users.get(participantArraySorted[index].username)];
            case 2:
                existing = _a.sent();
                if (existing === null) {
                    res.status(409).json({
                        error: "Failed to create the chatroom. There is no such user!"
                    });
                    return [2, false];
                }
                _a.label = 3;
            case 3:
                index++;
                return [3, 1];
            case 4:
                chatroomJsonData = {
                    key: key,
                    participantArray: participantArraySorted,
                    msgArray: msgArray
                };
                return [4, chatroom.insert(chatroomJsonData)];
            case 5:
                _a.sent();
                res.status(201).json({
                    participants: participantArraySorted,
                    msgArray: msgArray,
                    success: true
                });
                return [3, 7];
            case 6:
                err_1 = _a.sent();
                res.status(500).json({ error: err_1.message, success: false });
                return [3, 7];
            case 7: return [2];
        }
    });
}); });
router.post("/delete", checkUser_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, existing, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                key = req.body.key;
                existing = chatroom.get(key);
                if (!(existing === null)) return [3, 1];
                res.status(404).json({
                    error: "Failed to delete chatroom. This chatroom does not exist!"
                });
                return [3, 3];
            case 1: return [4, chatroom["delete"](key)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.status(200).json({
                    message: "Deleted chatroom",
                    success: true
                });
                return [3, 5];
            case 4:
                err_2 = _a.sent();
                res.status(500).json({ error: err_2.message, success: false });
                return [3, 5];
            case 5: return [2];
        }
    });
}); });
router.post("/send", checkUser_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newMsg, key, existing, currentMsg, updateRes, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newMsg = req.body.message;
                key = req.body.key;
                return [4, chatroom.get(key)];
            case 1:
                existing = _a.sent();
                if (existing === null) {
                    res.status(404).json({
                        error: "Failed to send message! This chatroom does not exist!",
                        success: false
                    });
                    return [2, false];
                }
                currentMsg = existing.msgArray;
                currentMsg.push(newMsg);
                existing.msgArray = currentMsg;
                delete existing.key;
                return [4, chatroom.update(existing, key)];
            case 2:
                updateRes = _a.sent();
                if (updateRes !== null) {
                    throw new Error("There was an issue sending your message!");
                }
                res.status(201).json({
                    message: "Sent message!",
                    success: true
                });
                return [3, 4];
            case 3:
                err_3 = _a.sent();
                err_3 instanceof Error
                    ? res.status(500).json({ message: err_3.message, success: false })
                    : res.status(500).json({ message: "Unknown Error occured!", success: false });
                return [3, 4];
            case 4: return [2];
        }
    });
}); });
router.post("/getMessages", checkUser_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var key, existing, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                key = req.body.key;
                return [4, chatroom.get(key)];
            case 1:
                existing = _a.sent();
                if (existing === null) {
                    res.status(404).json({
                        message: "Failed to get the messages! This chatroom does not exist!",
                        success: false
                    });
                    return [2, false];
                }
                delete existing.key && existing.participantArray;
                res.status(201).json({
                    messages: existing.msgArray,
                    success: true
                });
                return [3, 3];
            case 2:
                err_4 = _a.sent();
                err_4 instanceof Error
                    ? res.status(500).json({ message: err_4.message, success: false })
                    : res.status(500).json({ message: "Unknown Error occured!", success: false });
                return [3, 3];
            case 3: return [2];
        }
    });
}); });
exports["default"] = router;
