import {expect} from "chai";
import _ from "lodash";
import * as interval from "../src/interval";

describe("interval", () => {
    describe("reduce", () => {
        it("should reduce interval octave expansions to their smallest form", () => {
            expect(interval.reduce(4)).to.equal(4);
            expect(interval.reduce(7)).to.equal(0);
            expect(interval.reduce(8)).to.equal(1);
            expect(interval.reduce(12)).to.equal(5);
        });
    });

    describe("from", () => {
        it("should return the interval degree of two midi numbers", () => {
            expect(interval.from(1, 1)).to.eql(0);
            expect(interval.from(60, 71)).to.eql(6);
            expect(interval.from(60, 72)).to.eql(7);
        });
    });
});
