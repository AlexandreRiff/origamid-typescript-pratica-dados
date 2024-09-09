/**
 * Recebe string '1.200,50' e retorna 1200.50
 */
const moedaParaNumero = (moeda: string): number | null => {
  const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
  if (isNaN(numero)) {
    return null;
  }

  return numero;
};

export default moedaParaNumero;
