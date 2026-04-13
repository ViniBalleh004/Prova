/**
 * Representa um filme no sistema.
 *
 * Campos do banco de dados:
 * - id: integer PK not null
 * - estilo: tinyint FK null
 * - nome: varchar(30) not null
 * - ano: integer (4 dígitos) not null
 * - duracao: integer (3 dígitos) not null
 * - foto: varchar(45) not null
 * - sinopse: long varchar null
 * - video: varchar(45) null
 */
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

/**
 * Representa uma locação de filme no sistema.
 *
 * Campos do banco de dados:
 * - id: double PK not null
 * - filmeId: integer FK null
 * - clienteId: numeric(1B) null
 * - emissao: timestamp null
 * - devolucao: timestamp null
 * - valor: decimal(10,2) null
 */
class Locacao {
  constructor({ id, filmeId = null, clienteId = null, emissao = null, devolucao = null, valor = null }) {
    this.id = id;
    this.filmeId = filmeId;
    this.clienteId = clienteId;
    this.emissao = emissao;
    this.devolucao = devolucao;
    this.valor = valor;
  }

  update({ filmeId, clienteId, emissao, devolucao, valor }) {
    if (filmeId !== undefined) this.filmeId = filmeId;
    if (clienteId !== undefined) this.clienteId = clienteId;
    if (emissao !== undefined) this.emissao = emissao;
    if (devolucao !== undefined) this.devolucao = devolucao;
    if (valor !== undefined) this.valor = valor;
  }
}

module.exports = { Filme, Locacao };