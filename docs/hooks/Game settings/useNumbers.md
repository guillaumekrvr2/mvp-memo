---

## useNumbers Hook

### Description générale

`useNumbers` génère un tableau de nombres aléatoires compris entre 0 et 9, recalculé à chaque changement du paramètre `count`. Utile pour initialiser ou rafraîchir une série de chiffres de manière aléatoire.

### Fonctionnalités clés

- **`numbers`** (`number[]`) : tableau de chiffres aléatoires de longueur `count`.  
- Se réinitialise automatiquement lorsque `count` change.  

### Signature

```ts
function useNumbers(count: number): number[]

export default function useNumbers(count) {
  // 1) État local pour stocker le tableau de chiffres
  const [numbers, setNumbers] = useState([])

  // 2) À chaque fois que 'count' change, génère un nouveau tableau
  useEffect(() => {
    // Crée un tableau de longueur 'count' rempli de chiffres aléatoires [0–9]
    const arr = Array.from({ length: count }, () =>
      Math.floor(Math.random() * 10)
    )
    // Met à jour l'état avec le nouveau tableau
    setNumbers(arr)
  }, [count])

  // 3) Renvoie le tableau de chiffres
  return numbers
}

function RandomDigits({ count }) {
  const digits = useNumbers(count)

  return (
    <View style={styles.row}>
      {digits.map((n, i) => (
        <Text key={i} style={styles.digitText}>
          {n}
        </Text>
      ))}
    </View>
  )
}
