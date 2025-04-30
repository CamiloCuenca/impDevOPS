const request = require('supertest');
const app = require('../src/app');

describe('VitalApp API', () => {
  // Datos de prueba
  const testCedula = '1234567890'; // Cédula de Juan que existe en los datos
  const testCedulaInexistente = '0000000000';
  
  const nuevaCita = {
    nombre: 'Test User',
    cedula: '1111111111',
    fecha: '2025-06-01',
    motivo: 'Prueba unitaria'
  };

  it('POST /citas debería agendar una cita', async () => {
    const res = await request(app)
      .post('/citas')
      .send(nuevaCita);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', 'Cita agendada con éxito');
    expect(res.body.cita).toMatchObject(nuevaCita);
  });

  it('GET /resultados debería devolver resultados con cédula válida', async () => {
    const res = await request(app)
      .get('/resultados')
      .query({ cedula: testCedula });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.resultados.length).toBeGreaterThan(0);
    expect(res.body.resultados[0]).toHaveProperty('examen');
    expect(res.body.resultados[0]).toHaveProperty('resultado');
  });

  it('GET /resultados debería fallar sin cédula', async () => {
    const res = await request(app)
      .get('/resultados');
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
  });

  it('GET /resultados debería devolver vacío con cédula inexistente', async () => {
    const res = await request(app)
      .get('/resultados')
      .query({ cedula: testCedulaInexistente });
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('mensaje');
  });

  it('GET /citas debería devolver citas con cédula válida', async () => {
    const res = await request(app)
      .get('/citas')
      .query({ cedula: testCedula });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.citas.length).toBeGreaterThan(0);
    expect(res.body.citas[0]).toHaveProperty('fecha');
    expect(res.body.citas[0]).toHaveProperty('motivo');
  });

  it('GET /citas debería fallar sin cédula', async () => {
    const res = await request(app)
      .get('/citas');
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('mensaje');
  });

  it('GET /citas debería devolver vacío con cédula inexistente', async () => {
    const res = await request(app)
      .get('/citas')
      .query({ cedula: testCedulaInexistente });
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('mensaje');
  });
});