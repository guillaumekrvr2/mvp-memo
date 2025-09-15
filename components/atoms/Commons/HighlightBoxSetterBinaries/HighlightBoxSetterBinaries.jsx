// components/atoms/Commons/HighlightBoxSetterBinaries/HighlightBoxSetterBinaries.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as S from './styles';

export default function HighlightBoxSetterBinaries({
  columns = 3,
  rows = 2,
  onPress,
  style,
  textStyle
}) {
  
  // Générer une séquence aléatoire de 0 et 1 pour la matrice
  const binaryMatrix = useMemo(() => {
    const totalCells = columns * rows;
    const sequence = [];
    
    for (let i = 0; i < totalCells; i++) {
      sequence.push(Math.random() < 0.5 ? '0' : '1');
    }
    
    // Organiser en matrice [lignes][colonnes]
    const matrix = [];
    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let col = 0; col < columns; col++) {
        const index = row * columns + col;
        rowArray.push(sequence[index]);
      }
      matrix.push(rowArray);
    }
    
    return matrix;
  }, [columns, rows]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <S.Container style={style} onPress={handlePress} activeOpacity={0.8}>
      <S.ContentWrapper>
        <S.MatrixContainer columns={columns} rows={rows}>
          {binaryMatrix.map((row, rowIndex) => (
            <S.MatrixRow key={rowIndex}>
              {row.map((digit, colIndex) => (
                <S.DigitText 
                  key={`${rowIndex}-${colIndex}`}
                  columns={columns}
                  style={textStyle}
                >
                  {digit}
                </S.DigitText>
              ))}
            </S.MatrixRow>
          ))}
        </S.MatrixContainer>
        
        <S.IconContainer>
          <Ionicons name="settings-outline" size={24} color="#667eea" />
        </S.IconContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}

HighlightBoxSetterBinaries.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object
};