module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  rules: {
    
    'no-console': 'warn',       // console.log será warning (no error)
    'no-unused-vars': 'warn',  // Variables no usadas = warning
    // Otra opción: sobrescribir todas las reglas para que sean warnings
    ...Object.fromEntries(
      Object.entries(require('eslint/conf/eslint-recommended').rules)
        .map(([rule]) => [rule, 'warn'])
    ),
  },
};