import { Router } from 'express';
import { getWeatherInfo } from '../controllers/weatherController';

const router = Router();

router.get('/:cep', getWeatherInfo);

export default router;
