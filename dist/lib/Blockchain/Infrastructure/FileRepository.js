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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var FileRepository = /** @class */ (function () {
    function FileRepository() {
        this.filename = path_1.default.resolve(path_1.default.join(__dirname, '..', '..', '..', '..', 'database', 'blockchain.json'));
    }
    FileRepository.prototype.ensureDir = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exists, stat, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exists = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.default.promises.stat(path_1.default.dirname(this.filename))];
                    case 2:
                        stat = _a.sent();
                        exists = stat.isDirectory();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('Database not exists, creating it');
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!exists) return [3 /*break*/, 7];
                        return [4 /*yield*/, fs_1.default.promises.mkdir(path_1.default.dirname(this.filename), { recursive: true })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this.filename, '{"blockchain": []}', { encoding: 'utf-8' })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FileRepository.prototype.readAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.default.promises.readFile(this.filename, { encoding: 'utf-8' })];
                    case 1:
                        data = _a.sent();
                        content = JSON.parse(data.toString());
                        return [2 /*return*/, content.blockchain];
                }
            });
        });
    };
    FileRepository.prototype.get = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var blockchain, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureDir()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readAll()];
                    case 2:
                        blockchain = _a.sent();
                        filter = criteria.value();
                        if (!filter.date && !filter.index) {
                            return [2 /*return*/, blockchain];
                        }
                        return [2 /*return*/, blockchain.filter(function (block) {
                                if (filter.date) {
                                    if (block.date < filter.date.from || block.date > filter.date.to) {
                                        return false;
                                    }
                                }
                                if (filter.index) {
                                    if (block.index < filter.index.from || block.index > filter.index.to) {
                                        return false;
                                    }
                                }
                                return true;
                            })];
                }
            });
        });
    };
    FileRepository.prototype.getLast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockchain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureDir()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readAll()];
                    case 2:
                        blockchain = _a.sent();
                        if (blockchain.length === 0) {
                            throw new Error('Blockchain is empty');
                        }
                        return [2 /*return*/, blockchain[blockchain.length - 1]];
                }
            });
        });
    };
    FileRepository.prototype.addBlock = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            var blockchain, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureDir()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.readAll()];
                    case 2:
                        blockchain = _a.sent();
                        blockchain.push(block.getBlock());
                        content = {
                            blockchain: blockchain
                        };
                        return [4 /*yield*/, fs_1.default.promises.writeFile(this.filename, JSON.stringify(content, null, 2), { encoding: 'utf-8' })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileRepository;
}());
exports.default = FileRepository;
