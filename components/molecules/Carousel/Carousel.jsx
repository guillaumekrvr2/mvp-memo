// components/molecules/Carousel/Carousel.jsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import styles from './styles';

export function Carousel({
  data,            // tableau d'objets { key, label, emoji?, color? }
  selectedKey,     // clé de l'item actif
  onSelect,        // fn(key) lorsqu'on clique
  style,           // style additionnel sur le container
  buttonStyle,     // style additionnel sur chaque MenuButton
}) {
  return (
    <View style={[styles.wrapperShadow, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        {data.map((item) => (
          <View key={item.key} style={styles.buttonWrapper}>
            <MenuButton
              label={item.label}
              emoji={item.emoji || '🎯'}
              color={item.color || '#667eea'}
              isActive={item.key === selectedKey}
              isCarousel={true}
              onPress={() => onSelect(item.key)}
              style={buttonStyle}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}