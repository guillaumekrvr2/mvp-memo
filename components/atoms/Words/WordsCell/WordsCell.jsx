import React, { forwardRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const WordsCell = forwardRef(({ 
  word, 
  isHighlighted = false, 
  isInput = false,
  onTextChange,
  value,
  style,
  autoFocus = false,
  onSubmitEditing,
  isCorrectionMode = false,
  isCorrect = true,
  isRevealed = false,
  onPress
}, ref) => {
  if (isInput) {
    return (
      <View style={[
        styles.wordCell,
        isHighlighted && styles.highlightWordCell,
        style
      ]}>
        <TextInput
          ref={ref}
          style={[
            styles.wordText,
            styles.inputText,
            isHighlighted && styles.highlightWordText
          ]}
          value={value}
          onChangeText={onTextChange}
          placeholder=""
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          textAlign="center"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus}
          returnKeyType="next"
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={false}
        />
      </View>
    );
  }

  // Mode correction avec highlighting
  if (isCorrectionMode) {
    const CellComponent = isCorrect ? View : TouchableOpacity;
    
    return (
      <CellComponent 
        style={[
          styles.wordCell,
          isCorrect ? styles.correctWordCell : styles.incorrectWordCell,
          style
        ]}
        onPress={!isCorrect ? onPress : undefined}
        disabled={isCorrect}
      >
        <Text style={[
          styles.wordText,
          isCorrect ? styles.correctWordText : styles.incorrectWordText
        ]}>
          {word}
        </Text>
      </CellComponent>
    );
  }

  return (
    <View style={[
      styles.wordCell,
      isHighlighted && styles.highlightWordCell,
      style
    ]}>
      <Text style={[
        styles.wordText,
        isHighlighted && styles.highlightWordText
      ]}>
        {word}
      </Text>
    </View>
  );
});

export default WordsCell;