/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
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

const EpisodeStack = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Home" component={HomeScreen} initialParams={{ isEpisode: true }} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
    </Stack.Navigator>
  )
}

const LikedCharacterStack = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Home" component={HomeScreen} initialParams={{ isEpisode: false }} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
    </Stack.Navigator>
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
        <Tab.Navigator 
          screenOptions={{ 
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#333'
            },
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen 
            name="Episode" 
            component={EpisodeStack} 
            options={{ 
              tabBarIcon: ({ color, size }) => <FontAwesome5 name={"film"} size={size} color={color} />,
            }} 
          />
          <Tab.Screen 
            name="LikedCharacter" 
            component={LikedCharacterStack} 
            options={{ 
              tabBarLabel: 'Liked Characters',
              tabBarIcon: ({ color, size }) => <FontAwesome5 name={"user-friends"} size={size} color={color} />
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
