const express = require('express');
const createFilmesRouter = require('./routes/filmes');
const createLocacoesRouter = require('./routes/locacoes');
const { filmes, locacoes } = require('./data');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * Rotas principais da aplicação.
 */
app.use('/api/filmes', createFilmesRouter(filmes));
app.use('/api/locacoes', createLocacoesRouter(locacoes, filmes));

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`API REST rodando em http://localhost:${port}`);
});
