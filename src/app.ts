import express from 'express';
import weatherRoutes from './routes/weatherRoutes';
import sequelize from './models';
import requestIp from 'request-ip';

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(requestIp.mw());
app.use('/weather', weatherRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

export default app;
