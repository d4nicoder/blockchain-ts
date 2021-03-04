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
Object.defineProperty(exports, "__esModule", { value: true });
var NodeCouchDB = require('node-couchdb');
var CouchDBRepository = /** @class */ (function () {
    function CouchDBRepository() {
        this.DATABASE = 'blockchain';
        var port = process.env.COUCH_DB_PORT ? parseInt(process.env.COUCH_DB_PORT, 10) : 5984;
        this.connection = new NodeCouchDB({
            host: process.env.COUCH_DB_HOST,
            protocol: process.env.COUCH_DB_PROTOCOL,
            port: port,
            auth: {
                user: process.env.COUCH_DB_USER,
                pass: process.env.COUCH_DB_PASS
            }
        });
    }
    CouchDBRepository.prototype.get = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, query, queryObject, results;
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
                        queryObject = {
                            selector: query,
                            sort: [
                                {
                                    index: "asc"
                                }
                            ]
                        };
                        return [4 /*yield*/, this.connection.mango(this.DATABASE, queryObject, {})];
                    case 1:
                        results = _a.sent();
                        console.log(results);
                        return [2 /*return*/, results];
                }
            });
        });
    };
    CouchDBRepository.prototype.getLast = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryObject, docs, result;
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
                        return [4 /*yield*/, this.connection.mango(this.DATABASE, queryObject, {})];
                    case 1:
                        docs = (_a.sent()).data.docs;
                        result = docs[0];
                        if (!result) {
                            throw new Error('Blockchain is empty');
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CouchDBRepository.prototype.addBlock = function (block) {
        return __awaiter(this, void 0, void 0, function () {
            var object, insert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        object = block.getBlock();
                        insert = __assign({ _id: object.hash }, object);
                        return [4 /*yield*/, this.connection.insert(this.DATABASE, insert)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CouchDBRepository;
}());
exports.default = CouchDBRepository;
