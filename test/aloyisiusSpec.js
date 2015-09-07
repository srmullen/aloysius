import {expect} from "chai";
import _ from "lodash";
import * as aloysius from "../src/aloysius";

describe("aloysius", () => {

    describe("isConsonant", () => {
        let isConsonant = aloysius.isConsonant;
        it("should return true for all unisons, thirds, fourths, fifths, sixths and octaves", () => {
            expect(isConsonant(0)).to.be.true;
            expect(isConsonant(1)).to.be.false;
            expect(isConsonant(2)).to.be.false;
            expect(isConsonant(3)).to.be.true;
            expect(isConsonant(4)).to.be.true;
            expect(isConsonant(5)).to.be.false;
            expect(isConsonant(6)).to.be.false;
            expect(isConsonant(7)).to.be.true;
            expect(isConsonant(8)).to.be.true;
            expect(isConsonant(9)).to.be.true;
            expect(isConsonant(10)).to.be.false;
            expect(isConsonant(11)).to.be.false;
            expect(isConsonant(12)).to.be.true;
            expect(isConsonant(13)).to.be.false;
        });
    });

    describe("isDissonant", () => {
        let isDissonant = aloysius.isDissonant;
        it("should return true for seconds, tritones, and sevenths", () => {
            expect(isDissonant(0)).not.to.be.true;
            expect(isDissonant(1)).not.to.be.false;
            expect(isDissonant(2)).not.to.be.false;
            expect(isDissonant(3)).not.to.be.true;
            expect(isDissonant(4)).not.to.be.true;
            expect(isDissonant(5)).not.to.be.false;
            expect(isDissonant(6)).not.to.be.false;
            expect(isDissonant(7)).not.to.be.true;
            expect(isDissonant(8)).not.to.be.true;
            expect(isDissonant(9)).not.to.be.true;
            expect(isDissonant(10)).not.to.be.false;
            expect(isDissonant(11)).not.to.be.false;
            expect(isDissonant(12)).not.to.be.true;
            expect(isDissonant(13)).not.to.be.false;
        });
    });

    describe("isPerfect", () => {
        let isPerfect = aloysius.isPerfect;
        it("should return true for unisons, fifths, and octaves", () => {
            expect(isPerfect(0)).to.be.true;
            expect(isPerfect(1)).to.be.false;
            expect(isPerfect(2)).to.be.false;
            expect(isPerfect(3)).to.be.false;
            expect(isPerfect(4)).to.be.false;
            expect(isPerfect(5)).to.be.false;
            expect(isPerfect(6)).to.be.false;
            expect(isPerfect(7)).to.be.true;
            expect(isPerfect(8)).to.be.false;
            expect(isPerfect(9)).to.be.false;
            expect(isPerfect(10)).to.be.false;
            expect(isPerfect(11)).to.be.false;
            expect(isPerfect(12)).to.be.true;
            expect(isPerfect(13)).to.be.false;
        });
    });

    describe("isContrary", () => {
        let isContrary = aloysius.isContrary;
        it("should return true if voices move in opposite directions", () => {
            expect(isContrary([1, 4], [2, 3])).to.be.true; // voices move closer
            expect(isContrary([2, 3], [1, 4])).to.be.true; // voices move apart
        });

        it("should return false if motion is contrary or direct", () => {
            expect(isContrary([1, 4], [1, 3])).to.be.false; // oblique
            expect(isContrary([1, 4], [2, 5])).to.be.false; // direct
            expect(isContrary([2, 5], [1, 4])).to.be.false;
        });

        it("should return false if there is no motion", () => {
            expect(isContrary([1, 4], [1, 4])).to.be.false;
        });
    });

    describe("isDirect", () => {
        let isDirect = aloysius.isDirect;
        it("should return true if the voices move in the same direction", () => {
            expect(isDirect([1, 3], [4, 5])).to.be.true;
            expect(isDirect([4, 5], [1, 3])).to.be.true;
        });

        it("should return false if the movement is oblique or contrary", () => {
            expect(isDirect([1, 4], [2, 3])).to.be.false;
            expect(isDirect([2, 3], [1, 4])).to.be.false;
            expect(isDirect([1, 4], [1, 3])).to.be.false;
        });

        it("should return false if there is no motion", () => {
            expect(isDirect([1, 4], [1, 4])).to.be.false;
        });
    });

    describe("isOblique", () => {
        let isOblique = aloysius.isOblique;
        it("should return true if one part moves by step or skip while the other remains stationary", () => {
            expect(isOblique([1, 4], [1, 3])).to.be.true;
            expect(isOblique([1, 4], [2, 4])).to.be.true;
        });

        it("should return false if the movment is direct or contrary", () => {
            expect(isOblique([1, 3], [4, 5])).to.be.false;
            expect(isOblique([1, 4], [2, 3])).to.be.false;
        });

        it("should return false if there is no motion", () => {
            expect(isOblique([1, 4], [1, 4])).to.be.false;
        });
    });
});
