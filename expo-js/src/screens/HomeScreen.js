import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => { navigation.navigate('InputEmailScreen') } }>
                <Text>Input Email Screen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;