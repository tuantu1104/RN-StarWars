import React, { 
  useEffect, 
  useState, 
  useLayoutEffect,
  useContext
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { useQuery } from '@apollo/client';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { GET_ALL_FILMS } from '../service/graphql';
import { styles } from '../styles/styles';
import MovieCell from '../components/MovieCell';
import CharacterCell from '../components/CharacterCell';
import { Context } from '../service/Context';

const SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
}

const EPISODE_HEADER = 'Star Wars Movies';
const LIKED_CHARACTERS_HEADER = 'Liked Characters';

function HomeScreen({ route, navigation }) {
  const isEpisode = route.params.isEpisode;
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sort, setSort] = useState(null);
  const { likedCharacters } = useContext(Context);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => isEpisode ? (
        <TouchableOpacity
          onPress={() => {
            sortMovies();
            setSort(prevState => (prevState === SORT.ASC ? SORT.DESC : SORT.ASC));
          }}
          style={{ paddingRight: 10 }}>
          <FontAwesome5 name={'sort'} size={22} color={'yellow'} />
        </TouchableOpacity>
      ) : null,
    });
  });

  // useEffect(() => {
  //   console.log(likedCharacters);
  // }, [likedCharacters])

  useEffect(() => {
    if (data) {
      setSortedMovies(data.allFilms.films);
    }
  }, [data]);

  const sortMovies = () => {
    const movies = [...sortedMovies];
    movies.sort((a, b) => {
      if (sort === SORT.ASC) {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      }
    });
    setSortedMovies(movies);
  }

  if (isEpisode && loading) {
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

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.header]}>{isEpisode ? EPISODE_HEADER : LIKED_CHARACTERS_HEADER}</Text>
      { isEpisode && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={sortedMovies}
          renderItem={({ item }) => {
            return (
              <MovieCell 
                movie={item}
                truncated={true}
                onPress={() => navigation.navigate('Movie', { movieId: item.id })}
              />
            )
          }}
        />
      )}
      { !isEpisode && (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={likedCharacters}
          ListEmptyComponent={<Text style={[styles.text, styles.title]}>No Liked Character</Text>}
          renderItem={({ item }) => {
            return (
              <CharacterCell
                key={item.id}
                name={item.name}
                onPress={() => navigation.navigate('Character', { characterId: item.id })}
              />
            )
          }}
        />
      )}
    </View>
  );
}

export default HomeScreen;