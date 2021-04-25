import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, Keyboard } from 'react-native';
import styles from './styles'
import { globalStyles, labels } from '../../assets'
import { addNewAction } from '../../redux/todo/todo.actions'
import { connect } from 'react-redux';




class TodoTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: ''
        }
    }

    componentWillUnmount() {
        if (this.debounce) {
            clearTimeout(this.debounce)
        }
    }

    textInputRef = (ref) => { this.textInput = ref; }

    clearText = () => {
        this.setState({ todoText: "" })
    }

    onChangeText = (text) => {
        this.setState({ todoText: text })
    }
    addNew = () => {
        Keyboard.dismiss();
        if (this.debounce) {
            clearTimeout(this.debounce)
        }
        this.debounce = setTimeout(this.callAddNewAction, 200)
    }
    callAddNewAction = () => {
        const { addNewAction } = this.props;
        const { todoText } = this.state;
        if (todoText.length) {
            addNewAction(todoText)
            this.setState({ todoText: "" })
        }
    }
    render() {
        const { textInputWrapper, textInput } = styles;
        const { linkText } = globalStyles;
        const { ADD_NEW, TODO_TEXTINPUT_PLACEHOLDER } = labels;
        const { todoText } = this.state;
        return (<View style={textInputWrapper} >
            <TextInput
                value={todoText}
                onChangeText={this.onChangeText}
                ref={this.textInputRef}
                placeholder={TODO_TEXTINPUT_PLACEHOLDER}
                style={textInput}
                maxLength={50}
                multiline={false}
                numberOfLines={1}
            ></TextInput>
            <TouchableOpacity
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                onPress={this.addNew}
            >
                <Text style={linkText}>{ADD_NEW}</Text>
            </TouchableOpacity>
        </View>);
    }
}
const mapDispatchToProps = {
    addNewAction,
}

export default connect(null, mapDispatchToProps)(TodoTextInput);