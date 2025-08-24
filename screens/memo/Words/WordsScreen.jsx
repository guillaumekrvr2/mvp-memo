import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WordsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>W O R D S</Text>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        
        {/* Number display */}
        <TouchableOpacity style={styles.numberBox}>
          <Text style={styles.numberText}>HELLO WORLD</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Mode selector */}
        <TouchableOpacity style={styles.modeSelector}>
          <Text style={styles.modeText}>Memory League</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statText}>15</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statText}>5 minutes</Text>
          </View>
        </View>

        {/* Record */}
        <View style={styles.recordContainer}>
          <Ionicons name="trophy" size={20} color="#9333ea" />
          <Text style={styles.recordText}>Mon record : 18 en 300 secondes</Text>
        </View>

        {/* GO Button */}
        <TouchableOpacity style={styles.goButton}>
          <Text style={styles.goButtonText}>GO ></Text>
        </TouchableOpacity>

        {/* Info text */}
        <Text style={styles.infoText}>En apprendre plus sur l'épreuve des mots ></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  numberBox: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    transform: [
      {
        matrix: [1, 0, -0.17, 1, 0, 0] // Approximation de skewX(-10deg)
      }
    ],
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  numberText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 12,
    letterSpacing: 2,
  },
  modeSelector: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        matrix: [1, 0, -0.14, 1, 0, 0] // Approximation de skewX(-8deg)
      }
    ],
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 40,
  },
  statBox: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  statText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  recordText: {
    color: '#9333ea',
    fontSize: 14,
    marginLeft: 8,
  },
  goButton: {
    backgroundColor: '#9333ea',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
    transform: [
      {
        matrix: [1, 0, -0.09, 1, 0, 0] // Approximation de skewX(-5deg)
      }
    ],
  },
  goButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});