"use strict";

import * as palestrina from "palestrina.js";
import * as interval from "./interval";
import _ from "lodash";

/*
 * @param i {Number} - chromatic interval
 */
function isConsonant (i) {
    const consonances = [true, false, false, true, true, false, false, true, true, true, false, false];

    return consonances[i % 12];
}

const isDissonant = _.negate(isConsonant);

function isPerfect (i) {
    const perfectConsonances = [true, false, false, false, false, false, false, true, false, false, false, false];

    return perfectConsonances[i % 12];
}

function isImperfect (i) {
    const imperfectConsonances = [false, false, false, true, true, false, false, false, true, true, false, false];

    return imperfectConsonances[i % 12];
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

export {
    interval,

    isConsonant,
    isDissonant,
    isPerfect,
    isImperfect,
    isContrary,
    isDirect,
    isOblique,
    isValidStep
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
        isValidStep
    };
}
