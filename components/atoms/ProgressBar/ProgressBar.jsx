//components/atoms/ProgressBar.jsx
import React, { useRef, useEffect } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import styles from './styles'

export default function ProgressBar({ duration }) {
  const animProgress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    animProgress.setValue(0)
    Animated.timing(animProgress, {
      toValue: 1,
      duration: duration * 1000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }, [duration])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: animProgress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }
        ]}
      />
    </View>
  )
}