"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, data, previousHash) {
        if (previousHash === void 0) { previousHash = ''; }
        this.date = Date.now();
        this.nonce = 0;
        if (typeof index !== 'number' || index < 0) {
            throw new Error('Index should be greater or equal to zero');
        }
        if (typeof previousHash !== 'string') {
            throw new Error('Previous hash must to be a string');
        }
        this.index = index;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
    }
    Block.prototype.getBlock = function () {
        return {
            index: this.index,
            date: this.date,
            data: this.data,
            previousHash: this.previousHash,
            nonce: this.nonce,
            hash: this.hash
        };
    };
    Block.prototype.createHash = function () {
        return crypto_js_1.SHA256(this.index.toString() + this.date.toString() + this.data + this.previousHash + this.nonce.toString()).toString();
    };
    Block.prototype.mine = function (difficulty) {
        var startString = Array(difficulty).fill('0').join('');
        var startTime = Date.now();
        while (!this.hash.startsWith(startString)) {
            this.nonce++;
            this.hash = this.createHash();
        }
        //console.log(`Block mined. Time elapsed: ${Date.now() - startTime} ms. Iterations: ${this.nonce}`)
    };
    return Block;
}());
exports.default = Block;
