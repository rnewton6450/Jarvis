import globals from "globals";

export default [
  {
    files: ["*.js"],
    languageOptions: {
      ecmaVersion: 2021, // Supports modern ECMAScript features
      sourceType: "module",
      globals: {
        ...globals.node, // Add Node.js global variables and scoping
      },
    },
    rules: {
      "no-unused-vars": "warn", // Warn about unused variables
      "no-undef": "off", // Turn off 'no-undef' for Node.js globals like require and module.exports
    },
  },
];
