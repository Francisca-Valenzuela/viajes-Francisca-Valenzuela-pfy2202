module.exports = {
  presets: [
    // modules: false -> se mantiene la sintaxis ESM (Jest corre en modo ESM nativo)
    ["@babel/preset-env", { targets: { node: "current" }, modules: false }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};