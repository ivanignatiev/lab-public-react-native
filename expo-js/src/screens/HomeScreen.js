import * as React from 'react';
import { Touchable, TouchableOpacity, View, Text } from 'react-native';

const HomeScreen = () => {
    return (
        <View>
            <Text>E-mail:</Text>
            <Text></Text>
            <TouchableOpacity>
                <Text>Edit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;