"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dispatcher = require('./dispatcher');

var _STactionTypes = require('./STactionTypes');

var _STactionTypes2 = _interopRequireDefault(_STactionTypes);

var _events = require('events');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CHANGE_EVENT = 'change';

let activeComponentState = _immutable2.default.fromJS({});
let activeProps = _immutable2.default.fromJS({});

const activeComponentStore = Object.assign({}, _events.EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getState: () => {
		return activeComponentState.toJS();
	},

	getProps: () => {
		return activeProps.toJS();
	}

});

_dispatcher.activeComponentDispatcher.register(action => {
	switch (action.actionType) {
		case _STactionTypes2.default.STATE:
			activeComponentState = activeComponentState.mergeIn(action.keyPath, action.value);
			break;

		case _STactionTypes2.default.PROPS:
			if (!Object.keys(action.value).length) {
				activeProps = activeProps.deleteIn(action.keyPath);
			} else activeProps = activeProps.mergeIn(action.keyPath, action.value);
			break;

		case _STactionTypes2.default.DELETE:
			activeProps = activeProps.deleteIn(action.keyPath);
			activeComponentState = activeComponentState.deleteIn(action.keyPath);
			activeComponentStore.emitChange();
			break;

		case _STactionTypes2.default.EMIT:
			activeComponentStore.emitChange();
			break;

		default:
		// no op
	}
});

exports.default = activeComponentStore;