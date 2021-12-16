import React, { useEffect, useState, useLayoutEffect } from 'react';
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

const SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
}

function HomeScreen({ route, navigation }) {
  const isEpisode = route.params.isEpisode;
  const { loading, error, data } = useQuery(GET_ALL_FILMS);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sort, setSort] = useState(null);
  const [likedCharacters, setLikedCharacters] = useState([]);

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

  if (isEpisode && loading) return <View style={styles.container}><ActivityIndicator style={styles.center}></ActivityIndicator></View> ;
  if (error) return <View style={styles.container}><Text style={styles.error}>Error</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.header]}>{isEpisode ? 'Movies' : 'Liked Characters'}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={isEpisode ? sortedMovies : likedCharacters}
        renderItem={({ item }) => {
          const truncatedScroll = item.openingCrawl.substring(0, 49);
          return (
            <TouchableOpacity style={styles.cell}>
              <Text style={[styles.text, styles.title]}>{item.title}</Text>
              <Text style={[styles.text, styles.date]}>{`(${item.releaseDate})`}</Text>
              <Text style={[styles.text, styles.scroll]}>{truncatedScroll}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}

export default HomeScreen;