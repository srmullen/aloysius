import {expect} from "chai";
import _ from "lodash";
import * as aloysius from "../src/aloysius";
import {scale, melody} from "palestrina.js";

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

    describe("isImperfect", () => {
        let isImperfect = aloysius.isImperfect;
        it("should return true for thirds and sixths", () => {
            expect(isImperfect(0)).to.be.false;
            expect(isImperfect(1)).to.be.false;
            expect(isImperfect(2)).to.be.false;
            expect(isImperfect(3)).to.be.true;
            expect(isImperfect(4)).to.be.true;
            expect(isImperfect(5)).to.be.false;
            expect(isImperfect(6)).to.be.false;
            expect(isImperfect(7)).to.be.false;
            expect(isImperfect(8)).to.be.true;
            expect(isImperfect(9)).to.be.true;
            expect(isImperfect(10)).to.be.false;
            expect(isImperfect(11)).to.be.false;
            expect(isImperfect(12)).to.be.false;
            expect(isImperfect(13)).to.be.false;
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

    describe("isValidStep", () => {
        let isValidStep = aloysius.isValidStep,
            cmaj = _.compose(scale.C, scale.major);
        describe("Rule 1 - From one perfect consonance to another perfect consonance, one must proceed in contrary or oblique motion", () => {
            it("should return true", () => {
                expect(isValidStep([cmaj(0), cmaj(7)], [cmaj(1), cmaj(5)])).to.be.true;
                expect(isValidStep([cmaj(3), cmaj(7)], [cmaj(0), cmaj(7)])).to.be.true;
            });

            it("should return false", () => {
                expect(isValidStep([cmaj(0), cmaj(7)], [cmaj(1), cmaj(8)])).to.be.false; // parallel octaves
                expect(isValidStep([cmaj(3), cmaj(7)], [cmaj(0), cmaj(4)])).to.be.false; // parallel fifths
                expect(isValidStep([cmaj(0), cmaj(7)], [cmaj(0), cmaj(7)])).to.be.false; // no motion
            });
        });

        describe("Rule 2 - 2. From a perfect consonance to an imperfect consonance one may proceed in any of the three motions.", () => {
            it("should return true", () => {
                expect(isValidStep([cmaj(0), cmaj(7)], [cmaj(1), cmaj(6)])).to.be.true; // contrary
                expect(isValidStep([cmaj(0), cmaj(7)], [cmaj(3), cmaj(8)])).to.be.true; // direct
                expect(isValidStep([cmaj(0), cmaj(4)], [cmaj(0), cmaj(2)])).to.be.true; // oblique
            });
        });

        describe("Rule 3 - From an imperfect consonance to a perfect consonance one must proceed by contrary or oblique motion.", () => {
            it("should return true", () => {
                expect(isValidStep([cmaj(1), cmaj(3)], [cmaj(0), cmaj(4)])).to.be.true; // contrary
                expect(isValidStep([cmaj(1), cmaj(3)], [cmaj(2), cmaj(2)])).to.be.true; // contrary
                expect(isValidStep([cmaj(0), cmaj(5)], [cmaj(0), cmaj(4)])).to.be.true; // oblique
            });

            it("should return false", () => {
                expect(isValidStep([cmaj(0), cmaj(2)], [cmaj(1), cmaj(5)])).to.be.false; // direct
                expect(isValidStep([cmaj(3), cmaj(8)], [cmaj(0), cmaj(7)])).to.be.false; // direct
            });
        });

        describe("Rule 4 - From one imperfect consonance to another imperfect consonance one may proceed in any of the three motions.", () => {
            it("should return true", () => {
                expect(isValidStep([cmaj(0), cmaj(5)], [cmaj(1), cmaj(3)])).to.be.true; // contrary
                expect(isValidStep([cmaj(0), cmaj(2)], [cmaj(1), cmaj(3)])).to.be.true; // direct
                expect(isValidStep([cmaj(0), cmaj(2)], [cmaj(0), cmaj(5)])).to.be.true; // oblique
            });

            it("should return false", () => {
                expect(isValidStep([cmaj(0), cmaj(3)], [cmaj(0), cmaj(3)])).to.be.false; // no motion
            });
        });

        describe("gradeFirstSpecies", () => {
            describe("Gradus ad Parnassum - Chapter 1 examples", () => {
                let ddor = _.compose(scale.D, scale.dorian),
                    talea = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    cantus = melody.where("pitch", ddor, melody.phrase(talea, [0, 2, 1, 0, 3, 2, 4, 3, 2, 1, 0]));

                it("should handle Fig. 5", () => {
                    let cpt = melody.where("pitch", ddor, melody.phrase(talea, [4, 4, 3, 4, 5, 6, 6, 5, 7, 6.5, 7]));
                    expect(aloysius.gradeFirstSpecies(cantus, cpt)).to.eql([]);
                });

                it("should handle Fig. 6", () => {
                    let ddorLower = _.compose(ddor, scale.lower),
                        failCpt = melody.where("pitch", ddorLower, melody.phrase(talea, [3, 7, 4, 2, 1, 0, 2, 6, 7, 6.5, 7])),
                        passCpt = melody.where("pitch", ddorLower, melody.phrase(talea, [0, 0, 4, 2, 1, 0, 2, 6, 7, 6.5, 7]));

                    expect(aloysius.gradeFirstSpecies(cantus, passCpt)).to.eql([]);
                    // expect(aloysius.gradeFirstSpecies(cantus, failCpt).length).to.equal(2);
                });
            });
        });
    });
});
