// src/components/atoms/Grid/Grid.jsx
import React from 'react'
import { ScrollView, View } from 'react-native'
import styles from './styles'

/**
 * @param {any[][]} data          Matrice [rows][cols]
 * @param {number} cols           Nombre de colonnes (pour key et layout)
 * @param {(item, r, c) => ReactNode} renderCell
 * @param {(layoutEvent) => void} onLayout
 * @param {object} contentContainerStyle
 */
export default function Grid({
  data,
  renderCell,
  scrollRef,                // <-- ajouter
  contentContainerStyle,
}) {
  return (
    <ScrollView
      ref={scrollRef}        // <-- rattache le ref ici
      contentContainerStyle={[styles.scroll, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
            {data.map((row, rowIdx) => (
        <View key={`row-${rowIdx}`} style={styles.row}>
          {row.map((item, colIdx) => {
            const cellKey = `r${rowIdx}-c${colIdx}`
            // On enveloppe chaque cellule dans un View avec une key unique
            return (
              <View key={cellKey} style={styles.cellContainer}>
                {renderCell(item, rowIdx, colIdx)}
              </View>
            )
          })}
        </View>
      ))}
    </ScrollView>
  )
}
