import { Paciente, UnidadeSaude } from '../model/index.js';
import Sequelize, { Op, fn, col } from 'sequelize';
import { calculaDataRevisao } from '../utils/dataUtils.js';
import { validarCamposObrigatorios, validarRedeBasica, validarTratamento } from '../validators/pacienteValidator.js';


// Busca todos os pacientes
export const buscaTodosPacientes = (req, res, next) => {
  let limite = parseInt(req.query.limite);
  let pagina = parseInt(req.query.pagina);

  const ITENS_POR_PAGINA = 10;

  if (!Number.isInteger(limite) || limite <= 0 || limite > ITENS_POR_PAGINA) {
    limite = ITENS_POR_PAGINA;
  }

  if (!Number.isInteger(pagina) || pagina < 1) pagina = 1;

  const offset = (pagina - 1) * limite;

  Paciente.findAll({ limit: limite, offset: pagina })
    .then(pacientes => {
      res.send(pacientes);
    })
    .catch(error => next(error));
};

// Busca por nome do paciente
export const buscaPorNome = (req, res, next) => {
  const nome = req.query.nome;

  if (!nome || nome.trim() === '') {
    return res.status(400).send('Parâmetro "nome" é obrigatório');
  }

  Paciente.findAll({
    where: {
      nome_paciente: {
        [Op.like]: `%${nome}%`
      }
    }
  })
    .then(pacientes => {
      res.json(pacientes);
    })
    .catch(error => next(error));
};

// Busca por paciente da rede basica
export const buscaRedeBasica = (req, res, next) => {
  Paciente.findAll({
    where: {
      rede_basica: 'SIM'
    }
  })
    .then(pacientes => {
      res.json(pacientes);
    })
    .catch(error => next(error))
};

// busca os pacientes que não são da rede básica
export const buscaNaoRedeBasica = (req, res, next) => {
  Paciente.findAll({
    where: {
      rede_basica: 'NÃO'
    }
  })
    .then(pacientes => {
      res.json(pacientes);
    })
    .catch(error => next(error));
};

// Busca todos os pacientes tratados
export const buscaPorTratado = (req, res, next) => {
  Paciente.findAll({
    where: {
      tratado: 'SIM'
    }
  })
    .then(pacientes => {
      res.json(pacientes);
    })
    .catch(error => next(error));
}

// Busca paciente por localidade
export const buscaPorLocalidade = (req, res, next) => {
  const localidade = req.query.localidade;

  if (!localidade || localidade.trim() === '') {
    return res.status(400).send("O parâmetro 'localidade' é obrigatório")
  }

  Paciente.findAll({
    where: {
      localidade: {
        [Op.like]: `%${localidade}%`
      }
    }
  })
    .then(pacientes => {
      res.json(pacientes)
    })
    .catch(error => next(error));
}

// Busca paciente por ano
export const buscaPorAno = (req, res, next) => {
  const ano = req.query.ano;

  if (!ano || isNaN(ano)) {
    return res.status(400).send('Parâmetro "ano" é obrigatório');
  }

  Paciente.findAll({
    where:
      Sequelize.where(fn('YEAR', col('data_tratamento')), ano)
  })
    .then(pacientes => {
      res.json(pacientes);
    })
    .catch(error => next(error));
};

// Cadastro de paciente
export const cadastaPaciente = async (req, res, next) => {
  try {
    const body = req.body;
    const { id_unidade_saude } = body;

    validarCamposObrigatorios(body);
    validarRedeBasica(body);
    validarTratamento(body);


    // Verifica se unidade de saúde existe
    const unidade = await UnidadeSaude.findByPk(id_unidade_saude);
    if (!unidade) {
      return res.status(400).send('Unidade de saúde não encontrada');
    }

    const dataRevisao = body.tratado === 'SIM' && body.data_tratamento ? calculaDataRevisao(body.data_tratamento) : null


    // Criação do paciente
    await Paciente.create({
      ...body,
      quarteirao: body.quarteirao ? body.quarteirao?.toString().trim() : null,
      numero_imovel: body.numero_imovel ? body.numero_imovel?.toString().trim() : null,
      data_revisao: dataRevisao,
    });

    res.status(201).send('Paciente cadastrado com sucesso');
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    res.status(400).send(error.message || 'Erro interno ao cadastrar paciente')
  }
};

// Atualiza dados do paciente
export const atualizaPaciente = async (req, res, next) => {
  try {
    const id = req.params.id_paciente;
    const body = req.body;
    const { id_unidade_saude } = body


    // Verifica se paciente existe
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send('Paciente não encontrado');
    }

    validarCamposObrigatorios(body);
    validarRedeBasica(body);
    validarTratamento(body);

    // Verifica se unidade de saúde existe
    const unidade = await UnidadeSaude.findByPk(id_unidade_saude);
    if (!unidade) {
      return res.status(400).send('Unidade de saúde não encontrada');
    }

    const dataRevisao = body.tratado === 'SIM' && body.data_tratamento ? calculaDataRevisao(body.data_tratamento) : null


    // Atualiza paciente
    await Paciente.update({
      ...body,
      quarteirao: body.quarteirao ? body.quarteirao.toString().trim() : null,
      numero_imovel: body.numero_imovel ? body.numero_imovel.toString().trim() : null,
      data_revisao: dataRevisao,
    }, {
      where: { id_paciente: id }
    });

    res.status(200).send('Paciente atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(400).send(error.message || 'Erro interno ao atualizar paciente.')
  }
};

export const excluirPaciente = async (req, res, next) => {
  try {
    const id = req.params.id_paciente;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).send('Paciente não encontrado');
    }

    await paciente.destroy();
    res.status(200).send('Paciente excluído com sucesso');
  } catch (error) {
    next(error)
  }
};

