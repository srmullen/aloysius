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


export {
    interval,

    isConsonant,
    isDissonant,
    isPerfect
};

if (typeof window === "object") {
	window.aloysius = {
        interval,

        isConsonant,
        isDissonant,
        isPerfect
    };
}
