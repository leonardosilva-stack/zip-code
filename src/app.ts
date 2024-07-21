import express from 'express';
import weatherRoutes from './routes/weatherRoutes';
import requestIp from 'request-ip';

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(requestIp.mw());
app.use('/weather', weatherRoutes);

export default app;
