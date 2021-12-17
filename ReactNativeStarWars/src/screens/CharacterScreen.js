import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useQuery } from '@apollo/client';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { GET_CHARACTER } from '../service/graphql';
import { styles } from '../styles/styles';
import { Context } from '../service/Context';

function CharacterScreen({ route, navigation }) {
  const { characterId } = route.params;
  const { loading, error, data } = useQuery(GET_CHARACTER, { 
    variables: { id: characterId }
  });
  const { likedCharacters, likeCharacter, unlikeCharacter } = useContext(Context);
  const [liked, setLiked] = useState(false);

  useLayoutEffect(() => {
    setLiked(likedCharacters.some(character => character.id ===  characterId));
    navigation.setOptions({
      headerRight: data ? () => (
        <TouchableOpacity
          onPress={() => {
            if (liked) {
              setLiked(false);
              unlikeCharacter(characterId);
            } else {
              setLiked(true);
              likeCharacter({ id: characterId, name: data.person.name });
            }
          }}
          style={{ paddingRight: 10 }}>
          { liked  
            ? <FontAwesome5 name={'star'} size={22} color={'yellow'} solid/> 
            : <FontAwesome5 name={'star'} size={22} color={'yellow'} />
          }
        </TouchableOpacity>
      ) : null,
    });
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

  const { name, birthYear, height, mass, homeworld, filmConnection } = data.person;

  return (
   <ScrollView contentContainerStyle={{ paddingBottom: 50 }} style={styles.container}>
      <Text style={[styles.text, styles.header]}>{name}</Text>
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Birth Year: ${birthYear}`}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Height: ${height}`}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Mass: ${mass}`}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={[styles.text, styles.title]}>{`Homeworld: ${homeworld.name}`}</Text>
      </View>
      <Text style={[styles.text, styles.header]}>Movies</Text>
      {filmConnection.films.map((movie) => {
        return (
          <TouchableOpacity 
            key={movie.id}
            style={styles.cell} 
            onPress={() => navigation.navigate("Movie", { movieId: movie.id })}
          >
            <Text style={[styles.text, styles.title]}>{movie.title}</Text>
          </TouchableOpacity>
        )
      })}
   </ScrollView>
  );
}

export default CharacterScreen;