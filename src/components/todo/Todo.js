import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { TodoHeader, TodoTextInput, TodoTabNavigation, TodoList } from '.'
import styles from './styles'
import { connect } from 'react-redux';
import { menuClicked } from '../../redux/todo/todo.actions'




class Todo extends Component {

    shouldComponentUpdate() {
        return false
    }
    clicked = () => {
        const { menuClicked, isMenuOpen } = this.props;
        Keyboard.dismiss();
        if (isMenuOpen) {
            menuClicked(false)
        }
    }
    render() {
        const { root } = styles;
        return (
            <View style={root} onStartShouldSetResponder={this.clicked}>
                <TodoHeader></TodoHeader>
                <TodoTextInput></TodoTextInput>
                <TodoTabNavigation></TodoTabNavigation>
                <TodoList></TodoList>
            </View>);
    }
}

const mapDispatchToProps = {
    menuClicked,
}

const mapStateToProps = (state) => ({
    isMenuOpen: state.todo.isMenuOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo);