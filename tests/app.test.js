const request = require('supertest');
const app = require('../src/app'); // ajusta la ruta según tu estructura real

describe('VitalApp API', () => {

  it('GET / debería responder con saludo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('¡Hola desde Node.js!');
  });

  it('POST /citas debería agendar una cita', async () => {
    const cita = {
      paciente: 'Juan Perez',
      fecha: '2025-04-14',
      hora: '10:00',
      motivo: 'Chequeo general'
    };

    const res = await request(app).post('/citas').send(cita);
    expect(res.statusCode).toBe(201);
    expect(res.body.cita).toMatchObject(cita);
  });

  it('GET /resultados debería devolver resultados', async () => {
    const res = await request(app).get('/resultados');
    expect(res.statusCode).toBe(200);
    
    // Aquí aceptamos que haya datos de prueba y verificamos si los resultados están presentes
    expect(res.body.resultados.length).toBeGreaterThan(0);  // Verifica que haya al menos un resultado
    expect(res.body.resultados[0]).toHaveProperty('examen');
    expect(res.body.resultados[0]).toHaveProperty('resultado');
  });

  it('POST /alertas debería registrar una alerta', async () => {
    const alerta = {
      mensaje: 'Recuerda tomar tu medicina a las 8pm',
      tipo: 'Recordatorio'
    };

    const res = await request(app).post('/alertas').send(alerta);
    expect(res.statusCode).toBe(201);
    expect(res.body.alerta).toMatchObject(alerta);
  });

  it('GET /alertas debería devolver las alertas registradas', async () => {
    const res = await request(app).get('/alertas');
    expect(res.statusCode).toBe(200);
    expect(res.body.alertas.length).toBeGreaterThan(0);  // Verifica que haya al menos una alerta
  });

});
