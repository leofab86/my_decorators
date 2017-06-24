'use strict';

var _dispatcher = require('./dispatcher');

var _STactionTypes = require('./STactionTypes');

var _STactionTypes2 = _interopRequireDefault(_STactionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exportInternalState = {

	unmount: component => {
		_dispatcher.activeComponentDispatcher.dispatch({
			actionType: _STactionTypes2.default.DELETE,
			keyPath: [component.name]
		});
	},

	updateState: (component, nextState) => {
		_dispatcher.activeComponentDispatcher.dispatch({
			actionType: _STactionTypes2.default.STATE,
			keyPath: [component.name],
			value: nextState
		});
	},

	updateProps: (component, nextState) => {
		_dispatcher.activeComponentDispatcher.dispatch({
			actionType: _STactionTypes2.default.PROPS,
			keyPath: [component.name],
			value: nextState
		});
	},

	emit: () => {
		_dispatcher.activeComponentDispatcher.dispatch({
			actionType: _STactionTypes2.default.EMIT
		});
	}
};

module.exports = exportInternalState;