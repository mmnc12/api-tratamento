export const calculaDataRevisao = (data_tratamento, dias = 40) => {
  const data = new Date(data_tratamento);
  if (isNaN(data)) return null;

  data.setDate(data.getDate() + dias);
  return data;
}