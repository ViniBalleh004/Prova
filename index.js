const express = require('express');
const { Filme, Locacao } = require('./models');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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
    cliente: 'João',
    dataLocacao: '2026-04-01',
    dataDevolucao: null,
    status: 'alugada'
  })
];

function nextId(collection) {
  return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
}

function findFilme(id) {
  return filmes.find((filme) => filme.id === Number(id));
}

function findLocacao(id) {
  return locacoes.find((locacao) => locacao.id === Number(id));
}

app.get('/api/filmes', (req, res) => {
  res.json(filmes);
});

app.get('/api/filmes/:id', (req, res) => {
  const filme = findFilme(req.params.id);
  if (!filme) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }
  res.json(filme);
});

app.post('/api/filmes', (req, res) => {
  const { estilo, nome, ano, duracao, foto, sinopse, video } = req.body;
  if (!nome || !ano || !duracao || !foto) {
    return res.status(400).json({ error: 'Nome, ano, duração e foto são obrigatórios' });
  }
  const novoFilme = new Filme({
    id: nextId(filmes),
    estilo: estilo ?? null,
    nome,
    ano,
    duracao,
    foto,
    sinopse: sinopse ?? null,
    video: video ?? null
  });
  filmes.push(novoFilme);
  res.status(201).json(novoFilme);
});

app.put('/api/filmes/:id', (req, res) => {
  const filme = findFilme(req.params.id);
  if (!filme) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }
  filme.update(req.body);
  res.json(filme);
});

app.delete('/api/filmes/:id', (req, res) => {
  const index = filmes.findIndex((filme) => filme.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Filme não encontrado' });
  }
  const filmeRemovido = filmes.splice(index, 1)[0];
  res.json(filmeRemovido);
});

app.get('/api/locacoes', (req, res) => {
  res.json(locacoes);
});

app.get('/api/locacoes/:id', (req, res) => {
  const locacao = findLocacao(req.params.id);
  if (!locacao) {
    return res.status(404).json({ error: 'Locação não encontrada' });
  }
  res.json(locacao);
});

app.post('/api/locacoes', (req, res) => {
  const { filmeId, cliente, dataLocacao, dataDevolucao, status } = req.body;
  const filme = findFilme(filmeId);
  if (!filme) {
    return res.status(400).json({ error: 'Filme inválido para locação' });
  }
  if (!cliente || !dataLocacao || !status) {
    return res.status(400).json({ error: 'Cliente, data de locação e status são obrigatórios' });
  }
  const novaLocacao = new Locacao({
    id: nextId(locacoes),
    filmeId: filme.id,
    cliente,
    dataLocacao,
    dataDevolucao: dataDevolucao ?? null,
    status
  });
  locacoes.push(novaLocacao);
  res.status(201).json(novaLocacao);
});

app.put('/api/locacoes/:id', (req, res) => {
  const locacao = findLocacao(req.params.id);
  if (!locacao) {
    return res.status(404).json({ error: 'Locação não encontrada' });
  }
  if (req.body.filmeId && !findFilme(req.body.filmeId)) {
    return res.status(400).json({ error: 'Filme inválido para locação' });
  }
  locacao.update(req.body);
  res.json(locacao);
});

app.delete('/api/locacoes/:id', (req, res) => {
  const index = locacoes.findIndex((locacao) => locacao.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Locação não encontrada' });
  }
  const locacaoRemovida = locacoes.splice(index, 1)[0];
  res.json(locacaoRemovida);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`API REST rodando em http://localhost:${port}`);
});
