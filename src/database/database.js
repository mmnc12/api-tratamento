import 'dotenv/config';
import Sequelize from 'sequelize';
import config from '../config/config.js';

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database.name,
  dbConfig.database.user,
  dbConfig.database.password,
  {
    host: dbConfig.database.host,
    port: dbConfig.database.port,
    dialect: dbConfig.database.dialect
  }
);

export default sequelize;