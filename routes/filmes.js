const express = require('express');
const { Filme } = require('../models');
const { validateFilmePayload } = require('../utils/validation');

/**
 * Roteador responsável por todos os endpoints de filmes.
 */
function createFilmesRouter(filmes) {
  const router = express.Router();

  function nextId(collection) {
    return collection.length ? Math.max(...collection.map((item) => item.id)) + 1 : 1;
  }

  function findFilme(id) {
    return filmes.find((filme) => filme.id === Number(id));
  }

  router.get('/', (req, res) => {
    res.json({ data: filmes, count: filmes.length });
  });

  router.get('/:id', (req, res) => {
    const filme = findFilme(req.params.id);
    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }
    res.json({ data: filme });
  });

  router.post('/', (req, res) => {
    const errors = validateFilmePayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const novoFilme = new Filme({
      id: nextId(filmes),
      estilo: req.body.estilo ?? null,
      nome: req.body.nome,
      ano: req.body.ano,
      duracao: req.body.duracao,
      foto: req.body.foto,
      sinopse: req.body.sinopse ?? null,
      video: req.body.video ?? null
    });

    filmes.push(novoFilme);
    res.status(201).json({ data: novoFilme });
  });

  router.put('/:id', (req, res) => {
    const filme = findFilme(req.params.id);
    if (!filme) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    const errors = validateFilmePayload({ ...filme, ...req.body });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    filme.update(req.body);
    res.json({ data: filme });
  });

  router.delete('/:id', (req, res) => {
    const index = filmes.findIndex((filme) => filme.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Filme não encontrado' });
    }

    const filmeRemovido = filmes.splice(index, 1)[0];
    res.json({ data: filmeRemovido });
  });

  return router;
}

module.exports = createFilmesRouter;
