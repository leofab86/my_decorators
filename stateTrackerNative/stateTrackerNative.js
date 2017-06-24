import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import activeComponentStore from './activeComponentStore'

export default class StateTrackerNative extends Component {

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
            <View style={styles.stateTracker} ><Text style={{fontSize: 20}} onPress={()=>console.log(combinedState)}>Log State</Text></View>
        )
    }
}

const styles = StyleSheet.create({
    stateTracker: {
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderColor: 'blue',
        width: 100,
        height: 30,
        position: 'absolute',
        right: 0,
        bottom: 0
    }
})
