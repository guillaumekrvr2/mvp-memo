useLeaderboard Hook
Description générale
useLeaderboard retourne la liste des comptes triés selon leurs scores pour une discipline et un mode donnés, en s’appuyant sur le contexte utilisateur (AccountContext).

Fonctionnalités clés
Récupère accounts depuis AccountContext.

Trie les comptes via sortLeaderboardScores(accounts, discipline, mode, disciplines) dans un useMemo.

Ne recalcule le tri que si l’une des dépendances change.

Signature
ts
Copier
Modifier
function useLeaderboard(
  discipline: string,
  mode: string,
  disciplines: string[]
): Account[]
Code commenté
jsx
Copier
Modifier
export function useLeaderboard(discipline, mode, disciplines) {
  // récupération du contexte des comptes
  const { accounts } = useContext(AccountContext)

  // tri mémoïsé des scores
  const sorted = useMemo(
    () => sortLeaderboardScores(accounts, discipline, mode, disciplines),
    [accounts, discipline, mode, disciplines]
  )

  return sorted
}
Exemple d’utilisation
jsx
Copier
Modifier
function Leaderboard({ discipline, mode, disciplines }) {
  const sortedAccounts = useLeaderboard(discipline, mode, disciplines)

  return (
    <FlatList
      data={sortedAccounts}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <Text>
          {index + 1}. {item.username}: {item.scores[mode]}
        </Text>
      )}
    />
  )
}
perl
Copier
Modifier

Désolé pour la gêne, merci de copier-coller ces sections à l’emplacement souhaité