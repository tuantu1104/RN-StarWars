import React from 'react';
import { 
  Text,
  TouchableOpacity
} from 'react-native';

import { styles } from '../styles/styles';

function CharacterCell({ name, onPress }) {
  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <Text style={[styles.text, styles.title]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CharacterCell;