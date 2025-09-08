import Sequelize from 'sequelize';
import sequelize from '../database/database.js';
import Paciente from './pacienteModel.js';

const UnidadeSaude = sequelize.define("unidade_saude", {
  id_unidade_saude: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  numero_unidade_saude: {
    allowNull: true,
    type: Sequelize.INTEGER
  },
  nome_unidade_saude: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      len: [3, 45]
    }
  },
  nome_enfermeira: {
    allowNull: true,
    type: Sequelize.STRING(45),
    validate: {
      len: [3, 45]
    }
  },
  localidade: {
    allowNull: false,
    type: Sequelize.STRING(45),
    validate: {
      len: [3, 45]
    }
  }
}, {
  timestamps: true,
});

export default UnidadeSaude;