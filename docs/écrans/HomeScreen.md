Documentation des Composants

Ce document vise à centraliser la mémoire de fonctionnement de chaque composant de l'application. Il sera intégré directement dans l'application pour être facilement accessible et compréhensible par tout développeur ou éditeur de code intelligent (type "cursor").

Intégration et organisation dans l'application

Pour que la documentation soit directement accessible au sein de votre application, voici les bonnes pratiques courantes :

Dossier dédié au code source

Créez un dossier docs/ à la racine de votre projet ou, pour une app monorepo, packages/app/docs/.

Chaque composant a son propre fichier Markdown (ex. Button.md, Modal.md) ou un dossier s’il comporte plusieurs ressources (Button/README.md, Button/examples/).

Fichiers Markdown versionnés

Stockez la documentation en .md (ou .mdx si vous avez besoin d’inclure des composants React directement).

Intégrez ces fichiers dans votre dépôt Git pour gérer l’historique et les contributions.

Génération d’un site statique (optionnel)

Utilisez un générateur de documentation (Docusaurus, Storybook, Docz, Styleguidist) pour produire un site web interne.

Lorsqu’un éditeur de code « intelligent » (type Cursor) indexe votre projet, il pourra lire directement les fichiers Markdown.

Intégration dans l’application

Si vous souhaitez afficher la doc in-app, utilisez un composant Markdown renderer (React : react-markdown, Vue : vue-markdown).

Chargez dynamiquement les .md depuis le dossier docs/ et affichez-les dans une section « Documentation » ou « Aide » de votre application.

Navigation et recherche

Ajoutez un index (table des matières) généré automatiquement.

Proposez une recherche textuelle (Algolia DocSearch, Fuse.js) pour retrouver rapidement un composant.

Exemples et playground

Pour chaque composant, incluez une section « Live example » ou « Sandbox » (avec CodeSandbox embed ou Storybook).

Automatisation et validationDans un processus d’intégration continue (CI), chaque modification de code et de documentation passe par un pipeline automatisé. Cela garantit la qualité et l’exactitude de vos fichiers Markdown avant qu’ils ne soient fusionnés :

CI (Continuous Integration) : serveur ou service (GitHub Actions, GitLab CI, Jenkins, CircleCI…) qui exécute automatiquement des tâches à chaque push ou pull request.

Vérification des liens brisés : utilisez un outil comme markdown-link-check ou remark-lint dans un job CI pour scanner tous vos .md et signaler les URLs ou chemins relatifs invalides.

# Exemple GitHub Actions
name: Docs Validation
on: [push, pull_request]
jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install markdown-link-check
      - name: Check links
        run: npx markdown-link-check -c link-check.config.json "docs/**/*.md"

Hook Git pre-commit : avec husky et lint-staged, empêchez la validation de docs sans tests :

// package.json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "docs/**/*.md": [
    "markdown-link-check -c link-check.config.json",
    "git add"
  ]
}

Autres validations possibles :

Vérifier la présence de sections obligatoires (front-matter, titre, structure).

Générer et tester automatiquement la table des matières.

Linter MDX si vous utilisez ce format.

Processus étape par étape

Voici comment démarrer immédiatement la création de votre documentation :

Initialiser le dossier de docs

À la racine de votre projet, créez le dossier docs/ (ou packages/app/docs/ si monorepo).

Ajoutez un .gitkeep ou un README.md minimal pour versionner dès maintenant.

Lister les composants

Exportez ou récupérez la liste des noms de tous vos composants (fichiers .jsx, .vue, .ts, etc.).

Créez un fichier docs/components.json ou un simple docs/INDEX.md listant chaque nom.

Générer les fichiers Markdown

Pour chaque composant, créez un fichier vide NomComponent.md dans docs/.

Copiez-y le template de documentation (à partir du gabarit au début de ce doc).

Remplir la documentation basique

Pour chaque composant, procédez par priorité :a. Description générale et Fonctionnalités.b. Props / Paramètres et Événements / Callbacks.c. Interactions et dépendances.d. Exemple d’utilisation.e. Notes techniques.

Valider localement

Ouvrez les .md dans VS Code avec un plugin Markdown Preview (ou MDX Preview).

Relisez chaque section pour cohérence et complétude.

Mettre en place une navigation

Créez ou mettez à jour docs/INDEX.md pour pointer vers chaque fiche.

Si besoin, ajoutez un script simple (Node.js, Python) pour générer automatiquement la table des matières.

Intégration in-app

Installez un renderer Markdown (react-markdown ou équivalent).

Chargez dynamiquement les fichiers docs/*.md via l’API de votre bundler (Webpack, Vite) ou en fetch.

Revue et itération

Ouvrez une pull request pour la première version de la doc.

Faites relire par un collègue ou utilisez un outil de relecture (Grammarly, Vale) pour améliorer la clarté.

Une fois ces étapes complétées, vous aurez une base solide et versionnée de votre documentation, prête à être enrichie et automatisée.

Documentation des Composants

HomeScreen

Nom du composant : HomeScreen

Description générale :C'est l'écran d'accueil de l'application. Il présente une grille de boutons (MenuButton) permettant de naviguer vers différentes sections (Numbers, Cards, Words, etc.), et un bouton secondaire (SecondaryButton) pour une action complémentaire ("Learn more").

Fonctionnalités :

Affichage dynamique d'une liste d'options de navigation sous forme de grille.

Navigation vers les écrans correspondants grâce à useNavigation de React Navigation.

Affichage d'un bouton secondaire pour une action additionnelle.

Props / Paramètres :

Aucun prop direct. Les données sont internes au composant (tableau options).

Événements / Callbacks :

MenuButton :

onPress: callback appelé lors de l'appui, déclenche navigation.navigate(o.screen).

SecondaryButton :

onPress: callback placeholder pour l'action "Learn more" (à implémenter).

Interactions et dépendances :

React Navigation (useNavigation) pour gérer la navigation.

Styled Components (Container, Grid) pour la mise en page.

Composants atoms :

MenuButton et SecondaryButton pour l'interface utilisateur.

Exemple d'utilisation :

import HomeScreen from './screens/HomeScreen';
// Utilisé comme composant de route dans votre stack navigator
<Stack.Screen name="Home" component={HomeScreen} />

Notes techniques / Particularités :

Le tableau options peut être déplacé dans un fichier de configuration externe pour faciliter l'ajout ou la traduction.

Pensez à gérer les clés (key={o.screen}) pour éviter les warnings React.

Le SecondaryButton est prévu pour une action future; prévoir une prop label si le texte doit être configurable.

