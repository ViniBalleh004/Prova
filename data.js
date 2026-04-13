const { Filme, Locacao } = require('./models');

const filmes = [
  new Filme({
    id: 1,
    estilo: 1,
    nome: 'Matrix',
    ano: 1999,
    duracao: 136,
    foto: 'matrix.jpg',
    sinopse: 'Um hacker descobre que a realidade é uma simulação e se une a rebeldes para lutar contra máquinas.',
    video: 'matrix.mp4'
  }),
  new Filme({
    id: 2,
    estilo: 2,
    nome: 'O Poderoso Chefão',
    ano: 1972,
    duracao: 175,
    foto: 'godfather.jpg',
    sinopse: 'A saga da família mafiosa Corleone e a ascensão de seu filho Michael ao poder.',
    video: 'godfather.mp4'
  })
];

const locacoes = [
  new Locacao({
    id: 1,
    filmeId: 1,
    clienteId: 123456789,
    emissao: '2026-04-01T10:00:00Z',
    devolucao: null,
    valor: 29.9
  })
];

module.exports = { filmes, locacoes };