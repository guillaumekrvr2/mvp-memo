// components/molecules/Commons/NewRecordModal/NewRecordModal.jsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

export default function NewRecordModal({
  visible,
  onClose,
  score,
  previousScore = null,
  discipline = 'Numbers',
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {/* Icône de trophée */}
          <View style={styles.iconContainer}>
            <Ionicons name="trophy" size={60} color="#FFD700" />
          </View>

          {/* Titre */}
          <Text style={styles.title}>🎉 Nouveau Record ! 🎉</Text>

          {/* Message de félicitations */}
          <Text style={styles.message}>
            Félicitations ! Vous avez établi un nouveau record en {discipline} !
          </Text>

          {/* Scores */}
          <View style={styles.scoreContainer}>
            <Text style={styles.newScoreLabel}>Nouveau score</Text>
            <Text style={styles.newScore}>{score}</Text>
            
            {previousScore !== null && (
              <>
                <Text style={styles.previousScoreLabel}>Ancien record</Text>
                <Text style={styles.previousScore}>{previousScore}</Text>
              </>
            )}
          </View>

          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

NewRecordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  previousScore: PropTypes.number,
  discipline: PropTypes.string,
};