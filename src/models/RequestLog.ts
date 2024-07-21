import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class RequestLog extends Model {
  public id!: number;
  public ip!: string;
  public createdAt!: Date;
}

RequestLog.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'RequestLog',
  timestamps: false,
});

export default RequestLog;
