'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.myDecoratorsConfig = {
    // default config if any...
};

function setConfig (configObj) {
    exports.myDecoratorsConfig = _extends({}, exports.myDecoratorsConfig, configObj);
};
exports.setConfig = setConfig;


// ---------------------------- STATETRACKER -----------------------------------
// -----------------------------------------------------------------------------

setConfig({
    showStateTracker: true
})

exports.STContainer = require('./stateTracker/STContainer').STContainer;
exports.stateTrackerII = require('./stateTracker/stateTrackerHOC');

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------



// ---------------------------- UPDATEREPORTER ---------------------------------
// ------------------------------------------------------------------------------

setConfig({
    updateReports: { mount: false, update: false, pass: false, render: false }
})

exports.updateReporterPP = require('./updateReporterHOC').updateReporterPP;
exports.updateReporterII = require('./updateReporterHOC').updateReporterII;

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------