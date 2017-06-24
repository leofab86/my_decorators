'use strict';

var _reactRedux = require('react-redux');

var _stateTracker = require('./stateTrackerNative');

var _stateTracker2 = _interopRequireDefault(_stateTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapStateToProps = appState => {
	return { appState };
};

const STContainer = (0, _reactRedux.connect)(mapStateToProps)(_stateTracker2.default);

STContainer.displayName = 'STContainer';

exports.STContainer = STContainer;