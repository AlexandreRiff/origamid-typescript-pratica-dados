import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";

declare global {
  type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
  type TransacaoStatus =
    | "Paga"
    | "Recusada pela operadora de cartão"
    | "Aguardando pagamento"
    | "Estornada";

  interface TransacaoAPI {
    ID: number;
    Nome: string;
    Email: string;
    Status: TransacaoStatus;
    Data: string;
    ["Valor (R$)"]: string;
    ["Forma de Pagamento"]: TransacaoPagamento;
    ["Cliente Novo"]: number;
  }

  interface Transacao {
    id: number;
    nome: string;
    email: string;
    status: TransacaoStatus;
    data: Date;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo: boolean;
  }
}

const normalizarTransacao = (transacao: TransacaoAPI): Transacao => {
  return {
    id: transacao.ID,
    nome: transacao.Nome,
    email: transacao.Email,
    status: transacao.Status,
    data: stringToDate(transacao.Data),
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
};

export default normalizarTransacao;
