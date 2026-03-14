describe('utilityName', () => {
  it('should return expected value', () => {
    // Arrange: crie os dados de entrada e cenario do teste.
    const input = 1;

    // Act: rode a funcao utilitaria em teste.
    const result = input + 1;

    // Assert: confira se o valor retornado esta correto.
    expect(result).toBe(2);
  });
});
