// screens/RecallScreen.jsx
import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import MemorizationHeader from '../../components/molecules/MemorizationHeader/MemorizationHeader'
import { SecondaryButton } from '../../components/atoms/SecondaryButton/SecondaryButton'
import BorderedContainer from '../../components/atoms/BorderedContainer/BorderedContainer'
import useInputGrid from '../../hooks/useInputGrid'    
import Grid from '../../components/atoms/Grid/Grid'
import RecallCell from '../../components/molecules/RecallCell/RecallCell'

export default function RecallScreen({ route, navigation }) {
  const { objectif, numbers, temps, variant } = route.params
  const cols = 6
  const totalTime = 4 * 60
  const {
    rows,
    values,
    setCellValue,
  } = useInputGrid(objectif, cols, /* grouping= */6)

  const inputRefs = useRef(Array(objectif).fill().map(() => React.createRef()))

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
     <MemorizationHeader
        duration={totalTime}
        onBack={() => navigation.goBack()}
                onDone={() =>
          navigation.navigate('Correction', {
            inputs: values,
            numbers,
            temps,
            variant,
          })
        }
      />

      {/* GRILLE SANS SÉPARATEURS */}
      <BorderedContainer style={styles.gridContainer}>
        <Grid
              data={rows}
              renderCell={(cellValue, r, c) => (
                <RecallCell
                  row={r}
                  col={c}
                  cols={cols}
                  objectif={objectif}
                  values={values}
                  setCellValue={setCellValue}
                  inputRefs={inputRefs}
                  style={styles.cellInput}
                />
              )}
            />
      </BorderedContainer>

      {/* BOUTON VALIDER */}
      <SecondaryButton
        onPress={() =>
          navigation.navigate('Correction', {
            inputs: values,
            numbers,
            temps,
            mode,
          })
        }
      >
        Valider 
      </SecondaryButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: {
    paddingHorizontal: 12,
    paddingTop: 16,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8
  },
  cellInput: {
    width: 42,
    height: 42,
    backgroundColor: '#111',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
})
