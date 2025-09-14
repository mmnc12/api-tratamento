import Sequelize from 'sequelize';
import sequelize from '../database/database.js';

const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

export default Usuario;