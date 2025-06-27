useDigitPicker Hook

Description générale

useDigitPicker est un hook qui gère la sélection dynamique du nombre de chiffres et la prévisualisation aléatoire associée, ainsi que l’affichage d’un modal pour modifier cette valeur.

Fonctionnalités clés

Initialise digitCount avec la valeur initialCount passée en paramètre (par défaut 6).

Génère un tableau previewDigits de digitCount chiffres aléatoires à chaque changement de digitCount, pour l’aperçu.

Gère l’état modalVisible pour contrôler l’affichage du modal de sélection.

Expose des callbacks openModal et closeModal pour basculer l’affichage du modal.

Signature

function useDigitPicker(
  initialCount?: number
): {
  digitCount: number;
  setDigitCount: (n: number) => void;
  previewDigits: number[];
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

Paramètre :

initialCount (number, optionnel) : nombre de chiffres par défaut au démarrage.

Retourne :

digitCount (number) : nombre de chiffres sélectionnés.

setDigitCount (function) : setter pour modifier manuellement digitCount.

previewDigits (number[]) : tableau de chiffres générés pour l’aperçu.

modalVisible (boolean) : état d’affichage du modal.

openModal (function) : callback pour afficher le modal.

closeModal (function) : callback pour masquer le modal.

Code commenté

export default function useDigitPicker(initialCount = 6) {
  // 1) État du nombre de chiffres
  const [digitCount, setDigitCount] = useState(initialCount)
  // 2) Génération de l’aperçu aléatoire
  const [previewDigits, setPreviewDigits] = useState([])
  // 3) État d’affichage du modal
  const [modalVisible, setModalVisible] = useState(false)

  // À chaque modification de digitCount, générer de nouveaux chiffres
  useEffect(() => {
    const arr = Array.from({ length: digitCount }, () =>
      Math.floor(Math.random() * 10)
    )
    setPreviewDigits(arr)
  }, [digitCount])

  // Callbacks pour contrôler l’affichage du modal
  const openModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)

  // Retourne l’état et les callbacks
  return {
    digitCount,
    setDigitCount,
    previewDigits,
    modalVisible,
    openModal,
    closeModal,
  }
}

Exemple d’utilisation

function DigitSelector() {
  // Hook pour gérer la sélection et l’aperçu
  const {
    digitCount,
    previewDigits,
    modalVisible,
    openModal,
    closeModal,
    setDigitCount
  } = useDigitPicker(4)

  return (
    <View>
      <Text>Preview: {previewDigits.join(" ")}</Text>
      <Button onPress={openModal}>Choisir le nombre</Button>
      {modalVisible && (
        <Modal>
          {/* UI pour choisir le nouveau digitCount */}
          <Slider
            value={digitCount}
            onValueChange={setDigitCount}
            minimumValue={1}
            maximumValue={10}
          />
          <Button onPress={closeModal}>Valider</Button>
        </Modal>
      )}
    </View>
  )
}

Cette section documente useDigitPicker, son état interne, son mode modal et la génération d’aperçus aléatoires.