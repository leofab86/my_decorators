'use strict';

var React = require('react');
var exportInternalState = require('./exportInternalState');

const getConfig = function () {
	const config = require('../decorators').myDecoratorsConfig;
	return config;
};

module.exports = function (WrappedComponent) {
	let STHOC = class STHOC extends WrappedComponent {
		constructor(...args) {
			var _temp;

			return _temp = super(...args), this.name = WrappedComponent.displayName || WrappedComponent.name, this.stateTracker = getConfig().stateTracker, _temp;
		}

		componentDidMount() {
			if (!this.stateTracker) {
				delete this.__proto__.componentWillUnmount;
				delete this.__proto__.componentDidUpdate;
			}
			if (super.componentDidMount) super.componentDidMount();

			exportInternalState.updateProps(this, this.props);
			if (this.state) exportInternalState.updateState(this, this.state);
			exportInternalState.emit();
		}

		componentWillUnmount() {
			if (super.componentWillUnmount) super.componentWillUnmount();

			exportInternalState.unmount(this);
		}

		componentDidUpdate() {
			if (super.componentDidUpdate) super.componentDidUpdate();

			exportInternalState.updateProps(this, this.props);
			if (this.state) exportInternalState.updateState(this, this.state);
			exportInternalState.emit();
		}

		render() {
			return super.render();
		}
	};


	STHOC.displayName = WrappedComponent.displayName || WrappedComponent.name;

	return STHOC;
};