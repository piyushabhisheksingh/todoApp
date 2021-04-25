import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { constants } from '../../assets';
import styles from './styles';
import { TodoListInstance } from '.'
import normalize from '../../utls/normalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu } from './TodoListInstance'
import { menuClicked } from '../../redux/todo/todo.actions'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'



class TodoList extends Component {
    constructor(props) {
        super(props);
        this.item = {}
        this.state = {
            pos: 0
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.todoList.length != this.props.todoList) {
            return true
        } else {
            return false
        }
    }

    keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => {
        return (
            <TodoListInstance ref={(ref) => { this.item[item.id.toString()] = ref; }} item={item}
                index={index}>
            </ TodoListInstance>)
    }
    close = () => {
        const { isMenuOpen, menuClicked } = this.props;
        if (isMenuOpen) {
            menuClicked(false)
        }
    }

    render() {
        const { todoListStyle } = styles;
        const { todoList } = this.props;
        const { TODO_FLATLIST } = constants;
        return (
            <SafeAreaView style={{ flex: 1, paddingBottom: normalize(16), overflow: 'visible' }}>

                <Menu
                    reference={this.item}
                ></Menu>

                <KeyboardAwareFlatList
                    removeClippedSubviews={false}
                    keyboardDismissMode={"none"}
                    onScrollBeginDrag={this.close}
                    onMomentumScrollBegin={this.close}
                    ListFooterComponent={<View style={{ marginBottom: normalize(40) }}></View>}
                    contentContainerStyle={todoListStyle}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                    nestedScrollEnabled
                    bounces={false}
                    key={TODO_FLATLIST}
                    data={todoList}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    contentInsetAdjustmentBehavior="always"
                >
                </KeyboardAwareFlatList >
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = {
    menuClicked,
}


const mapStateToProps = (state) => ({
    todoList: state.todo.todoList,
    selectedFilter: state.todo.selectedFilter,
    isMenuOpen: state.todo.isMenuOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);