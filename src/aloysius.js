"use strict";

import * as palestrina from "palestrina.js";
import * as interval from "./interval";
import _ from "lodash";

const intervals = ["uni", "m2", "M2", "m3", "M3", "4", "tri", "5", "m6", "M6", "m7", "M7", "8"];

function stepsToInterval (steps) {
    const degrees = [];
}

/*
 * @param i {Number} - interval
 */
function isConsonant (i) {

}

const isDissonant = _.negate(isConsonant);

/*
 * @param mode
 * @param degree1 {Number}
 * @param degree2 {Number}
 */
// function interval (mode, degree1, degree2) {
//
// }


export {
    interval,
    isConsonant,
    isDissonant
};

if (typeof window === "object") {
	window.aloysius = {
        interval,
        isConsonant,
        isDissonant
    };
}
