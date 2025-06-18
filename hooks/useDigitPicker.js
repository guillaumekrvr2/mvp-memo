// hooks/useDigitPicker.js
import { useState, useEffect } from 'react';

export default function useDigitPicker(initialCount = 6) {
  // 1) état du nombre de chiffres
  const [digitCount, setDigitCount] = useState(initialCount);
  // 2) valeurs aléatoires pour l’aperçu
  const [previewDigits, setPreviewDigits] = useState([]);
  // 3) affichage du modal
  const [modalVisible, setModalVisible] = useState(false);

  // À chaque fois que digitCount change, on recalcule previewDigits
  useEffect(() => {
    const arr = Array.from({ length: digitCount }, () =>
      Math.floor(Math.random() * 10)
    );
    setPreviewDigits(arr);
  }, [digitCount]);

  // Ouvre/ferme le modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return {
    digitCount,
    setDigitCount,
    previewDigits,
    modalVisible,
    openModal,
    closeModal,
  };
}
