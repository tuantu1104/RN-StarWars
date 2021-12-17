import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_FILM } from '../service/graphql';
import { styles } from '../styles/styles';
import MovieCell from '../components/MovieCell';
import CharacterCell from '../components/CharacterCell';

function MoviveScreen({ route, navigation }) {
  const { movieId } = route.params;
  const { loading, error, data } = useQuery(GET_FILM, { 
    variables: { id: movieId }
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.center}></ActivityIndicator>
      </View>
    )
  }
  if (error) {
    console.log(error);
    return (
      <View style={styles.container}><Text style={styles.error}>Error</Text></View>
    )
  }

  const { characterConnection, planetConnection, speciesConnection, vehicleConnection } = data.film;

  return (
   <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
      <Text style={[styles.text, styles.header]}>About</Text>
      <MovieCell
        movie={data.film}
        truncated={false}
      />
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Total species count: ${speciesConnection.totalCount}`}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Total planet count: ${planetConnection.totalCount}`}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Total vehicle count: ${vehicleConnection.totalCount}`}</Text>
      </View>
      <Text style={[styles.text, styles.header]}>Characters</Text>
      {characterConnection.characters.map((character) => {
        return (
          <CharacterCell
            key={character.id}
            name={character.name}
            onPress={() => navigation.navigate('Character', { characterId: character.id })}
          />
        )
      })}
   </ScrollView>
  );
}

export default MoviveScreen;