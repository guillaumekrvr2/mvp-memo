//components/molecules/Carousel/Carousel.jsx
import React from 'react';
import { ScrollView } from 'react-native';
import { MenuButton } from '../../atoms/MenuButton/MenuButton';
import * as S from './styles';

export function Carousel({
  data,            // tableau d’objets { key, label }
  selectedKey,     // clé de l’item actif
  onSelect,        // fn(key) lorsqu’on clique
  style,           // style additionnel sur le container
  buttonStyle,     // style additionnel sur chaque MenuButton
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
   style,
   { 
     flexGrow: 0,      // empêche le ScrollView de grandir
     flexShrink: 0,    // empêche le ScrollView de voler l’espace
     alignSelf: 'flex-start', 
   }
 ]}
 contentContainerStyle={[
   S.container,
   { flexGrow: 0 }     // empêche le contenu d’appuyer sur le parent
 ]}
    >
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
  );
}
