# Starter Kit

**Starter Kit**, un point de départ simple pour tout projet front-end utilisant Webpack, Sass et JavaScript.

Ce projet est conçu pour apprendre à organiser son code, automatiser les tâches courantes (compilation, linting…) et comprendre le fonctionnement de la chaîne de production moderne côté front-end.

---

## Installation

Avant de commencer, assure-toi d’avoir Node.js installé sur ta machine.

```bash
git clone https://github.com/iamluxan/StarterKit.git
cd StarterKit
npm install
```

---

## Commandes disponibles

| Commande              | Description |
|-----------------------|-------------|
| `npm run watch`       | Lance Webpack en mode développement et surveille les fichiers. |
| `npm run build`       | Compile le projet en mode production (fichiers minifiés dans `public/dist/`). |
| `npm run scss-lint`   | Analyse les fichiers SCSS avec Stylelint. |
| `npm run scss-fix`    | Corrige automatiquement les erreurs SCSS quand c’est possible. |

---

## Configuration Webpack

Le fichier principal de configuration est `webpack.config.js`.

### Entrée

```js
entry: {
  theme: ['./assets/scripts/base.js', './assets/styles/base.scss']
}
```

### Sortie

- `public/dist/js/` pour le JavaScript
- `public/dist/css/` pour le CSS
- `public/dist/icons/sprite.svg` pour le sprite SVG

### Traitement du code

#### JavaScript

- Transpilation via Babel (`@babel/preset-env`)
- Compatible avec les navigateurs modernes
- Exclusion de `node_modules`

#### SCSS / CSS

- Traitement complet de `.scss` et `.css`
- Génération de source maps en mode développement
- Stack utilisée : `sass-loader` → `postcss-loader` (Autoprefixer) → `css-loader` → `MiniCssExtractPlugin`

#### Assets

- Les fichiers comme `.png`, `.svg`, `.woff`, `.jpg`, etc. sont copiés automatiquement avec un nom unique (hashé)
- Ils peuvent être utilisés dans les fichiers SCSS avec des chemins relatifs

---

## Utilisation des images dans les fichiers SCSS

Place tes images dans `assets/images/` puis dans un fichier SCSS :

```scss
background-image: url('../images/mon-image.jpg');
```

Webpack :

- copie automatiquement l’image dans `public/dist/css/`
- met à jour l’URL dans le CSS final

Ne stocke jamais d’images directement dans `dist/` (il est régénéré à chaque compilation).

---

## Système de sprite SVG

Le système de sprite est géré via `svg-sprite-loader`.

### Où mettre tes icônes

Place tous tes fichiers `.svg` dans :

```
assets/icons/
```

### Génération automatique

Webpack va créer un sprite global dans :

```
public/dist/icons/sprite.svg
```

### Chargement automatique

Ajoute dans ton JS (ex : dans `base.js`) :

```js
const icons = require.context('../icons', false, /\.svg$/);
```

### Utilisation dans le HTML

```html
<svg class="icon">
  <use xlink:href="/dist/icons/sprite.svg#nom-de-l-icone" />
</svg>
```

Remplace `nom-de-l-icone` par le nom du fichier `.svg` (sans extension).

---

## Linting

- ESLint est configuré avec `eslint.config.js` (format flat config - ESLint v9)
- Stylelint est utilisé pour les SCSS
- Les fichiers ignorés sont définis dans la config, pas dans `.eslintignore`

---

## Mode production

```bash
npm run build
```

Cela :

- active `mode: production`
- minifie le JS avec `terser-webpack-plugin`
- optimise le CSS avec `csso-webpack-plugin`
- génère `thirdPartyNotice.json` avec les licences

---

## Structure du projet

```
├── assets/
│   ├── scripts/
│   │   └── base.js
│   ├── styles/
│   │   └── base.scss
│   ├── icons/
│   │   └── mon-icone.svg
│   └── images/
│       └── mon-image.jpg
├── public/
│   ├── dist/
│   │   ├── js/
│   │   ├── css/
│   │   └── icons/
│   │       └── sprite.svg
├── index.html
├── package.json
├── webpack.config.js
├── eslint.config.js
└── .gitignore
```

---

## Conseils

- Utilise `npm run watch` pendant que tu développes : les fichiers seront automatiquement recompilés à chaque modification.
- Ne modifie jamais les fichiers dans `dist/` : ils sont régénérés automatiquement.
- Si tu ajoutes d'autres fichiers dans `assets/scripts/` ou `assets/styles/`, pense à les importer dans `base.js` ou `base.scss`.
- Pour les images appelées en SCSS, place-les dans `assets/images/` et utilise des chemins relatifs.