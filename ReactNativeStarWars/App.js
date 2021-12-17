/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  LogBox
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import CharacterScreen from './src/screens/CharacterScreen';
import Provider from './src/service/Context';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#333',
  },
  headerTitleStyle: {
    color: '#fff'
  },
  headerTintColor: 'yellow'
};

const bottomTabOptions = { 
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#333'
  },
  tabBarActiveTintColor: 'yellow',
  tabBarInactiveTintColor: 'gray',
}

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={bottomTabOptions}>
      <Tab.Screen 
        name="Episode" 
        component={HomeScreen}
        initialParams={{ isEpisode: true }}
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name={"film"} size={size} color={color} /> }}
      />
      <Tab.Screen 
        name="LikedCharacter" 
        component={HomeScreen} 
        initialParams={{ isEpisode: false }}
        options={{ 
          tabBarLabel: 'Liked Characters',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name={"user-friends"} size={size} color={color} />
        }} 
      />
    </Tab.Navigator>
  )
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

const App = () => {
  StatusBar.setBarStyle('light-content');

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Provider>
          <Stack.Navigator screenOptions={headerOptions}>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            <Stack.Screen name="Character" component={CharacterScreen} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
