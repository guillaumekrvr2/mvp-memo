CorrectionScreen

Constantes et hooks

// Récupération des paramètres de navigation
const { inputs, numbers, temps, mode } = route.params
// - inputs: tableau des réponses saisies par l'utilisateur
// - numbers: tableau des chiffres générés initialement
// - temps: durée allouée pour la mémorisation (number)
// - mode: mode de jeu sélectionné (string)

// Calcul du score
const total = inputs.length // nombre total d'items à vérifier
const score = inputs.reduce((acc, v, i) =>
  acc + (v === String(numbers[i]) ? 1 : 0), 0)
// - compare chaque input à la valeur correspondante dans numbers
// - incrémente acc si correct

// Hook manuel d'enregistrement
const saveRecord = useSaveRecord()
// - retourne une fonction saveRecord(type, payload) qui enregistre manuellement dans la base locale ou distante

// Hook d'auto-enregistrement
useAutoSaveRecord('numbers', mode, score, temps)
// - enregistre automatiquement le résultat via useEffect interne

Structure du rendu (JSX)

SafeAreaView

<SafeAreaView style={styles.container}>

Conteneur principal respectant les zones sûres.

BorderedContainer

<BorderedContainer style={styles.gridContainer}>
  <CorrectionGrid inputs={inputs} numbers={numbers} cols={6} />
</BorderedContainer>

style : applique la taille et le positionnement du container.

CorrectionGrid :

inputs (array) : réponses de l'utilisateur.

numbers (array) : valeurs attendues.

cols (number) : nombre de colonnes dans la grille (6).

Affichage du score

<Text style={styles.scoreText}>Score : {score} / {total}</Text>

Montre le score calculé et le nombre total d'items.

SecondaryButton (Retry)

<SecondaryButton
  style={styles.retryButton}
  onPress={() =>
    saveRecord('numbers', { mode, score, time: temps })
      .then(() => navigation.navigate('Numbers'))
  }
>
  Retry
</SecondaryButton>

style : personnalisation visuelle du bouton.

onPress :

Appelle saveRecord pour persister { mode, score, time } sous la catégorie 'numbers'.

Après enregistrement (promise résolue), navigue vers l'écran 'Numbers'.

Cette section détaille chaque constante, hook et prop du JSX de CorrectionScreen, sans inclure les imports ou styles.