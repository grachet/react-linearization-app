import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ParamsScreen from '../screens/ParamsScreen';
import AbaqueScreen from '../screens/AbaqueScreen';
import ResultScreen from '../screens/ResultScreen';


const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Information',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};


const ParamsStack = createStackNavigator({
    Params: ParamsScreen,
});

ParamsStack.navigationOptions = {
    tabBarLabel: 'Paramètres',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
        />
    ),
};


const AbaqueStack = createStackNavigator({
    Abaque: AbaqueScreen,
});

AbaqueStack.navigationOptions = {
    tabBarLabel: 'Abaque',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-book${focused ? '' : '-outline'}` : 'md-book'}
        />
    ),
};


const ResultScreenStack = createStackNavigator({
    Result: ResultScreen,
});

ResultScreenStack.navigationOptions = {
    tabBarLabel: 'Résultat',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-calculator${focused ? '' : '-outline'}` : 'md-calculator'}
        />
    ),
};


export default createBottomTabNavigator({
    HomeStack,
    ParamsStack,
    AbaqueStack,
    ResultScreenStack
});
