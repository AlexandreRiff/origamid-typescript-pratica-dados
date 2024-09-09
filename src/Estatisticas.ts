import countBy from './helpers/countBy.js';

class Estatisticas {
  private transacoes;
  public total;
  public pagamento;
  public status;
  private semana;
  public melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }

  private setTotal() {
    type TransacaoValor = Transacao & { valor: number };

    const filtrarValor = (transacao: Transacao): transacao is TransacaoValor =>
      transacao.valor !== null;

    const total = this.transacoes
      .filter(filtrarValor)
      .reduce((total, { valor }) => {
        return total + valor;
      }, 0);

    return total;
  }

  private setPagamento() {
    const pagamentos = this.transacoes.map(({ pagamento }) => pagamento);

    return countBy(pagamentos);
  }

  private setStatus() {
    const status = this.transacoes.map(({ status }) => status);

    return countBy(status);
  }

  private setSemana() {
    type DiaSemana =
      | 'Domingo'
      | 'Segunda'
      | 'Terça'
      | 'Quarta'
      | 'Quinta'
      | 'Sexta'
      | 'Sábado';

    const diaSemana: DiaSemana[] = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];

    const totalDiaSemana: {
      [K in DiaSemana]: number;
    } = {
      ['Domingo']: 0,
      ['Segunda']: 0,
      ['Terça']: 0,
      ['Quarta']: 0,
      ['Quinta']: 0,
      ['Sexta']: 0,
      ['Sábado']: 0,
    };

    this.transacoes.forEach(({ data }) => {
      const dia = data.getDay();
      totalDiaSemana[diaSemana[dia]] += 1;
    });

    return totalDiaSemana;
  }

  private setMelhorDia() {
    return Object.entries(this.semana).sort((a, b) => b[1] - a[1])[0];
  }
}

export default Estatisticas;
