"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BlockCriteria_1 = __importDefault(require("../Domain/ValueObjects/BlockCriteria"));
describe('BlockCriteria', function () {
    it('should return and empty object', function () {
        var criteria = new BlockCriteria_1.default({});
        expect(criteria.value()).toEqual({});
    });
    it('should return empty date when missing to parameter', function () {
        var data = {
            date: {
                from: 1234
            }
        };
        // @ts-ignore
        var criteria = new BlockCriteria_1.default(data);
        expect(criteria.value()).toEqual({});
    });
    it('should return empty date when missing from parameter', function () {
        var data = {
            date: {
                to: 1234
            }
        };
        // @ts-ignore
        var criteria = new BlockCriteria_1.default(data);
        expect(criteria.value()).toEqual({});
    });
    it('should return empty index when missing from', function () {
        var data = {
            index: {
                to: 1
            }
        };
        // @ts-ignore
        var criteria = new BlockCriteria_1.default(data);
        expect(criteria.value()).toEqual({});
    });
    it('should return empty index when missing to', function () {
        var data = {
            index: {
                from: 1
            }
        };
        // @ts-ignore
        var criteria = new BlockCriteria_1.default(data);
        expect(criteria.value()).toEqual({});
    });
    it('should return correct date on criteria object', function () {
        var data = {
            date: {
                from: 1,
                to: 2
            }
        };
        var criteria = new BlockCriteria_1.default(data);
        expect(criteria.value()).toEqual({ date: { from: 1, to: 2 } });
    });
    it('should return correct index on criteria object', function () {
        var data = {
            index: {
                from: 1,
                to: 2
            }
        };
        var criteria = new BlockCriteria_1.default(data);
        expect(criteria.value()).toEqual({ index: { from: 1, to: 2 } });
    });
});
