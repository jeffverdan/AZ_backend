const pool = require('../../db_connect');

const buscarTodosClientes = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM clientes');        
        return rows
    } catch (error) {
        console.error('Erro ao consultar clientes', error);
        throw error;
    }
  };

const buscarClientePorId = async (clienteId) => {
    try {
        const result = await pool.query('SELECT * FROM clientes WHERE cliente_id = $1', [clienteId]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        throw error;
    }
};

const criarCliente = async (props) => {
    const { nome, telefone, email, endereco, cidade, estado, data_nascimento, genero, profissao, data_cadastro, status_cliente } = props;
    try {
      const result = await pool.query(`
      INSERT INTO clientes (
        nome, telefone, email, endereco, cidade, estado, data_nascimento, genero, profissao, data_cadastro, status_cliente
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            ) RETURNING *
      `, [ nome, telefone, email, endereco, cidade, estado, data_nascimento, genero, profissao, data_cadastro, 'Ativo' ]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  };

  const desativarClientePorId = async (clienteId) => {    
    try {
        const result = await pool.query('UPDATE clientes SET status_cliente = $1 WHERE cliente_id = $2 RETURNING *', ['Inativo', clienteId]);
        if (result.rows.length === 0) {
            throw new Error(`Cliente com id ${clienteId} não encontrado`);
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao desativar cliente por ID:', error);
        throw error;
    }
};

module.exports = {
    buscarClientePorId,
    buscarTodosClientes,
    criarCliente,
    desativarClientePorId
};
