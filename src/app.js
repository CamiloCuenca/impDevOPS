const express = require('express');
const path = require('path');
const app = express();

// Middleware para CORS
app.use((req, res, next) => {
  // Permitir solicitudes desde localhost y desde el dominio de producción
  const allowedOrigins = ['http://localhost:3000', 'https://impdevops.onrender.com'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // Para solicitudes que no tienen un origen (como curl) o desde otros dominios
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Datos en memoria (simulando un almacenamiento temporal)
let citas = [
  {
    id: 1,
    nombre: 'Camila Ríos',
    cedula: '9876543210',
    fecha: '2025-04-15',
    motivo: 'Chequeo general'
  },
  {
    id: 2,
    nombre: 'Carlos Gómez',
    cedula: '5678901234',
    fecha: '2025-04-16',
    motivo: 'Consulta de seguimiento'
  },
  {
    id: 3,
    nombre: 'Juan',
    cedula: '1234567890',
    fecha: '2025-04-20',
    motivo: 'Control de rutina'
  },
  {
    id: 4,
    nombre: 'Juan',
    cedula: '1234567890',
    fecha: '2025-05-05',
    motivo: 'Revisión de exámenes'
  },
  {
    id: 5,
    nombre: 'Juan',
    cedula: '1234567890',
    fecha: '2025-05-21',
    motivo: 'Consulta de especialidad'
  }
];

let resultados = [
  {
    id: 1,
    paciente: 'Camila Ríos',
    cedula: '9876543210',
    examen: 'Sangre',
    resultado: 'Todo en niveles normales',
    fecha: '2025-04-10'
  },
  {
    id: 2,
    paciente: 'Carlos Gómez',
    cedula: '5678901234',
    examen: 'Rayos X',
    resultado: 'Fractura leve en el tobillo',
    fecha: '2025-04-08'
  },
  {
    id: 3,
    paciente: 'Juan',
    cedula: '1234567890',
    examen: 'Hemograma',
    resultado: 'Valores dentro del rango normal',
    fecha: '2025-04-12'
  },
  {
    id: 4,
    paciente: 'Juan',
    cedula: '1234567890',
    examen: 'Colesterol',
    resultado: 'Niveles de colesterol elevados',
    fecha: '2025-04-12'
  },
  {
    id: 5,
    paciente: 'Juan',
    cedula: '1234567890',
    examen: 'Radiografía de tórax',
    resultado: 'Sin hallazgos significativos',
    fecha: '2025-04-15'
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
  const { cedula } = req.query;
  
  if (!cedula) {
    return res.status(400).json({ mensaje: 'Debe proporcionar una cédula para consultar resultados' });
  }

  const resultadosPaciente = resultados.filter(resultado => resultado.cedula === cedula);
  
  if (resultadosPaciente.length === 0) {
    return res.status(404).json({ mensaje: 'No hay resultados disponibles para este paciente' });
  }
  
  res.json({ resultados: resultadosPaciente });
});

// 3. Ver todas las citas agendadas por paciente
app.get('/citas', (req, res) => {
  const { cedula } = req.query;
  
  if (!cedula) {
    return res.status(400).json({ mensaje: 'Debe proporcionar una cédula para consultar citas' });
  }

  const citasPaciente = citas.filter(cita => cita.cedula === cedula);
  
  if (citasPaciente.length === 0) {
    return res.status(404).json({ mensaje: 'No hay citas agendadas para este paciente' });
  }
  
  res.json({ citas: citasPaciente });
});

// Ruta para servir el index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Agregar un endpoint para verificar la conexión API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}