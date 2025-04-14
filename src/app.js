const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Datos en memoria (simulando un almacenamiento temporal)
let citas = [];
let resultados = [
  {
    id: 1,
    paciente: 'Camila Ríos',
    examen: 'Sangre',
    resultado: 'Todo en niveles normales',
    fecha: '2025-04-10'
  },
  {
    id: 2,
    paciente: 'Carlos Gómez',
    examen: 'Rayos X',
    resultado: 'Fractura leve en el tobillo',
    fecha: '2025-04-08'
  }
];

let alertas = [
  {
    id: 1,
    tipo: 'Presión Alta',
    mensaje: 'Tu presión arterial ha estado alta durante 3 días seguidos',
    fecha: '2025-04-12'
  },
  {
    id: 2,
    tipo: 'Recordatorio',
    mensaje: 'Recuerda tomar tu medicamento para la tiroides a las 8:00 AM',
    fecha: '2025-04-13'
  }
];

// 1. Agendar cita
app.post('/citas', (req, res) => {
  const cita = { id: citas.length + 1, ...req.body };
  citas.push(cita);
  res.status(201).json({ mensaje: 'Cita agendada con éxito', cita });
});

// 2. Consultar resultados médicos
app.get('/resultados', (req, res) => {
  if (resultados.length === 0) {
    return res.status(404).json({ mensaje: 'No hay resultados disponibles' });
  }
  res.json({ resultados });
});

// 3. Recibir alertas de salud personalizadas
app.get('/alertas', (req, res) => {
  if (alertas.length === 0) {
    return res.status(404).json({ mensaje: 'No hay alertas disponibles' });
  }
  res.json({ alertas });
});

// 4. Endpoint para agregar alertas (solo para pruebas)
app.post('/alertas', (req, res) => {
  const alerta = { id: alertas.length + 1, ...req.body };
  alertas.push(alerta);
  res.status(201).json({ mensaje: 'Alerta registrada', alerta });
});

// Ruta para servir el index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor en puerto 3000'));
}
