import React from 'react';
import { 
  Text,
  TouchableOpacity
} from 'react-native';

import { styles } from '../styles/styles';

function MovieCell({ movie, onPress, truncated }) {
  const truncatedScroll = movie.openingCrawl.substring(0, 49);

  return (
    <TouchableOpacity style={styles.cell} onPress={onPress} disabled={!truncated}>
      <Text style={[styles.text, styles.title]}>{movie.title}</Text>
      <Text style={[styles.text, styles.date]}>{`(${movie.releaseDate})`}</Text>
      <Text style={[styles.text, styles.scroll]}>{truncated ? `${truncatedScroll}...` : movie.openingCrawl}</Text>
    </TouchableOpacity>
  )
}

export default MovieCell;