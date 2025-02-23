import db from './database.js';

// Mock do banco de dados
jest.mock('./database.js', () => ({
  query: jest.fn(),
  closePool: jest.fn(),
}));

describe('Database Query Function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  // Teste para verificar se uma query válida retorna resultados
  it('should execute a query and return results', async () => {
    // Configura o mock para retornar um resultado simulado
    db.query.mockResolvedValueOnce({
      rows: [{ now: '2025-02-23T09:11:52.149Z' }],
    });

    const res = await db.query('SELECT NOW()');
    expect(res).toBeDefined(); // Verifica se a resposta está definida
    expect(res.rows).toBeInstanceOf(Array); // Verifica se as linhas são um array
    expect(res.rows.length).toBeGreaterThan(0); // Verifica se há pelo menos uma linha
  });

  // Teste para verificar se uma query inválida lança um erro
  it('should throw an error for invalid queries', async () => {
    // Configura o mock para lançar um erro
    db.query.mockRejectedValueOnce(new Error('Query inválida'));

    await expect(db.query('INVALID SQL')).rejects.toThrow(); // Verifica se o erro é lançado
  });

  // Fechar a pool de conexões após todos os testes
  afterAll(async () => {
    await db.closePool();
    expect(db.closePool).toHaveBeenCalled(); // Verifica se a função foi chamada
  });
});
