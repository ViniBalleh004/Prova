# Prova

## API REST de exemplo

Executar:

```bash
npm install
npm start
```

A API ficará disponível em `http://localhost:3000`.

### Endpoints para Filmes

- `GET /api/filmes` - lista todos os filmes
- `GET /api/filmes/:id` - busca filme por id
- `POST /api/filmes` - cria um filme
- `PUT /api/filmes/:id` - atualiza um filme
- `DELETE /api/filmes/:id` - remove um filme

### Endpoints para Locações

- `GET /api/locacoes` - lista todas as locações
- `GET /api/locacoes/:id` - busca locação por id
- `POST /api/locacoes` - cria uma locação
- `PUT /api/locacoes/:id` - atualiza uma locação
- `DELETE /api/locacoes/:id` - remove uma locação

### Exemplo de corpo JSON para criar um filme

```json
{
  "estilo": 1,
  "nome": "O Senhor dos Anéis",
  "ano": 2001,
  "duracao": 201,
  "foto": "lotr.jpg",
  "sinopse": "Um hobbit relutante parte em uma jornada para destruir um anel poderoso.",
  "video": "lotr.mp4"
}
```

### Exemplo de corpo JSON para criar uma locação

```json
{
  "filmeId": 1,
  "cliente": "Maria",
  "dataLocacao": "2026-04-13",
  "dataDevolucao": null,
  "status": "alugada"
}
```
