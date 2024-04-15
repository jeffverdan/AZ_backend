const clienteRepository = require('../repositories/clienteRepository');

const buscarClientes = async (req, res) => {
  try {
    const clientes = await clienteRepository.buscarTodosClientes();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
};

const criarCliente = async (req, res) => {  
  try {
    const novoCliente = await clienteRepository.criarCliente(req.body);
    res.json(`Cliente: ${novoCliente.nome} criado com sucesso.`);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro ao criar cliente' });
  }
};

const desativarCliente = async (req, res) => {
  const { id } = req.body;
  try {
    const novoCliente = await clienteRepository.desativarClientePorId(id);
    res.json(`Cliente: ${novoCliente.nome} desativado com sucesso.`);
  } catch (error) {
    console.error('Erro ao remover cliente:', error);
    res.status(500).json({ message: 'Erro ao desativar cliente' });
  }
};

module.exports = {
  buscarClientes,
  criarCliente,
  desativarCliente
};
