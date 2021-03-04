"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Block_1 = __importDefault(require("../Domain/ValueObjects/Block"));
describe('Block', function () {
    it('should generate the correct hash', function () {
        jest.spyOn(global.Date, 'now')
            .mockImplementationOnce(function () { return 1614880248673; });
        var block = new Block_1.default(0, 'Everything starts here', '');
        expect(block.getBlock().hash).toEqual('d684e13af0895b46d1325dffab33fdbb2ca8ec7921a13c9e2171b60d0832d720');
    });
    it('should fail when negative index provided', function () {
        expect(function () {
            var block = new Block_1.default(-1, 'Everything starts here', '');
        }).toThrow();
    });
    it('should fail when index is not a number', function () {
        expect(function () {
            // @ts-ignore
            var block = new Block_1.default('1', 'Everything starts here', '');
        }).toThrow();
    });
    it('should return block data', function () {
        var message = 'Everything starts here';
        var previousHash = '';
        jest.spyOn(global.Date, 'now')
            .mockImplementationOnce(function () { return 1614880248673; });
        var block = new Block_1.default(0, message, previousHash);
        var data = block.getBlock();
        expect(data.date).toBe(1614880248673);
        expect(data.data).toEqual(message);
        expect(data.previousHash).toEqual(previousHash);
        expect(data.hash).toEqual('d684e13af0895b46d1325dffab33fdbb2ca8ec7921a13c9e2171b60d0832d720');
        expect(data.index).toBe(0);
    });
    it('should thrown when previousHash is not a string', function () {
        expect(function () {
            // @ts-ignore
            var block = new Block_1.default(0, 'data', 123);
        }).toThrow();
    });
});
