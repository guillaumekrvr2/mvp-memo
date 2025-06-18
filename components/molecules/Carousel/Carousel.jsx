//components/molecules/Carousel/Carousel.jsx
import { View, ScrollView } from 'react-native';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import styles from './styles';

export function Carousel({
  data,            // tableau d’objets { key, label }
  selectedKey,     // clé de l’item actif
  onSelect,        // fn(key) lorsqu’on clique
  style,           // style additionnel sur le container
  buttonStyle,     // style additionnel sur chaque MenuButton
}) {
  return (
  <View style={[styles.wrapperShadow, style]}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.container} >
      {data.map(item => (
        <MenuButton
          key={item.key}
          label={item.label}
          isActive={item.key === selectedKey}
          onPress={() => onSelect(item.key)}
          style={buttonStyle}
        />
      ))}
    </ScrollView>
     </View>
  );
}
