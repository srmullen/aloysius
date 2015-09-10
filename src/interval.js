"use strict";

const intervals = [
    {degree: 0, name: "unison", perfect: true},
    {degree: 1, name: "second", minor: true, dissonant: true},
    {degree: 1, name: "second", major: true, dissonant: true},
    {degree: 2, name: "third", minor: true, consonant: true},
    {degree: 2, name: "third", major: true, consonant: true},
    {degree: 3, name: "fourth", dissonant: true},
    // {degree: 3, name: "fourth", augmented: true},
    {degree: 4, name: "fifth", diminished: true, dissonant: true},
    {degree: 4, name: "fifth", perfect: true},
    {degree: 5, name: "sixth", minor: true, consonant: true},
    {degree: 5, name: "sixth", major: true, consonant: true},
    {degree: 6, name: "seventh", minor: true, dissonant: true},
    {degree: 6, name: "seventh", major: true, dissonant: true}
];

/*
 * @param chromaticSteps {Number} The number of chromatic steps.
 * @return {Number} The interval degree
 */
function stepsToDegree (chromaticSteps) {
    const degrees = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];

    let octaves = Math.floor(chromaticSteps / 12),
        degree = degrees[chromaticSteps % 12] + 7 * octaves;

    return degree;
}

function reduce (interval) {
    return interval % 7;
}

function from (m1, m2) {
    return Math.max(m1, m2) - Math.min(m1, m2);
}

export {
    reduce,
    from,
    stepsToDegree
}
