"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jishaku = void 0;
var child_process = require("child_process");
var isShRunning = false;
var Logger = /** @class */ (function () {
    function Logger(funcName) {
        if (funcName === void 0) { funcName = "default"; }
        this.funcName = funcName;
    }
    Logger.prototype.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.info.apply(console, __spreadArray([["Jishaku.ts: ".concat(this.funcName, " (INFO)")]], message, false));
    };
    Logger.prototype.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.error.apply(console, __spreadArray([["Jishaku.ts: ".concat(this.funcName, " (ERROR)")]], message, false));
    };
    return Logger;
}());
var Jishaku = /** @class */ (function () {
    function Jishaku(client, config) {
        this.client = client;
        this.config = config;
        var logger = new Logger("init");
        logger.info("=====Jishaku.ts=====\n", "Initialization of Jishaku.ts is complete!\n", "=====Jishaku.ts=====");
    }
    Jishaku.prototype.onMessageCreated = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var isMessageSended, currentContent, createdMessage, command_1, spawnProcess, logger_1, timeout_1, logger, command, codeBlockRegex, codeMatch, result, resultString, error_1, errortostring, logger;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isMessageSended = false;
                        currentContent = "";
                        createdMessage = {};
                        if (!this.config.useableUserId.includes(message.author.id))
                            return [2 /*return*/];
                        if (!message.content.startsWith(this.config.prefix + "jsk"))
                            return [2 /*return*/];
                        if (!message.content.startsWith(this.config.prefix + "jsk sh ")) return [3 /*break*/, 1];
                        if (isShRunning && !this.config.allowMultiShRunning) {
                            message.reply("You are trying to run multiple sh processes, but cannot because the allowMultiShRunning option is disabled.\nAlso, use of the allowMultiShRunning option is deprecated.");
                        }
                        command_1 = message.content.replace(this.config.prefix + "jsk sh ", "");
                        spawnProcess = child_process.spawn("cmd", ["/c", command_1]);
                        isShRunning = true;
                        (_a = spawnProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                            currentContent += data.toString("utf-8");
                        });
                        logger_1 = new Logger("shell");
                        timeout_1 = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 8, , 9]);
                                        if (!isMessageSended) return [3 /*break*/, 5];
                                        if (!createdMessage) return [3 /*break*/, 2];
                                        return [4 /*yield*/, createdMessage.edit("\n```Command: ".concat(command_1, " \n\n").concat(currentContent.length > 1900
                                                ? currentContent.slice(currentContent.length - 1900)
                                                : currentContent, "```"))];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, message.reply("\n```Command: ".concat(command_1, " \n\n").concat(currentContent.length > 1900
                                            ? currentContent.slice(currentContent.length - 1900)
                                            : currentContent, "```"))];
                                    case 3:
                                        createdMessage = _a.sent();
                                        _a.label = 4;
                                    case 4: return [3 /*break*/, 7];
                                    case 5:
                                        isMessageSended = true;
                                        return [4 /*yield*/, message.reply("\n```Command: ".concat(command_1, " \n\n").concat(currentContent.length > 1900
                                                ? currentContent.slice(currentContent.length - 1900)
                                                : currentContent, "```"))];
                                    case 6:
                                        createdMessage = _a.sent();
                                        _a.label = 7;
                                    case 7: return [3 /*break*/, 9];
                                    case 8:
                                        error_2 = _a.sent();
                                        logger_1.error("An error has occurred.", error_2);
                                        return [3 /*break*/, 9];
                                    case 9: return [2 /*return*/];
                                }
                            });
                        }); }, 2000);
                        spawnProcess.on("close", function () { return __awaiter(_this, void 0, void 0, function () {
                            var error_3, tempLogMsgId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        isShRunning = false;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 9, , 10]);
                                        if (!isMessageSended) return [3 /*break*/, 6];
                                        if (!createdMessage) return [3 /*break*/, 3];
                                        return [4 /*yield*/, createdMessage.edit("\n```Command: ".concat(command_1, " \n\n").concat(currentContent.length > 1900
                                                ? currentContent.slice(currentContent.length - 1900)
                                                : currentContent, "```"))];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, message.reply("\n```Command: ".concat(command_1, " \n\n").concat(currentContent.length > 1900
                                            ? currentContent.slice(currentContent.length - 1900)
                                            : currentContent, "```"))];
                                    case 4:
                                        createdMessage = _a.sent();
                                        _a.label = 5;
                                    case 5: return [3 /*break*/, 8];
                                    case 6:
                                        isMessageSended = true;
                                        return [4 /*yield*/, message.reply("\n```Command: ".concat(command_1, " \n\n").concat(currentContent.length > 1900
                                                ? currentContent.slice(currentContent.length - 1900)
                                                : currentContent, "```"))];
                                    case 7:
                                        createdMessage = _a.sent();
                                        _a.label = 8;
                                    case 8: return [3 /*break*/, 10];
                                    case 9:
                                        error_3 = _a.sent();
                                        logger_1.error("An error has occurred.", error_3);
                                        return [3 /*break*/, 10];
                                    case 10:
                                        tempLogMsgId = createdMessage.id;
                                        createdMessage.react("✅");
                                        clearInterval(timeout_1);
                                        isMessageSended = false;
                                        createdMessage = {};
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 24];
                    case 1:
                        if (!message.content.startsWith(this.config.prefix + "jsk js ")) return [3 /*break*/, 20];
                        logger = new Logger("javascript");
                        command = message.content.replace(this.config.prefix + "jsk js ", "");
                        codeBlockRegex = /^```(?:js)?\n([\s\S]*?)\n```$/;
                        codeMatch = command.match(codeBlockRegex);
                        if (codeMatch) {
                            command = codeMatch[1];
                        }
                        return [4 /*yield*/, message.react('🔄')];
                    case 2:
                        _b.sent();
                        if (!(command.includes('child_process') || command.includes("fs") || command.includes("path"))) return [3 /*break*/, 5];
                        return [4 /*yield*/, message.reply({ content: "[the command contains restricted characters.]" })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, message.react('❌')];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                    case 5:
                        if (!(command.includes('client.ws.client.token') || command.includes('token'))) return [3 /*break*/, 8];
                        return [4 /*yield*/, message.reply({ content: "[token anonymous]" })];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, message.react('❌')];
                    case 7:
                        _b.sent();
                        return [2 /*return*/];
                    case 8:
                        _b.trys.push([8, 16, , 19]);
                        return [4 /*yield*/, eval("(async () => { ".concat(command, " })()"))];
                    case 9:
                        result = _b.sent();
                        return [4 /*yield*/, message.react('✅')];
                    case 10:
                        _b.sent();
                        resultString = String(result);
                        if (!(resultString.includes(this.client.ws.client.token) || resultString.includes('child_process') || resultString.includes("fs") || resultString.includes("path"))) return [3 /*break*/, 13];
                        return [4 /*yield*/, message.reply({ content: "[token anonymous]" })];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, message.react('❌')];
                    case 12:
                        _b.sent();
                        return [2 /*return*/];
                    case 13: return [4 /*yield*/, message.reply("```\n" + resultString + "\n```")];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15: return [3 /*break*/, 19];
                    case 16:
                        error_1 = _b.sent();
                        errortostring = new Error(error_1).stack;
                        logger.error(errortostring);
                        return [4 /*yield*/, message.react('❌')];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, message.reply("```js\n" + errortostring + "\n```")];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 19];
                    case 19: return [3 /*break*/, 24];
                    case 20:
                        if (!message.content.startsWith(this.config.prefix + "jsk shutdown")) return [3 /*break*/, 22];
                        logger = new Logger("shutdown");
                        return [4 /*yield*/, message.reply("Goodbye👋")];
                    case 21:
                        _b.sent();
                        this.client.destroy();
                        process.exit(0);
                        return [3 /*break*/, 24];
                    case 22:
                        if (!message.content.startsWith(this.config.prefix + "jsk help")) return [3 /*break*/, 24];
                        return [4 /*yield*/, message.reply({ content: "```\nsh:[Use: .jsk sh <shell command>]\njs:[Use: .jsk js <javascript code>]\nshutdown:[Use: .jsk shutdown <arguments is none>]```" })];
                    case 23:
                        _b.sent();
                        _b.label = 24;
                    case 24: return [2 /*return*/];
                }
            });
        });
    };
    return Jishaku;
}());
exports.Jishaku = Jishaku;
