import Paciente from './pacienteModel.js';
import UnidadeSaude from './unidadeSaudeModel.js';
import Usuario from './usuario.js';

Paciente.belongsTo(UnidadeSaude, {
  foreignKey: 'id_unidade_saude',
  as: 'unidade_saude'
});
UnidadeSaude.hasMany(Paciente, {
  foreignKey: 'id_unidade_saude',
  as: 'paciente'
});

export { Paciente, UnidadeSaude, Usuario};