// === Import automatique de tous les SVG dans assets/icons/ ===
const importAll = (r) => r.keys().forEach(r);
importAll(require.context('../icons', false, /\.svg$/));