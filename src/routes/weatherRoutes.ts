import { Router } from 'express';
import { getWeatherInfo } from '../controllers/weatherController';

const router = Router();

router.get('/:countryCode/:cep', getWeatherInfo);

export default router;
