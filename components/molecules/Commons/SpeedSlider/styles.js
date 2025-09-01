// components/molecules/Commons/SpeedSlider/styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  
  labelText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '500',
  },
  
  centerLabel: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  
  track: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    width: '100%',
  },
  
  activeTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#667eea',
    borderRadius: 2,
    top: 18,
  },
  
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '#667eea',
    borderRadius: 12,
    top: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Zone de touch plus large (invisible)
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  
  marksContainer: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    height: 8,
  },
  
  mark: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#555',
    borderRadius: 1,
  },
  
  magneticMark: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: '#667eea',
    borderRadius: 1.5,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  
  enhancedMagneticMark: {
    position: 'absolute',
    width: 4,
    height: 14,
    backgroundColor: '#667eea',
    borderRadius: 2,
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
});