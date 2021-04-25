import React, { memo } from 'react';
import { Text } from 'react-native';
import { labels } from '../../assets'
import styles from './styles'



function TodoHeader() {
    const { todoHeader } = styles;
    const { TODOS } = labels;
    return (
        <Text style={todoHeader}>{TODOS}</Text>
    );
}

export default memo(TodoHeader);