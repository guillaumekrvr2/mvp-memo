// components/molecules/IAMVariantPickerModal/IAMVariantPickerModal.jsx
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'

export default function IAMVariantPickerModal({
  visible,
  variants = [],
  selectedVariant,
  onSelect,
  onClose,
}) {
  const renderVariant = ({ item }) => {
    const isSelected = selectedVariant?.id === item.id
    const duration = Math.floor(item.duration_seconds / 60)
    
    return (
      <TouchableOpacity
        style={[styles.variantItem, isSelected && styles.selectedVariant]}
        onPress={() => {
          onSelect(item)
          onClose()
        }}
      >
        <View style={styles.variantInfo}>
          <Text style={[styles.variantName, isSelected && styles.selectedText]}>
            {item.label || item.name}
          </Text>
          <Text style={[styles.variantDuration, isSelected && styles.selectedText]}>
            {duration} minute{duration > 1 ? 's' : ''}
          </Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Sélectionner un variant IAM</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={variants}
            renderItem={renderVariant}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  )
}