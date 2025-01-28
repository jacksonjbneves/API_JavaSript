const http = require('http');
const PessoaAPI = require('./class/PessoaAPI');

const api = new PessoaAPI();
const server = http.createServer((req, res) => api.handleRequest(req, res));

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
