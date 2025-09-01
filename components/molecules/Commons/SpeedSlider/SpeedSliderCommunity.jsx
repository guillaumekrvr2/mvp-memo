// Version avec @react-native-community/slider
import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import styles from './styles';

export default function SpeedSlider({ 
  value = 1, 
  onValueChange,
  min = 0.5,
  max = 2,
  step = 0.1,
  style,
  disabled = false 
}) {
  // Échelle personnalisée pour avoir 1.0 au centre
  // Mapping linéaire interne : 0 à 100
  // 0-50 : 0.5 à 1.0 (pas de 0.01)  
  // 50-100 : 1.0 à 2.0 (pas de 0.02)
  
  const speedToSlider = (speed) => {
    if (speed <= 1.0) {
      // 0.5->1.0 devient 0->50
      return ((speed - 0.5) / 0.5) * 50;
    } else {
      // 1.0->2.0 devient 50->100
      return 50 + ((speed - 1.0) / 1.0) * 50;
    }
  };
  
  const sliderToSpeed = (sliderValue) => {
    if (sliderValue <= 50) {
      // 0->50 devient 0.5->1.0
      return 0.5 + (sliderValue / 50) * 0.5;
    } else {
      // 50->100 devient 1.0->2.0
      return 1.0 + ((sliderValue - 50) / 50) * 1.0;
    }
  };
  
  // Valeurs magnétiques en échelle slider
  const magneticValues = [0.5, 1.0, 2.0];
  const magneticThreshold = 0.05;

  const formatSpeed = (speed) => {
    const formattedSpeed = parseFloat(speed.toFixed(1));
    if (formattedSpeed < 1) return `${formattedSpeed}s (Lent)`;
    if (formattedSpeed > 1) return `${formattedSpeed}s (Rapide)`;
    return `${formattedSpeed}s`;
  };

  const handleValueChange = (sliderValue) => {
    // Convertir la valeur slider vers la vitesse réelle
    let speed = sliderToSpeed(sliderValue);
    
    // Arrondir à la précision du step
    speed = Math.round(speed / step) * step;
    speed = parseFloat(speed.toFixed(1));
    
    // Effet magnétique : attirer vers les valeurs clés et vibration
    for (const magneticValue of magneticValues) {
      if (Math.abs(speed - magneticValue) <= magneticThreshold) {
        speed = magneticValue;
        // Vibration haptique quand on touche une valeur magnétique
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      }
    }
    
    onValueChange?.(speed);
  };

  const handleSlidingComplete = (sliderValue) => {
    // Pas de vibration ici car elle est déjà gérée dans handleValueChange
    handleValueChange(sliderValue);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Labels de vitesse */}
      <View style={styles.labelsContainer}>
        <Text style={[
          styles.labelText,
          value === 0.5 && { color: '#667eea' } // Violet si curseur sur 0.5
        ]}>{min}s (Rapide)</Text>
        <Text style={[
          styles.labelText, // Utiliser labelText comme base
          value === 1.0 && { color: '#667eea' } // Violet si curseur sur 1.0
        ]}>1s</Text>
        <Text style={[
          styles.labelText,
          value === 2.0 && { color: '#667eea' } // Violet si curseur sur 2.0
        ]}>{max}s (Lent)</Text>
      </View>

      {/* Slider avec la librairie community */}
      <View style={styles.sliderContainer}>
        <Slider
          style={{
            width: '100%',
            height: 40,
          }}
          minimumValue={0}
          maximumValue={100}
          value={speedToSlider(value)}
          onValueChange={handleValueChange}
          onSlidingComplete={handleSlidingComplete}
          step={1}
          minimumTrackTintColor="#667eea" // Violet pour la partie active
          maximumTrackTintColor="#444444" // Gris foncé pour la partie inactive
          thumbTintColor="#667eea" // Couleur du curseur (propriété correcte)
          disabled={disabled}
        />
      </View>
    </View>
  );
}