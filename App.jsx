import React, { useState, useEffect } from 'react';

const TransferenciaList = () => {
  const [transferencias, setTransferencias] = useState([]);
  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');
  const [filtroOperador, setFiltroOperador] = useState('');

  useEffect(() => {
    fetchTransferencias();
  }, []);

  const fetchTransferencias = async () => {
    try {
      const response = await fetch('http://localhost:8080/transferencias');
      const data = await response.json();
      setTransferencias(data);
    } catch (error) {
      console.error('Erro ao buscar as transferências:', error);
    }
  };

  const filtrarTransferencias = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/transferencias?inicio=${filtroInicio}&fim=${filtroFim}&operador=${filtroOperador}`
      );
      const data = await response.json();
      setTransferencias(data);
    } catch (error) {
      console.error('Erro ao filtrar as transferências:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Transferências</h2>
      <div>
        <label>
          Data de Início:
          <input
            type="text"
            value={filtroInicio}
            onChange={(e) => setFiltroInicio(e.target.value)}
          />
        </label>
        <label>
          Data de Fim:
          <input
            type="text"
            value={filtroFim}
            onChange={(e) => setFiltroFim(e.target.value)}
          />
        </label>
        <label>
          Nome do Operador:
          <input
            type="text"
            value={filtroOperador}
            onChange={(e) => setFiltroOperador(e.target.value)}
          />
        </label>
        <button onClick={filtrarTransferencias}>Pesquisar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Operador</th>
            <th>ID da Conta</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.map((transferencia) => (
            <tr key={transferencia.id}>
              <td>{transferencia.id}</td>
              <td>{transferencia.dataTransferencia}</td>
              <td>{transferencia.valor}</td>
              <td>{transferencia.tipo}</td>
              <td>{transferencia.nomeOperadorTransacao}</td>
              <td>{transferencia.contaId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransferenciaList;
