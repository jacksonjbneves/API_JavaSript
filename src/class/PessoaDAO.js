const mysql = require('mysql2');

class PessoaDAO {
    constructor() {
      this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Substitua pela senha do seu MySQL
        database: 'esquemadados',
      });
    }
  
    // Método para listar todas as pessoas
    getAllPessoas(callback) {
      this.connection.query('SELECT * FROM Pessoa', (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      });
    }
  
    // Método para buscar uma pessoa pelo ID
    getPessoaById(id, callback) {
      this.connection.query('SELECT * FROM Pessoa WHERE idPessoa = ?', [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0] || null);
      });
    }
  
    // Método para adicionar uma nova pessoa
    addPessoa(pessoa, callback) {
      const { nome, cpf, idade, profissao } = pessoa;
      this.connection.query(
        'INSERT INTO Pessoa (nome, cpf, idade, profissao) VALUES (?, ?, ?, ?)',
        [nome, cpf, idade, profissao],
        (err, results) => {
          if (err) return callback(err, null);
          callback(null, results.insertId);
        }
      );
    }
  
    // Método para atualizar uma pessoa
    updatePessoa(id, pessoa, callback) {
      const { nome, cpf, idade, profissao } = pessoa;
      this.connection.query(
        'UPDATE Pessoa SET nome = ?, cpf = ?, idade = ?, profissao = ? WHERE idPessoa = ?',
        [nome, cpf, idade, profissao, id],
        (err, results) => {
          if (err) return callback(err, null);
          callback(null, results);
        }
      );
    }
  
    // Método para deletar uma pessoa
    deletePessoa(id, callback) {
      this.connection.query('DELETE FROM Pessoa WHERE idPessoa = ?', [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      });
    }
  }

  module.exports = PessoaDAO;