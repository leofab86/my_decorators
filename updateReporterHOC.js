'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateReporterII = updateReporterII;
exports.updateReporterPP = updateReporterPP;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getConfig = function () {
	const config = require('./decorators').myDecoratorsConfig;
	return config;
};

function updateReporterII(WrappedComponent) {
	var _class, _temp2;

	let updateReporterHOC_II = (_temp2 = _class = class updateReporterHOC_II extends WrappedComponent {
		constructor(...args) {
			var _temp;

			return _temp = super(...args), this.name = WrappedComponent.displayName || WrappedComponent.name, this.updateReports = getConfig().updateReports, _temp;
		}

		componentDidMount(){
			if (!this.updateReports.update && !this.updateReports.pass) delete this.__proto__.shouldComponentUpdate;
			if (this.updateReports.mount) console.log([`MOUNT ${this.name}`, {PROPS:this.props, STATE:this.state}])
			if (super.componentDidMount) super.componentDidMount()
		}

		shouldComponentUpdate(nextProps, nextState) {
			let superReturn = null;
			if (super.shouldComponentUpdate) {
				superReturn = super.shouldComponentUpdate(nextProps, nextState);
				if (superReturn !== true && superReturn !== false) superReturn = null;
			}
			let report = {
				updateCausers: [],
				STATE: {},
				PROPS: {}
			};

			let shouldUpdate = false;
			const name = this.name;

			const compare = (next, current, type) => {

				for (var key in next) {
					if (next[key] == current[key]) {
						report[type][key] = ['Pass: Referance Comparison Passed', current[key], next[key]];
					} else {
						if (typeof next[key] !== 'object') {
							report[type][key] = [`Update: non objects are diff`, current[key], next[key]];
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;
						} else {
							report[type][key] = [`Update: object referance comparison failed`, current[key], next[key]];
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;
						}
					}
				}
			};

			compare(nextState, this.state, 'STATE');
			compare(nextProps, this.props, 'PROPS');

			let reportContainer = shouldUpdate ? [`UPD ${name}`] : [`Pass ${name}`];
			reportContainer.push(report);

			if (superReturn !== null) {
				console.log(`${name} SuperReturn Overide ${superReturn}`);
				console.log(reportContainer);
				return superReturn;
			}

			if (shouldUpdate && this.updateReports.update) console.log(reportContainer);
			if (!shouldUpdate && this.updateReports.pass) console.log(reportContainer);

			return shouldUpdate;
		}

		render() {
			if(this.updateReports.render) console.log([`RNDR ${this.name}`, {STATE:this.state, PROPS:this.props}]);
			return super.render();
		}
	}, _class.displayName = WrappedComponent.displayName || WrappedComponent.name, _temp2);


	return updateReporterHOC_II;
}

function updateReporterPP(WrappedComponent) {
	var _class2, _temp4;

	let updateReporterHOC_PP = (_temp4 = _class2 = class updateReporterHOC_PP extends _react2.default.PureComponent {
		constructor(...args) {
			var _temp3;

			return _temp3 = super(...args), this.name = WrappedComponent.displayName || WrappedComponent.name, this.updateReports = getConfig().updateReports, _temp3;
		}

		componentDidMount(){
			if (!this.updateReports.update && !this.updateReports.pass) delete this.__proto__.shouldComponentUpdate;
			if (this.updateReports.mount) console.log([`MOUNT ${this.name}`, {PROPS:this.props, STATE:this.state}])
			if (super.componentDidMount) super.componentDidMount()
		}

		shouldComponentUpdate(nextProps) {
			let report = {
				updateCausers: [],
				PROPS: {}
			};

			let shouldUpdate = false;
			const name = this.name;

			const compare = (next, current, type) => {

				for (var key in next) {
					if (next[key] == current[key]) {
						report[type][key] = ['Pass: Referance Comparison Passed', current[key], next[key]];
					} else {
						if (typeof next[key] !== 'object') {
							report[type][key] = [`Update: non objects are diff`, current[key], next[key]];
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;
						} else {
							report[type][key] = [`Update: object referance comparison failed`, current[key], next[key]];
							report.updateCausers.push(`${type} - ${key}`);

							shouldUpdate = true;
						}
					}
				}
			};

			compare(nextProps, this.props, 'PROPS');

			let reportContainer = shouldUpdate ? [`UPD ${name}`] : [`Pass ${name}`];
			reportContainer.push(report);

			if (shouldUpdate && this.updateReports.update) console.log(reportContainer);
			if (!shouldUpdate && this.updateReports.pass) console.log(reportContainer);

			return shouldUpdate;
		}

		render() {
			if(this.updateReports.render) console.log([`RNDR ${this.name}`, {PROPS:this.props}]);
			return _react2.default.createElement(WrappedComponent, this.props);
		}
	}, _class2.displayName = WrappedComponent.displayName || WrappedComponent.name, _temp4);


	return updateReporterHOC_PP;
}