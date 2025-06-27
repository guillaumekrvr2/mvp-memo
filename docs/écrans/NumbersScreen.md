NumbersScreen

Constantes déclarées

navigation : issu de useNavigation(), permet de naviguer vers l’écran Decompte.

digitCount, previewDigits, modalVisible, openModal, closeModal, setDigitCount : renvoyés par useDigitPicker(6), gèrent la sélection du nombre de chiffres et la prévisualisation.

mode, onModeChange, options (de mode) : renvoyés par useMode('memory-league', modeOptions), gèrent la sélection et la configuration du mode de jeu.

defaultObj : valeur par défaut de l’objectif, calculée en fonction du mode ('60' si memory-league, sinon '').

objectif, setObjectif : issus de useObjective(
numbers:objectif:${mode},
defaultObj
), stockent l’objectif dans le local storage.

temps, setTemps : issus de useCountdown(mode), pilotent le compte à rebours pour ensuite le passer à l'écran suivant. 

autoAdvance, toggleAutoAdvance : renvoyés par useAutoAdvancePreference(mode), gèrent la préférence d’avancement automatique des essais.

autoAdvance (boolean) indique si le jeu effectue l'avancée automatique. 

toggleAutoAdvance (fn) inverse la valeur de autoAdvance et la persiste dans AsyncStorage sous la clé autoAdvance:${mode} pour conserver la préférence entre les sessions.

lastScore, lastTime : issus de useRecord('numbers', mode), affichent le dernier résultat obtenu.

Dépendances principales

Bibliothèques :

react, react-native (SafeAreaView, View, StyleSheet).

@react-navigation/native (useNavigation).

@expo/vector-icons (Ionicons).

Hooks internes :

useDigitPicker, useMode, useObjective, useCountdown, useAutoAdvancePreference, useRecord.

Composants atoms :

AutoAdvanceSwitch, PlayButton, SecondaryButton, HighlightBoxSetter.

Composants molecules :

ModePicker, DigitPickerModal, RecordDisplay, ObjectiveTimePicker.

Configuration :

modeOptions importé depuis config/gameConfig, utilisé pour initialiser useMode.

Note : Cette section met l’accent sur les constantes et dépendances. Le style est géré par StyleSheet et SafeAreaView, mais n’est pas détaillé ici.

Structure du rendu (JSX)

Le corps de NumbersScreen est organisé comme suit, reflétant l’ordre d’assemblage dans le JSX :

SafeAreaView

<SafeAreaView style={styles.container}>

Assure que le contenu respecte les zones sûres des appareils iOS et Android.

Wrapper principal (View)

<View
  style=[
    styles.content,
    mode === 'custom' && { justifyContent: 'flex-start' }
  ]
>

styles.content gère le padding horizontal et la flexbox.

Le style conditionnel replace le contenu vers le haut si mode vaut 'custom'.

HighlightBoxSetter

<HighlightBoxSetter
  label={previewDigits.join('')}
  icon={<Ionicons name="settings-outline" size={24} color="#fff" />}
  onPress={openModal}
/>

Affiche la chaîne de chiffres prévisualisée (previewDigits).

Icône paramétrable pour indiquer l’action de réglage.

onPress déclenche l’ouverture du modal.

DigitPickerModal

<DigitPickerModal
  visible={modalVisible}
  digitCount={digitCount}
  onValueChange={setDigitCount}
  onClose={closeModal}
/>

visible (boolean) : détermine si le modal est affiché (true) ou masqué (false). Contrôlé par l’état modalVisible fourni par useDigitPicker.

digitCount (number) : valeur courante du nombre de chiffres sélectionnés. Permet au modal d’afficher le slider ou le sélecteur à la position appropriée.

onValueChange (function) : callback invoqué lorsque l’utilisateur modifie la valeur du sélecteur à l’intérieur du modal. Appelle setDigitCount(newCount) pour mettre à jour l’état dans useDigitPicker.

onClose (function) : callback exécuté quand l’utilisateur ferme le modal (via un bouton de fermeture ou en cliquant hors du modal). Appelle closeModal() pour définir modalVisible à false.

ModePicker

<ModePicker
  variant="numbers"
  selectedValue={mode}
  onValueChange={onModeChange}
  options={options}
/>

variant (string) : définit le type de sélecteur pour adapter l’interface (ici "numbers").

selectedValue (string) : valeur actuellement sélectionnée (le mode de jeu), utilisée pour afficher l’option active.

onValueChange (function) : callback invoqué lorsque l’utilisateur change de mode ; appelle onModeChange(newMode) pour mettre à jour l’état mode via useMode.

options : liste d’objets { label: string; value: string } provenant de modeOptions, utilisée pour générer les choix du sélecteur.

ObjectiveTimePicker

<ObjectiveTimePicker
  mode={mode}
  objectif={objectif}
  onObjectifChange={setObjectif}
  temps={temps}
  onTempsChange={text => setTemps(parseInt(text, 10) || 0)}
/>

mode (string) : indique le mode de jeu pour ajuster les labels et la validation (durée vs nombre d’items).

objectif (string ou number) : valeur courante de l’objectif, affichée dans le champ dédié.

onObjectifChange (function) : callback déclenché lors de la modification du champ objectif ; appelle setObjectif(newObj) et persiste la valeur via useObjective.

temps (number) : durée actuelle du compte à rebours, affichée dans le champ temporel.

onTempsChange (function) : callback invoqué lors du changement du champ temps ; reçoit la saisie textuelle, la convertit en entier (parseInt) et met à jour temps via setTemps.

AutoAdvanceSwitch

{mode === 'custom' && (
  <AutoAdvanceSwitch
    enabled={autoAdvance}
    onToggle={toggleAutoAdvance}
  />
)}

enabled (boolean) : reflète l’état autoAdvance, indiquant si le jeu doit passer automatiquement à l’essai suivant.

onToggle (function) : callback appelé lors du basculement de l’interrupteur ; exécute toggleAutoAdvance(), qui inverse et persiste la préférence dans AsyncStorage.

RecordDisplay

<RecordDisplay
  score={lastScore}
  time={lastTime}
  hidden={mode === 'custom'}
/>

score (number) : valeur du dernier score obtenu, affichée sous forme de chiffre.

time (number) : durée du dernier essai, affichée en secondes.

hidden (boolean) : si true, l’affichage est masqué (utilisé pour ne pas montrer les statistiques en mode custom).

PlayButton

<PlayButton
  onPress={() =>
    navigation.navigate('Decompte', {
      objectif: parseInt(objectif, 10),
      temps,
      mode,
      digitCount,
      autoAdvance,
    })
  }
/>

onPress (function) : callback déclenché au clic ; appelle navigation.navigate('Decompte', params) pour démarrer l’écran de comptage.

params inclut :

objectif (number) : objectif converti en entier.

temps (number) : durée du compte à rebours.

mode (string) : mode de jeu sélectionné.

digitCount (number) : nombre de chiffres à mémoriser.

autoAdvance (boolean) : préférence d’avancement automatique.

SecondaryButton

<SecondaryButton onPress={() => {/* action */}}>
  Learn more
</SecondaryButton>

Bouton secondaire pour une action additionnelle (à définir).