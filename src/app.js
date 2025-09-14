import 'dotenv/config';
import express from 'express';
import authRouter from './routes/authRoute.js';
import pacientesRouter from './routes/pacienteRoute.js';
import sequelize from './database/database.js';
import './model/index.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api', pacientesRouter);

app.use((req, res, next) => {
  res.status(400).json({ error: 'Rota não encontrada' });
});

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.status || 500;
  res.status(status).json({ error: error.message || 'Erro interno do servidor '})
});

sequelize.sync({ alter: true }).then(() => {
  const port = process.env.PORT || 8080
  app.listen(port, () => {
    console.log('Servidor rodando na porta:', port, 'desde', new Date().toISOString());
  });
});