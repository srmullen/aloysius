const PERFECT = 1;
const IMPERFECT = 2;
const DISSONANT = 3;

/*
 * Checks that properties of an interval are valid.
 */
function validate ({degree, }) {

}

function isValid (interval) {
    try {
        validate(interval);
    } catch (e) {
        return false;
    }
    return true;
}

function get (chromaticDiff) {
    const intervals = [
        {degree: 0, name: "unison"},
        {degree: 1, name: "second", minor: true},
        {degree: 1, name: "second", major: true},
        {degree: 2, name: "third", minor: true},
        {degree: 2, name: "third", major: true},
        {degree: 3, name: "fourth"},
        // {degree: 3, name: "fourth", augmented: true},
        {degree: 4, name: "fifth", diminished: true},
        {degree: 4, name: "fifth"},
        {degree: 5, name: "sixth", minor: true},
        {degree: 5, name: "sixth", major: true},
        {degree: 6, name: "seventh", minor: true},
        {degree: 6, name: "seventh", major: true}
    ];

    return intervals[chromaticDiff];
}

function reduce (interval) {
    return interval % 7;
}

function from (m1, m2) {
    return get(m2 - m1);
}

export {
    PERFECT,
    IMPERFECT,
    DISSONANT,

    isValid,
    reduce,
    from
}
