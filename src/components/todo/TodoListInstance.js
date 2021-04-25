import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles'
import Icon from 'react-native-vector-icons/Entypo'
import Favorite from 'react-native-vector-icons/Ionicons'
import { colors, opacity, globalStyles, labels } from '../../assets';
import { favouriteClicked, menuClicked, setCompleted, editItem, deleteItem, saveState } from '../../redux/todo/todo.actions'
import normalize from '../../utls/normalize';




class TodoListInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoItem: this.props.item,
            editable: false
        }
        this.pos = 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.isMenuOpen != this.props.isMenuOpen) &&
            (nextProps.openMenuId == this.state.todoItem.id)) {
            return true
        }
        else if (nextProps.item != this.props.todoItem) {
            return true
        } else if (nextState.todoItem != this.props.todoItem) {
            return true
        } else if (this.state.editable != nextState.editable) {
            return true;
        }
        return false
    }

    onFavoriteClicked = () => {
        const { favouriteClicked, saveState } = this.props;
        let todoItem = Object.assign({}, this.state.todoItem);
        todoItem.isFavourites = !todoItem.isFavourites
        this.setState({ todoItem: todoItem })
        favouriteClicked(todoItem.id);
        saveState();

    }
    onMenuClicked = async () => {
        this.pos = await this.layout();
        const { menuClicked } = this.props;
        const { todoItem } = this.state;
        menuClicked(true, todoItem.id);
    }
    edit = () => {
        const { menuClicked } = this.props;
        if (this.state.editable == false) {
            menuClicked(false);
            this.setState({ editable: true },
                () => this.textInput.focus()
            )
        }
    }
    delete = () => {
        const { todoItem } = this.state;
        const { deleteItem, saveState } = this.props;
        deleteItem(todoItem.id)
        saveState()
    }
    completed = () => {
        const { setCompleted, saveState } = this.props;
        let todoItem = Object.assign({}, this.state.todoItem);
        todoItem.isCompleted = true
        todoItem.isFavourites = false
        this.setState({ todoItem: todoItem })
        setCompleted(todoItem.id)
        saveState()
    }
    onChangeText = (text) => {
        let todoItem = Object.assign({}, this.state.todoItem);
        todoItem.todoText = text
        this.setState({ todoItem: todoItem })
    }
    onBlur = () => {
        const { editItem, saveState } = this.props;
        const { todoItem } = this.state;
        editItem({ id: todoItem.id, todoText: todoItem.todoText })
        this.setState({ editable: false })
        saveState()
    }

    layout = () => {
        return new Promise((resolve) => {
            if (this.marker) {
                this.marker.measure((x, y, width, height, pageX, pageY) => {
                    resolve(pageY);
                })
            }
        })
    }


    getPos = () => {
        return this.pos;
    }

    render() {
        const { selectedFilter } = this.props;
        const { todoItem, editable } = this.state;
        const { todoText, isFavourites, isCompleted } = todoItem;
        const { todoItemWrapper, iconWrapper } = styles;
        const { listText } = globalStyles
        const { COMPLETED, FAVOURITES, ALL } = labels;
        return (<>
            {(selectedFilter == FAVOURITES && isFavourites == false) ||
                (selectedFilter == ALL && isCompleted == true) ||
                (selectedFilter == COMPLETED && isCompleted == false) ? null : <View
                    ref={(ref) => { this.marker = ref; }}
                    style={todoItemWrapper}>
                    <View style={{ flex: 1 }}>
                        <TextInput style={listText}
                            onBlur={this.onBlur}
                            onChangeText={this.onChangeText}
                            ref={(ref) => { this.textInput = ref; }}
                            value={todoText}
                            editable={editable}
                            maxLength={50}
                            multiline={false}
                            numberOfLines={1}
                        >
                        </TextInput>
                    </View>
                    <View style={iconWrapper}>
                        {selectedFilter == COMPLETED ? null : <TouchableOpacity onPress={this.onFavoriteClicked}>
                            <Favorite size={24} color={colors.maroon}
                                name={isFavourites ? "star-sharp" : "star-outline"}></Favorite>
                        </TouchableOpacity>}
                        < TouchableOpacity onPress={this.onMenuClicked}>
                            <Icon size={24} color={colors.darkGrey + opacity.sixtyPercent}
                                name="dots-three-vertical"></Icon>
                        </TouchableOpacity>

                    </View>
                </View>}
        </>);
    }
}

const mapDispatchToProps = {
    favouriteClicked,
    menuClicked,
    deleteItem,
    setCompleted,
    editItem,
    saveState
}

const mapStateToProps = (state) => ({
    selectedFilter: state.todo.selectedFilter,
    isMenuOpen: state.todo.isMenuOpen,
    openMenuId: state.todo.openMenuId
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TodoListInstance);



function CustomMenu(props) {
    const { selectedFilter, isMenuOpen, reference, openMenuId } = props;

    const editAction = reference && reference[openMenuId.toString()] ? reference[openMenuId.toString()].edit : () => { };
    const deleteAction = reference && reference[openMenuId.toString()] ? reference[openMenuId.toString()].delete : () => { };
    const completedAction = reference && reference[openMenuId.toString()] ? reference[openMenuId.toString()].completed : () => { };
    const pos = reference && reference[openMenuId.toString()] ? reference[openMenuId.toString()].getPos() - normalize(262) : 0;
    const { menuWrapper, menuListItem, divider } = styles;
    const { listText } = globalStyles
    const { COMPLETED, EDIT, DELETE, ALL } = labels;
    if (!isMenuOpen) {
        return <></>;
    }
    return (
        <View style={[menuWrapper, { marginTop: pos, right: normalize(8) }]}>
            {selectedFilter == ALL ?
                <TouchableOpacity onPress={editAction}>
                    <View style={menuListItem}>
                        <Text style={listText}>
                            {EDIT}
                        </Text>
                    </View>
                </TouchableOpacity>
                : null}
            {selectedFilter == ALL ? <View style={divider} /> : null}

            <TouchableOpacity onPress={deleteAction}>
                <View style={menuListItem}>
                    <Text style={listText}>
                        {DELETE}
                    </Text>
                </View>
            </TouchableOpacity>
            {selectedFilter != COMPLETED ? <View style={divider}></View> : null}
            {selectedFilter != COMPLETED ? <TouchableOpacity onPress={completedAction}>
                <View style={menuListItem}>
                    <Text style={listText}>
                        {COMPLETED}
                    </Text>
                </View>
            </TouchableOpacity> : null}
        </View>
    )

}
const mapStateToPropsMenu = (state) => ({
    selectedFilter: state.todo.selectedFilter,
    isMenuOpen: state.todo.isMenuOpen,
    openMenuId: state.todo.openMenuId
})
export const Menu = connect(mapStateToPropsMenu)(CustomMenu)