'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setConfig = setConfig;
const { STContainer } = require('./stateTracker/STContainer');
const stateTrackerII = require('./stateTracker/stateTrackerHOC');

let config = {
	stateTracker: false,
	updateReports: { mount: false, update: false, pass: false, render: false }
};
exports.myDecoratorsConfig = config;
function setConfig(configObj) {
	exports.myDecoratorsConfig = _extends({}, config, configObj);
}

exports.STContainer = STContainer;

exports.stateTrackerII = stateTrackerII;


exports.updateReporterPP = require('./updateReporterHOC').updateReporterPP;

exports.updateReporterII = () => {
    const { updateReporterII } = require('./updateReporterHOC');
    return updateReporterII
}