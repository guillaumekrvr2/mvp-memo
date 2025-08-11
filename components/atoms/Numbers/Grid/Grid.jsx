// components/atoms/Grid/Grid.jsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';

export default function Grid({
  data,
  renderCell,
  scrollRef,
  contentContainerStyle,
}) {
  return (
    <ScrollView 
      ref={scrollRef} 
      style={styles.scrollContainer}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {data.map((row, rowIdx) => (
        <View key={`row-${rowIdx}`} style={styles.row}>
          {row.map((item, colIdx) => (
            <View key={`r${rowIdx}-c${colIdx}`} style={styles.cellContainer}>
              {renderCell(item, rowIdx, colIdx)}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}