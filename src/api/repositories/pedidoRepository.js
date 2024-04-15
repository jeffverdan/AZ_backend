const pool = require('../../db_connect');

const buscarTodosPedidos = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM pedido');
        return rows
    } catch (error) {
        console.error('Erro ao consultar pedidos', error);
        throw error;
    }
}

const buscarPedidoPorId = async (pedidoId) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE pedido_id = $1', [pedidoId]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao buscar pedido por ID:', error);
        throw error;
    }
};

const criarPedido = async (props) => {
    const { cliente_id, valor_total, forma_pagamento } = props;
    try {
      const result = await pool.query(`
      INSERT INTO pedido (
        cliente_id, valor_total, status_pedido, forma_pagamento
        ) VALUES (
            $1, $2, $3, $4
            ) RETURNING *
      `, [ cliente_id, valor_total, 'Em adamento', forma_pagamento ]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  };

  const alterarStatusPedidoPorId = async (pedido_id, status_pedido) => {    
    try {
        const result = await pool.query('UPDATE pedido SET status_pedido = $1 WHERE pedido_id = $2 RETURNING *', [status_pedido, pedido_id]);
        if (result.rows.length === 0) {
            throw new Error(`Pedido com id ${pedido_id} não encontrado`);
        }
        return (`Pedido com código: ${result.rows[0].codigo_pedido} alterado com sucesso.`);
    } catch (error) {
        console.error('Erro ao alterar status do pedido:', error);
        throw error;
    }
}

module.exports = {
    buscarPedidoPorId,
    buscarTodosPedidos,
    criarPedido,
    alterarStatusPedidoPorId,
};
