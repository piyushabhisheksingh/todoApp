import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'


class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{"HomeScreen"}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    // themeStyle: state.theme,
})
const mapDispatchToProps = (dispatch) => ({
    // sendAccessCode: (success, error) => dispatch(sendAccessCode(success, error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);