// hooks/useDigitPicker.js
import { useState, useEffect } from 'react';
import useAsyncStorageState from './useAsyncStorageState';

export default function useDigitPicker(initialCount = 6, storageKey = null) {
  // 1) Toujours utiliser les deux hooks pour éviter les problèmes de hooks conditionnels
  const [persistentDigitCount, setPersistentDigitCount] = useAsyncStorageState(storageKey || 'temp', initialCount);
  const [localDigitCount, setLocalDigitCount] = useState(initialCount);

  // Utiliser l'état persistant ou local selon le cas
  const digitCount = storageKey ? persistentDigitCount : localDigitCount;
  const setDigitCount = storageKey ? setPersistentDigitCount : setLocalDigitCount;
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
