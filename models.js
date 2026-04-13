class Filme {
  constructor({ id, estilo = null, nome, ano, duracao, foto, sinopse = null, video = null }) {
    this.id = id;
    this.estilo = estilo;
    this.nome = nome;
    this.ano = ano;
    this.duracao = duracao;
    this.foto = foto;
    this.sinopse = sinopse;
    this.video = video;
  }

  update({ estilo, nome, ano, duracao, foto, sinopse, video }) {
    if (estilo !== undefined) this.estilo = estilo;
    if (nome !== undefined) this.nome = nome;
    if (ano !== undefined) this.ano = ano;
    if (duracao !== undefined) this.duracao = duracao;
    if (foto !== undefined) this.foto = foto;
    if (sinopse !== undefined) this.sinopse = sinopse;
    if (video !== undefined) this.video = video;
  }
}

class Locacao {
  constructor({ id, filmeId, cliente, dataLocacao, dataDevolucao = null, status }) {
    this.id = id;
    this.filmeId = filmeId;
    this.cliente = cliente;
    this.dataLocacao = dataLocacao;
    this.dataDevolucao = dataDevolucao;
    this.status = status;
  }

  update({ filmeId, cliente, dataLocacao, dataDevolucao, status }) {
    if (filmeId !== undefined) this.filmeId = filmeId;
    if (cliente !== undefined) this.cliente = cliente;
    if (dataLocacao !== undefined) this.dataLocacao = dataLocacao;
    if (dataDevolucao !== undefined) this.dataDevolucao = dataDevolucao;
    if (status !== undefined) this.status = status;
  }
}

module.exports = { Filme, Locacao };