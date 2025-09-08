export function validarCamposObrigatorios(body) {
  const { rede_basica, nome_paciente, localidade, tratado, id_unidade_saude } = body;

  if (
    typeof rede_basica !== 'string' || !rede_basica.trim() ||
    typeof nome_paciente !== 'string' || !nome_paciente.trim() ||
    typeof localidade !== 'string' || !localidade.trim() ||
    typeof tratado !== 'string' || !tratado.trim() ||
    !id_unidade_saude
  ) {
    throw new Error('Campos obrigatórios ausentes ou inválidos');
  }
}

export function validarRedeBasica(body) {
  const { rede_basica, numero_amostra, quarteirao, numero_imovel } = body;

  if (rede_basica === 'NÃO') {
    if (
      !numero_amostra || isNaN(Number(numero_amostra)) ||
      !quarteirao || quarteirao.toString().trim().length < 1 ||
      !numero_imovel || numero_imovel.toString().trim().length < 1
    ) {
      throw new Error('Se o caso não for da rede básica, os campos "número da amostra", "quarteirão" e "número do imóvel" são obrigatórios.');
    }
  }
}

export function validarTratamento(body) {
  const { tratado, data_tratamento, peso, qtd_medicamento } = body;

  if (tratado === 'SIM') {
    if (
      !data_tratamento || isNaN(Date.parse(data_tratamento)) ||
      typeof peso !== 'number' || isNaN(peso) ||
      typeof qtd_medicamento !== 'number' || isNaN(qtd_medicamento)
    ) {
      throw new Error('Campos obrigatórios de tratamento ausentes ou inválidos');
    }
  }

  if (tratado !== 'SIM') {
    if (
      data_tratamento ||
      peso !== undefined && peso !== null ||
      qtd_medicamento !== undefined && qtd_medicamento !== null
    ) {
      throw new Error('Se o paciente não foi tratado, os campos "data de tratamento", "peso" e "quantidade de medicamento" devem estar ausentes.');
    }
  }
}
