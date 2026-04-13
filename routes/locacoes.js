const express = require('express');
const { Locacao } = require('../models');
const { validateLocacaoPayload } = require('../utils/validation');

/**
 * Roteador responsável por todos os endpoints de locações.
 */
function createLocacoesRouter(locacoes, filmes) {
  const router = express.Router();

  function nextId(collection) {
    return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
  }

  function findFilme(id) {
    return filmes.find((filme) => filme.id === Number(id));
  }

  function findLocacao(id) {
    return locacoes.find((locacao) => locacao.id === Number(id));
  }

  router.get('/', (req, res) => {
    res.json({ data: locacoes, count: locacoes.length });
  });

  router.get('/:id', (req, res) => {
    const locacao = findLocacao(req.params.id);
    if (!locacao) {
      return res.status(404).json({ error: 'Locação não encontrada' });
    }
    res.json({ data: locacao });
  });

  router.post('/', (req, res) => {
    const errors = validateLocacaoPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    if (req.body.filmeId !== undefined && req.body.filmeId !== null && !findFilme(req.body.filmeId)) {
      return res.status(400).json({ error: 'Filme inválido para locação' });
    }

    const novaLocacao = new Locacao({
      id: nextId(locacoes),
      filmeId: req.body.filmeId ?? null,
      clienteId: req.body.clienteId ?? null,
      emissao: req.body.emissao ?? null,
      devolucao: req.body.devolucao ?? null,
      valor: req.body.valor ?? null
    });

    locacoes.push(novaLocacao);
    res.status(201).json({ data: novaLocacao });
  });

  router.put('/:id', (req, res) => {
    const locacao = findLocacao(req.params.id);
    if (!locacao) {
      return res.status(404).json({ error: 'Locação não encontrada' });
    }
    const errors = validateLocacaoPayload({ ...locacao, ...req.body });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    if (req.body.filmeId !== undefined && req.body.filmeId !== null && !findFilme(req.body.filmeId)) {
      return res.status(400).json({ error: 'Filme inválido para locação' });
    }

    locacao.update(req.body);
    res.json({ data: locacao });
  });

  router.delete('/:id', (req, res) => {
    const index = locacoes.findIndex((locacao) => locacao.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Locação não encontrada' });
    }

    const locacaoRemovida = locacoes.splice(index, 1)[0];
    res.json({ data: locacaoRemovida });
  });

  return router;
}

module.exports = createLocacoesRouter;
