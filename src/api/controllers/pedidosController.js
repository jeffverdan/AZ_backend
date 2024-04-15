const pedidoRepository = require('../repositories/pedidoRepository');

const buscarPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoRepository.buscarTodosPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
};

const buscarPedidosPorID = async (req, res) => {
  try {
    const pedidos = await pedidoRepository.buscarTodosPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ message: 'Erro ao buscar pedido' });
  }
};

const criarPedido = async (req, res) => {  
  try {
    const novoPedido = await pedidoRepository.criarPedido(req.body);
    res.json(novoPedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
};

const alterarStatusPedido = async (req, res) => {  
  const { pedido_id, status_pedido } = req.body; 

  if(status_pedido !== 'Entregue' && status_pedido !== 'Cancelado' && status_pedido !== 'Em andamento') {
   return res.status(400).json({ message: `Status do pedido não correpende a nenhum dos status existentes, por favor selecione entre: Entregue, Cancelado, ou Em andamento`});
  }
  try {
    const novoPedido = await pedidoRepository.alterarStatusPedidoPorId(pedido_id, status_pedido);
    res.json(novoPedido);
  } catch (error) {
    console.error('Erro ao alterar pedido:', error);
    res.status(500).json({ message: 'Erro ao alterar pedido' });
  }
};

module.exports = {
  buscarPedidos,
  criarPedido,
  buscarPedidosPorID,
  alterarStatusPedido,
};
