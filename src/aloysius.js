"use strict";

import * as palestrina from "palestrina.js";
import * as interval from "./interval";
import _ from "lodash";

// Because js doesn't have a modulo operator
const mod = (n, m) => {
    if (n < 0 && m > 0) {
        n = n + (m * Math.ceil(Math.abs(n)/m));
    }
    return n % m;
}
/*
 * @param i {Number} - chromatic interval
 */
function isConsonant (i) {
    const consonances = [true, false, false, true, true, false, false, true, true, true, false, false];

    return consonances[mod(i, 12)];
}

const isDissonant = _.negate(isConsonant);

function isPerfect (i) {
    const perfectConsonances = [true, false, false, false, false, false, false, true, false, false, false, false];

    return perfectConsonances[mod(i, 12)];
}

function isImperfect (i) {
    const imperfectConsonances = [false, false, false, true, true, false, false, false, true, true, false, false];

    return imperfectConsonances[mod(i, 12)];
}

function isContrary ([cantus1, voice1], [cantus2, voice2]) {
    if (cantus1 > cantus2 && voice1 < voice2) {
        return true;
    } else if (cantus1 < cantus2 && voice1 > voice2) {
        return true;
    }

    return false;
}

function isDirect ([cantus1, voice1], [cantus2, voice2]) {
    if (cantus1 < cantus2 && voice1 < voice2) {
        return true;
    } else if (cantus1 > cantus2 && voice1 > voice2) {
        return true;
    }

    return false;
}

function isOblique ([cantus1, voice1], [cantus2, voice2]) {
    if (cantus1 === cantus2 && voice1 !== voice2) {
        return true;
    } else if (voice1 === voice2 && cantus1 !== cantus2) {
        return true;
    }

    return false;
}

/*
 * Given the mode as a translation function and the voices, returns true if all voices are in the mode, false otherwise.
 */
function inMode(mode, ...voices) {

}

function isValidStep (step1, step2) {
    let interval1 = interval.from(step1[0], step1[1]),
        interval2 = interval.from(step2[0], step2[1]);

    // Rule 1
    if (isPerfect(interval1) && isPerfect(interval2)) {
        return isContrary(step1, step2) || isOblique(step1, step2);
    }

    // Rule 2
    if (isPerfect(interval1) && isImperfect(interval2)) {
        return isContrary(step1, step2) || isDirect(step1, step2) || isOblique(step1, step2);
    }

    // Rule 3
    if (isImperfect(interval1) && isPerfect(interval2)) {
        return isContrary(step1, step2) || isOblique(step1, step2);
    }

    // Rule 4
    if (isImperfect(interval1) && isImperfect(interval2)) {
        return isContrary(step1, step2) || isDirect(step1, step2) || isOblique(step1, step2);
    }

    return false;
}

/*
 * @param cf - cantus firmus
 * @param cpt - counterpoint
 * @return - array of errors in the counterpoint. If there are no errors the array will be empty.
 */
function gradeFirstSpecies (cf, cpt) {
    let errors = [];
    for (let i = 1; i < cpt.length; i++) {
        if (!isValidStep([cf[i-1].pitch, cpt[i-1].pitch], [cf[i].pitch, cpt[i].pitch])) {
            errors.push("Error at " + i);
        }
    }

    return errors;
}

export {
    interval,

    isConsonant,
    isDissonant,
    isPerfect,
    isImperfect,
    isContrary,
    isDirect,
    isOblique,
    isValidStep,
    gradeFirstSpecies
};

if (typeof window === "object") {
	window.aloysius = {
        interval,

        isConsonant,
        isDissonant,
        isPerfect,
        isImperfect,
        isContrary,
        isDirect,
        isOblique,
        isValidStep,
        gradeFirstSpecies
    };
}
