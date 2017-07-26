const React = require('react');
const Component = React.Component;

const View = require('react-native').View;
const Text = require('react-native').Text;
const StyleSheet = require('react-native').StyleSheet;
const Immutable = require('immutable');

const activeComponentStore = require('./activeComponentStore');

class StateTrackerNative extends Component {

    state = {
        State: {},
        Props: {}
    }

    componentWillMount() {
        activeComponentStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        activeComponentStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            State: activeComponentStore.getState(),
            Props: activeComponentStore.getProps()
        });
    }

    render () {
        const combinedState = { Store: this.props.appState, ...this.state };
        return (
            <View style={styles.stateTracker} ><Text style={{fontSize: 20}} onPress={()=>console.log(Immutable.fromJS(combinedState).toJS())}>Log State</Text></View>
        )
    }
}

module.exports = StateTrackerNative;

const styles = StyleSheet.create({
    stateTracker: {
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderColor: 'blue',
        width: 100,
        height: 30,
        position: 'absolute',
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
