import Sequelize from 'sequelize';
import sequelize from '../database/database.js';
import UnidadeSaude from './unidadeSaudeModel.js';

const Paciente = sequelize.define("paciente", {
  id_paciente: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  rede_basica: {
    allowNull: false,
    type: Sequelize.STRING(3),
    validate: {
      len: [1, 3]
    }
  },
  numero_controle: {
    allowNull: true,
    type: Sequelize.INTEGER,
  },
  numero_amostra: {
    allowNull: true,
    type: Sequelize.INTEGER
  },
  nome_paciente: {
    allowNull: false,
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
  },
  quarteirao: {
    allowNull: true,
    type: Sequelize.STRING(10),
    validate: {
      len: [1, 10]
    }
  },
  numero_imovel: {
    allowNull: true,
    type: Sequelize.STRING(10),
    validate: {
      len: [1, 10]
    }
  },
  tratado: {
    allowNull: true,
    type: Sequelize.STRING(3),
    validate: {
      len: [1, 3]
    }
  },
  data_tratamento: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  peso: {
    allowNull: true,
    type: Sequelize.DOUBLE,
  },
  qtd_medicamento: {
    allowNull: true,
    type: Sequelize.DOUBLE
  },
  data_revisao: {
    allowNull: true,
    type: Sequelize.DATE
  },
  id_unidade_saude: {
    allowNull: false,
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
});

// Relacionamento
// Paciente.belongsTo(UnidadeSaude, {
//   foreignKey: 'id_unidade_saude',
//   as: 'unidade_saude'
// });

// UnidadeSaude.hasMany(Paciente, {
//   foreignKey: 'id_unidade_saude',
//   as: 'pacientes'
// });

export default Paciente;