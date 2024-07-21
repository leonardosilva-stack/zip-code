import { Op } from 'sequelize';
import RequestLog from '../models/RequestLog';

export const rateLimiter = async (ip: string): Promise<boolean> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const logsCount = await RequestLog.count({
    where: {
      ip,
      createdAt: {
        [Op.gte]: today,
      },
    },
  });

  if (logsCount >= 5) {
    return true;
  }

  await RequestLog.create({ ip });
  return false;
};
