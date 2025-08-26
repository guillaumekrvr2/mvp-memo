//hooks/useNumbers.js
import { useState, useEffect } from 'react'

/**
 * Génère un tableau aléatoire de chiffres ou de nombres selon les paramètres.
 * @param {number} count Nombre d'éléments à générer
 * @param {object} options Options de génération
 * @param {number} options.fromValue Valeur minimum pour révisions spécifiques
 * @param {number} options.toValue Valeur maximum pour révisions spécifiques
 * @param {boolean} options.useSpecificRange Si true, génère des nombres complets dans la plage
 * @returns {number[]} Tableau de chiffres [0–9] ou nombres complets selon les options
 */
export default function useNumbers(count, options = {}) {
  const [numbers, setNumbers] = useState([])
  
  useEffect(() => {
    const { fromValue, toValue, useSpecificRange } = options;
    
    if (useSpecificRange && fromValue !== undefined && toValue !== undefined && fromValue <= toValue) {
      // Mode révisions spécifiques : générer des nombres dans la plage puis les convertir en chiffres
      const numbersGenerated = [];
      let digitCount = 0;
      
      // Générer des nombres aléatoirement jusqu'à avoir le bon nombre de chiffres
      while (digitCount < count) {
        const range = toValue - fromValue + 1;
        const randomInRange = Math.floor(Math.random() * range);
        const randomNumber = fromValue + randomInRange;
        
        // Convertir le nombre en chiffres individuels
        const digits = randomNumber.toString().split('').map(digit => parseInt(digit, 10));
        
        // Ajouter les chiffres jusqu'à atteindre le count requis
        for (let digit of digits) {
          if (digitCount < count) {
            numbersGenerated.push(digit);
            digitCount++;
          } else {
            break;
          }
        }
      }
      
      setNumbers(numbersGenerated);
    } else {
      // Mode classique : générer des chiffres individuels [0-9]
      const arr = Array.from({ length: count }, () =>
        Math.floor(Math.random() * 10)
      );
      setNumbers(arr);
    }
  }, [count, options.fromValue, options.toValue, options.useSpecificRange]);
  
  return numbers;
}
