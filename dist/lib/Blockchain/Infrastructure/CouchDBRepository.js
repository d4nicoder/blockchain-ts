"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var axios_1 = __importDefault(require("axios"));
var CouchDBRepository = /** @class */ (function () {
    function CouchDBRepository() {
        this.DATABASE = process.env.COUCH_DB_DATABASE;
    }
    CouchDBRepository.prototype.getHeaders = function () {
        var user = process.env.COUCH_DB_USER;
        var pass = process.env.COUCH_DB_PASS;
        return {
            'Content-Type': 'application/json',
            'Authorization': "Basic " + Buffer.from(user + ":" + pass).toString('base64')
        };
    };
    CouchDBRepository.prototype.query = function (url, method, body) {
        return __awaiter(this, void 0, void 0, function () {
            var buf, headers, port, uri, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buf = Buffer.from(body);
                        headers = __assign(__assign({}, this.getHeaders()), { 'Content-length': buf.length });
                        port = process.env.COUCH_DB_PORT ? parseInt(process.env.COUCH_DB_PORT, 10) : 5984;
                        uri = process.env.COUCH_DB_PROTOCOL + "://" + process.env.COUCH_DB_HOST + ":" + port + url;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.request({
                                url: uri,
                                method: method,
                                headers: headers,
                                data: buf
                            })];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1.response.data);
                        throw e_1;
                    case 4: return [2 /*return*/, res.data];
                }
            });
        });
    };
    CouchDBRepository.prototype.ensureDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbs, exists, method, url, indexMethod, indexUrl, indexBody, indexBody2, indexBody3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query('/_all_dbs', 'GET', '')];
                    case 1:
                        dbs = _a.sent();
                        exists = dbs.reduce(function (accum, db) {
                            if (db === _this.DATABASE) {
                                accum = true;
                            }
                            return accum;
                        }, false);
                        if (!!exists) return [3 /*break*/, 6];
                        method = 'PUT';
                        url = "/" + this.DATABASE;
                        return [4 /*yield*/, this.query(url, method, '')
                            // Create indexes
                        ];
                    case 2:
                        _a.sent();
                        indexMethod = 'POST';
                        indexUrl = "/" + this.DATABASE + "/_index";
                        indexBody = {
                            index: {
                                fields: [
                                    "index"
                                ]
                            },
                            name: 'transaction-index',
                            type: 'json'
                        };
                        return [4 /*yield*/, this.query(indexUrl, indexMethod, JSON.stringify(indexBody))];
                    case 3:
                        _a.sent();
                        indexBody2 = {
                            index: {
                                fields: [
                                    "previousHash"
                                ]
                            },
                            name: 'transaction-index',
                            type: 'json'
                        };
                        return [4 /*yield*/, this.query(indexUrl, indexMethod, JSON.stringify(indexBody2))];
                    case 4:
                        _a.sent();
                        indexBody3 = {
                            index: {
                                fields: [
                                    "hash"
                                ]
                            },
                            name: 'hash-index',
                            type: 'json'
                        };
                        return [4 /*yield*/, this.query(indexUrl, indexMethod, JSON.stringify(indexBody3))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CouchDBRepository.prototype.get = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, query, queryObject, method, url, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = criteria.value();
                        query = { $and: [] };
                        if (filter.date) {
                            query.$and.push({
                                date: {
                                    $gte: filter.date.from
                                }
                            });
                            query.$and.push({
                                date: {
                                    $lte: filter.date.to
                                }
                            });
                        }
                        if (filter.index) {
                            query.$and.push({
                                index: {
                                    $gte: filter.index.from
                                }
                            });
                            query.$and.push({
                                index: {
                                    $lte: filter.index.to
                                }
                            });
                        }
                        if (filter.hash) {
                            query.$and.push({
                                hash: filter.hash
                            });
                        }
                        if (filter.previousHash) {
                            query.$and.push({
                                previousHash: filter.previousHash
                            });
                        }
                        queryObject = {
                            selector: query,
                            sort: [
                                {
                                    index: "asc"
                                }
                            ]
                        };
                        method = 'POST';
                        url = "/" + this.DATABASE + "/_find";
                        return [4 /*yield*/, this.query(url, method, JSON.stringify(queryObject))];
                    case 1: return [4 /*yield*/, _a.sent()];
                    case 2:
                        results = _a.sent();
                        console.log(results);
                        return [2 /*return*/, results];
                }
            });
        });
    };
    CouchDBRepository.prototype.getLast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryObject, method, url, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryObject = {
                            selector: {},
                            sort: [
                                {
                                    "index": "desc"
                                }
                            ],
                            limit: 1
                        };
                        method = 'POST';
                        url = "/" + this.DATABASE + "/_find";
                        return [4 /*yield*/, this.query(url, method, JSON.stringify(queryObject))];
                    case 1:
                        docs = (_a.sent()).docs;
                        if (docs.length === 0) {
                            throw new Error('Blockchain is empty');
                        }
                        return [2 /*return*/, docs[0]];
                }
            });
        });
    };
    CouchDBRepository.prototype.addBlock = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            var object, insert, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureDatabase()];
                    case 1:
                        _a.sent();
                        object = block.getBlock();
                        insert = __assign({ _id: object.hash }, object);
                        url = "/" + this.DATABASE + "/" + object.hash;
                        return [4 /*yield*/, this.query(url, 'PUT', JSON.stringify(insert))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CouchDBRepository;
}());
exports.default = CouchDBRepository;
