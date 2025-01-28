const url = require('url');
const PessoaDAO = require('./PessoaDAO');

// Classe para gerenciar as rotas e as ações da API
class PessoaAPI {
    constructor() {
      this.dao = new PessoaDAO();
    }
  
    handleRequest(req, res) {
      const { pathname, query } = url.parse(req.url, true);
      const id = query.id;
  
      if (pathname === '/pessoas' && req.method === 'GET') {
        // Listar todas as pessoas
        this.dao.getAllPessoas((err, pessoas) => {
          if (err) this.sendError(res, err);
          else this.sendResponse(res, pessoas);
        });
      } else if (pathname === '/pessoa' && req.method === 'GET') {
        // Buscar pessoa por ID
        this.dao.getPessoaById(id, (err, pessoa) => {
          if (err) this.sendError(res, err);
          else this.sendResponse(res, pessoa);
        });
      } else if (pathname === '/pessoa' && req.method === 'POST') {
        // Adicionar nova pessoa
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
          const pessoa = JSON.parse(body);
          this.dao.addPessoa(pessoa, (err, id) => {
            if (err) this.sendError(res, err);
            else this.sendResponse(res, { message: 'Pessoa adicionada', id });
          });
        });
      } else if (pathname === '/pessoa' && req.method === 'PUT') {
        // Atualizar pessoa
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
          const pessoa = JSON.parse(body);
          this.dao.updatePessoa(id, pessoa, (err, results) => {
            if (err) this.sendError(res, err);
            else this.sendResponse(res, { message: 'Pessoa atualizada' });
          });
        });
      } else if (pathname === '/pessoa' && req.method === 'DELETE') {
        // Deletar pessoa
        this.dao.deletePessoa(id, (err, results) => {
          if (err) this.sendError(res, err);
          else this.sendResponse(res, { message: 'Pessoa deletada' });
        });
      } else {
        // Rota não encontrada
        this.sendResponse(res, { message: 'Rota não encontrada' }, 404);
      }
    }
  
    sendResponse(res, data, statusCode = 200) {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }
  
    sendError(res, error, statusCode = 500) {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  }

  module.exports = PessoaAPI;