// screens/memo/Cards/CardsRecallScreen.styles.js
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Output Slots Section
  outputSection: {
    height: screenHeight * 0.12,
    marginBottom: 8,
  },

  outputScroll: {
    flex: 1,
  },

  outputSlots: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: screenWidth,
  },

  outputSlot: {
    width: 44,
    height: 66,
    marginHorizontal: 2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  outputSlotFilled: {
    borderColor: '#4caf50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },

  slotCard: {
    width: 36,
    height: 50,
    borderRadius: 4,
    overflow: 'hidden',
  },

  slotCardContent: {
    flex: 1,
    borderRadius: 4,
    opacity: 0.8,
  },

  slotNumber: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  slotNumberText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },

  // Swipe Up Zone
  swipeUpZone: {
    height: 60,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  swipeUpIndicator: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#4caf50',
    borderStyle: 'dashed',
  },

  swipeUpText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Cards Section
  cardsSection: {
    flex: 1,
    marginBottom: 80,
  },

  suitSection: {
    marginBottom: 20,
  },

  suitTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },

  suitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },

  gridCard: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },

  gridCardSelected: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderColor: '#4caf50',
    transform: [{ scale: 1.1 }],
  },

  gridCardUsed: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.3,
  },

  cardText: {
    fontSize: 14,
    fontWeight: '700',
  },

  cardTextUsed: {
    opacity: 0.3,
  },

  // Controls
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  controlButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },

  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}