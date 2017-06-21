'use strict';

console.log('test version 22');

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setConfig = setConfig;
const { STContainer } = require('./stateTracker/STContainer');
const stateTrackerII = require('./stateTracker/stateTrackerHOC');

let config = {
	stateTracker: true,
	updateReports: { mount: false, update: false, pass: false, render: false }
};
exports.myDecoratorConfig = config;
function setConfig(configObj) {
	exports.myDecoratorConfig = _extends({}, config, configObj);
}

exports.STContainer = STContainer;

exports.stateTrackerII = stateTrackerII;

const { updateReporterPP, updateReporterII } = require('./updateReporterHOC');
exports.updateReporterPP = updateReporterPP;
exports.updateReporterII = updateReporterII;