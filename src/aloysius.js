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

function step ([cantus1, voice1], [cantus2, voice2]) {
    let interval1 = interval.from(cantus1, voice1),
        interval2 = interval.from(cantus2, voice2);
}

export {
    interval,

    isConsonant,
    isDissonant,
    isPerfect,
    isContrary,
    isDirect,
    isOblique
};

if (typeof window === "object") {
	window.aloysius = {
        interval,

        isConsonant,
        isDissonant,
        isPerfect,
        isContrary,
        isDirect,
        isOblique
    };
}
