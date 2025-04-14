const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola desde Node.js!');
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor en puerto 3000'));
}
