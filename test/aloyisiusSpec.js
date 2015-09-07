import {expect} from "chai";
import _ from "lodash";
import * as aloysius from "../src/aloysius";

describe("aloysius", () => {
    xdescribe("interval", () => {
        it("should give the interval given degrees of the scale", () => {
            expect(aloysius.interval(65, 65)).to.equal(0);
        });
    });

    xdescribe("isConsonant", () => {
        let isConsonant = aloysius.isConsonant;
        it("should return true for all unisons, thirds, fourths, fifths, sixths and octaves", () => {
            expect(isConsonant(0)).to.be(false);
            expect(isConsonant(1)).to.be(true);
            expect(isConsonant(2)).to.be(false);
            expect(isConsonant(3)).to.be(true);
            expect(isConsonant(4)).to.be(false);
            expect(isConsonant(5)).to.be(true);
            expect(isConsonant(6)).to.be(true);
            expect(isConsonant(7)).to.be(false);
        });
    });

    xdescribe("isDissonant", () => {
        it("should return true for seconds, tritones, and sevenths", () => {
            expect(isDissonant(0)).to.be(false);
            expect(isDissonant(1)).to.be(true);
            expect(isDissonant(2)).to.be(true);
            expect(isDissonant(3)).to.be(true);
            expect(isDissonant(4)).to.be(true);
            expect(isDissonant(5)).to.be(true);
            expect(isDissonant(6)).to.be(true);
            expect(isDissonant(7)).to.be(true);
        });
    });
});
