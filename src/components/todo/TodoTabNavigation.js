import React from 'react';
import { FlatList, View, Text, } from 'react-native'
import { labels, constants, globalStyles } from '../../assets/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles'
import { connect } from 'react-redux';
import { selectFilter } from '../../redux/todo/todo.actions'

const { ITEM_WIDTH } = constants;

const getItemLayout = (data, index) => (
    { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }

)
const keyExtractor = (item, index) => item;


export default function TodoTabNavigation() {
    const { ALL, COMPLETED, FAVOURITES } = labels;
    const { TODO_NAVIGATION_FLATLIST } = constants;
    const { tabList, tablistStyle } = styles;

    return (
        <View>
            <FlatList
                style={tablistStyle}
                contentContainerStyle={tabList}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                key={TODO_NAVIGATION_FLATLIST}
                data={[ALL, COMPLETED, FAVOURITES]}
                renderItem={({ item, index }) => <Tabs item={item} index={index}></Tabs>}
                getItemLayout={getItemLayout}
                keyExtractor={keyExtractor}
            >

            </FlatList >
        </View>
    );
}

function Tab(props) {
    const { filter, filterSelected } = styles;
    const { linkText, linkTextWhite } = globalStyles;
    const { item, index, selectedFilter, selectFilter } = props;
    const add = () => {
        selectFilter(item)
    }
    return (
        <TouchableOpacity onPress={add}>
            <View style={selectedFilter == item ? filterSelected : filter} key={index}>
                <Text style={selectedFilter == item ? linkTextWhite : linkText}>{item}</Text>
            </View >
        </TouchableOpacity>
    )

}

const mapDispatchToProps = {
    selectFilter,
}

const mapStateToProps = (state) => ({
    selectedFilter: state.todo.selectedFilter,
})

const Tabs = connect(mapStateToProps, mapDispatchToProps)(Tab)