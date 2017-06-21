'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _activeComponentStore = require('./activeComponentStore');

var _activeComponentStore2 = _interopRequireDefault(_activeComponentStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let StateTracker = class StateTracker extends _react2.default.Component {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.state = { State: {}, Props: {}, _expanded: [] }, _temp;
	}

	componentWillMount() {
		_activeComponentStore2.default.addChangeListener(this._onChange.bind(this));
	}

	componentWillUnmount() {
		_activeComponentStore2.default.removeChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		this.setState({
			State: _activeComponentStore2.default.getState(),
			Props: _activeComponentStore2.default.getProps()
		});
	}

	toggleList(id, event) {
		event.preventDefault();
		if (!this.state._expanded.includes(id)) {
			this.state._expanded.push(id);
		} else {
			this.state._expanded.splice(this.state._expanded.indexOf(id), 1);
		}
		this.setState(this.state);
	}

	renderState(state, index, parent, isArray) {
		let id;
		let wrapper = 'hiddenList';
		let log = '...';
		let listItem;
		let trimState = state;
		let title = parent;
		let expand = '->';

		switch (typeof state) {

			case 'object':
				if (state === null) {
					id = parent + "_" + index;
					return _react2.default.createElement(
						'li',
						{
							title: title,
							key: id
						},
						_react2.default.createElement(
							'span',
							null,
							index,
							' --> null'
						)
					);
				}
				if (!state) return;

				if (Array.isArray(state)) {
					id = parent + "_" + index;
					if (index === '_expanded') state = state.sort();
					if (this.state._expanded.includes(id)) {
						wrapper = '';expand = '|';
					}
					if (index === 'children') {
						state = state.map(function (mapState, mapIndex) {
							if (typeof mapState == 'function') {
								return mapState;
							}
							return { constructor: mapState.type.__proto__.prototype ? mapState.type.__proto__.prototype.constructor : mapState.type.name };
						}, this);
					}

					return _react2.default.createElement(
						'div',
						{ key: id },
						_react2.default.createElement(
							'button',
							{
								title: title,
								className: 'btn-link',
								onClick: this.toggleList.bind(this, id)
							},
							index,
							'[ ]'
						),
						_react2.default.createElement(
							'button',
							{ className: 'btn-link logButton', onClick: function (state) {
									console.log(state);
								}.bind(this, state) },
							log
						),
						_react2.default.createElement(
							'button',
							{ className: 'btn-info expandButton', onClick: this.toggleList.bind(this, id) },
							expand
						),
						_react2.default.createElement(
							'ul',
							{ className: wrapper },
							state.map(function (mapState, mapIndex) {
								return this.renderState(mapState, mapIndex, id, 'isArray');
							}, this)
						)
					);
				} else /*is object*/{
						if (!parent) {
							id = 'appState';
							wrapper = '';
							expand = null;
							//log = null
						} else id = parent + "_" + index;
						if (index === 'children' || parent === 'children') {
							state = { constructor: state.type.__proto__.prototype ? state.type.__proto__.prototype.constructor : state.type.name };
						}
						let array = [];
						let brackets = "{ }";

						for (var key in state) {
							if (state.hasOwnProperty(key)) {
								array.push(this.renderState(state[key], key, id));
							}
						}

						if (this.state._expanded.includes(id) && parent) {
							wrapper = '';expand = '|';
						}

						return _react2.default.createElement(
							'div',
							{ key: id },
							_react2.default.createElement(
								'button',
								{
									title: title,
									className: 'btn-link',
									onClick: this.toggleList.bind(this, id)
								},
								index || index == 0 ? `${index} ${brackets}` : null
							),
							_react2.default.createElement(
								'button',
								{ className: 'btn-link logButton', onClick: function (state) {
										console.log(state);
									}.bind(null, state) },
								log
							),
							expand && _react2.default.createElement(
								'button',
								{ className: 'btn-info expandButton', onClick: this.toggleList.bind(this, id) },
								expand
							),
							_react2.default.createElement(
								'ul',
								{ className: wrapper },
								array
							)
						);
					}
			case 'boolean':
			case 'function':
				{
					id = parent + "_" + index;
					trimState = state.toString();

					if (trimState.length > 40) {
						trimState = trimState.substring(0, 40) + '...';
						title = id + ' --> ' + state;
					}
					if (isArray) {
						listItem = _react2.default.createElement(
							'li',
							{
								title: title,
								key: id
							},
							_react2.default.createElement(
								'span',
								null,
								state.displayName,
								':  ',
								trimState
							)
						);
					} else {
						listItem = _react2.default.createElement(
							'li',
							{
								title: title,
								key: id
							},
							_react2.default.createElement(
								'span',
								null,
								index,
								' --> ',
								state.displayName,
								':  ',
								trimState
							)
						);
					}
					return listItem;
				}
			case 'number':
			case 'string':
				id = parent + "_" + index;
				if (trimState.length > 28) {
					trimState = trimState.substring(0, 28) + '...';
					title = id + ' --> ' + state;
				}
				if (parent === 'appState__expanded' && (state === 'appState__expanded' || state === 'appState')) {
					listItem = _react2.default.createElement(
						'li',
						{
							title: title,
							key: id,
						},
						_react2.default.createElement(
							'span',
							null,
							state
						)
					);
				} else if (parent === 'appState__expanded') {
					listItem = _react2.default.createElement(
						'li',
						{
							title: title,
							key: id,
							onClick: this.toggleList.bind(this, state)
						},
						_react2.default.createElement(
							'span',
							null,
							state
						)
					);
				} else if (isArray) {
					listItem = _react2.default.createElement(
						'li',
						{
							className: 'arrayList',
							title: title,
							key: id
						},
						_react2.default.createElement(
							'span',
							null,
							trimState
						)
					);
				} else {
					listItem = _react2.default.createElement(
						'li',
						{
							title: title,
							key: id
						},
						_react2.default.createElement(
							'span',
							null,
							index,
							' --> ',
							trimState
						)
					);
				}
				return listItem;
			case 'undefined':
				id = parent + "_" + index;
				return _react2.default.createElement(
					'li',
					{
						title: title,
						key: id
					},
					_react2.default.createElement(
						'span',
						null,
						index,
						' --> undefined'
					)
				);
			default:
				return _react2.default.createElement(
					'li',
					null,
					'What is this?'
				);
		}
	}

	render() {
		let combinedState = Object.assign({}, {Store: this.props.appState}, this.state);

		let wrapper = this.state._expanded.includes('appState') ? '' : 'hiddenList';

		return _react2.default.createElement(
			'div',
			{ className: 'stateTracker' },
			_react2.default.createElement(
				'button',
				{ className: 'btn-link', onClick: this.toggleList.bind(this, 'appState') },
				'AppState'
			),
			_react2.default.createElement(
				'ul',
				{ className: wrapper },
				this.renderState.bind(this)(combinedState)
			)
		);
	}
};
exports.default = StateTracker;