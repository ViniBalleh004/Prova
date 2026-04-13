# Prova de Programação Avançada

# Vinicius Ballestero Branco 5 sem ADS

## Estrutura da API REST

Este projeto expõe dois recursos principais:

- `Filme`
- `Locacao`

A arquitetura foi separada em módulos para facilitar leitura, manutenção e evolução.

## Arquivos principais

- `index.js` - ponto de entrada do servidor Express
- `models.js` - classes de domínio `Filme` e `Locacao`
- `data.js` - dados de exemplo em memória
- `routes/filmes.js` - endpoints de filme
- `routes/locacoes.js` - endpoints de locação
- `utils/validation.js` - validações de payload

## Modelos de dados

### Filme

- `id` - integer PK not null
- `estilo` - tinyint FK null
- `nome` - varchar(30) not null
- `ano` - integer (4 dígitos) not null
- `duracao` - integer (3 dígitos) not null
- `foto` - varchar(45) not null
- `sinopse` - long varchar null
- `video` - varchar(45) null

### Locacao

- `id` - double PK not null
- `filmeId` - integer FK null
- `clienteId` - numeric(1B) null
- `emissao` - timestamp null
- `devolucao` - timestamp null
- `valor` - decimal(10,2) null

## Como executar

```bash
npm install
npm start
```

A API ficará disponível em `http://localhost:3000`.

## Endpoints

### Filmes

- `GET /api/filmes`
  - Retorna todos os filmes.
- `GET /api/filmes/:id`
  - Retorna um filme pelo `id`.
- `POST /api/filmes`
  - Cria um novo filme.
- `PUT /api/filmes/:id`
  - Atualiza um filme existente.
- `DELETE /api/filmes/:id`
  - Remove um filme.

### Locações

- `GET /api/locacoes`
  - Retorna todas as locações.
- `GET /api/locacoes/:id`
  - Retorna uma locação pelo `id`.
- `POST /api/locacoes`
  - Cria uma nova locação.
- `PUT /api/locacoes/:id`
  - Atualiza uma locação existente.
- `DELETE /api/locacoes/:id`
  - Remove uma locação.

## Requisições detalhadas

### POST /api/filmes

Corpo obrigatório:

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

### POST /api/locacoes

Corpo recomendado:

```json
{
  "filmeId": 1,
  "clienteId": 123456789,
  "emissao": "2026-04-13T10:00:00Z",
  "devolucao": null,
  "valor": 29.90
}
```

## Respostas de erro

- `400 Bad Request` - quando a validação falhar
- `404 Not Found` - quando o recurso não existir

## Exemplo de resposta de lista de filmes

```json
{
  "data": [
    {
      "id": 1,
      "estilo": 1,
      "nome": "Matrix",
      "ano": 1999,
      "duracao": 136,
      "foto": "matrix.jpg",
      "sinopse": "Um hacker descobre que a realidade é uma simulação e se une a rebeldes para lutar contra máquinas.",
      "video": "matrix.mp4"
    }
  ],
  "count": 1
}
```

## Observações

- A API atualmente usa armazenamento em memória para simplificar o exemplo.
- Cada modelo foi documentado com os tipos esperados.
- A validação garante que os campos principais mantenham os limites esperados.
