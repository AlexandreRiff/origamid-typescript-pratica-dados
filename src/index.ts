import { CountList } from './helpers/countBy.js';
import Estatisticas from './Estatisticas.js';
import fetchData from './helpers/fetchData.js';
import normalizarTransacao from './helpers/normalizarTransacao.js';

const handleData = async () => {
  const data = await fetchData<TransacaoAPI[]>(
    'https://api.origamid.dev/json/transacoes.json'
  );

  if (!data) {
    return;
  }

  const transacoes = data.map(normalizarTransacao);

  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
};

const preencherLista = (lista: CountList, elementSelector: string): void => {
  const element = document.querySelector(elementSelector);
  if (!element) {
    return;
  }

  Object.keys(lista).forEach((key) => {
    element.innerHTML += `<p>${key}: ${lista[key]}</p>`;
  });
};

const preencherTabela = (transacoes: Transacao[]): void => {
  const tabela = document.querySelector(
    '[data-js="tabela-transacoes"] > tbody'
  );

  if (!tabela) {
    return;
  }

  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
    <tr>
      <td>${transacao.nome}</td>
      <td>${transacao.email}</td>
      <td>${transacao.moeda}</td>
      <td>${transacao.pagamento}</td>
      <td>${transacao.status}</td>
    </tr>
    `;
  });
};

const preencherEstatisticas = (transacoes: Transacao[]): void => {
  const data = new Estatisticas(transacoes);

  preencherLista(data.pagamento, '[data-js="est-pagamento"]');
  preencherLista(data.status, '[data-js="est-status"]');

  const total = document.querySelector<HTMLElement>(
    '[data-js="est-total"] > span'
  );

  if (!total) {
    return;
  }

  total.innerText = data.total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const melhorDia = document.querySelector<HTMLElement>(
    '[data-js="est-melhor-dia"] > span'
  );

  if (!melhorDia) {
    return;
  }

  melhorDia.innerText = data.melhorDia[0];
};

handleData();
