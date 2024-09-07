module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', // This is the standard preset for React Native
    '@babel/preset-react', // Enables React JSX syntax
    '@babel/preset-flow', // Enables Flow type syntax
  ],
  plugins: [
    '@babel/plugin-syntax-flow', // Adds support for parsing Flow syntax
    ['@babel/plugin-transform-class-properties', {loose: true}], // Ensure loose mode is set here
    ['@babel/plugin-transform-private-methods', {loose: true}], // Add loose mode for private methods
    ['@babel/plugin-transform-private-property-in-object', {loose: true}], // Add loose mode for private property in object
  ],
};
