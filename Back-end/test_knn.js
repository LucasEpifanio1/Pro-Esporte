const TreinoService = require('./src/services/treinoService');

const mockRespostas = {
    empurrar: 12, // Nível 4
    puxar: 3,    // Nível 2
    pernas: 25,  // Nível 6
    abdomen: 8   // Nível 3
};

const classificacao = TreinoService.classificarNivel(mockRespostas);
console.log('--- Teste de Classificação KNN ---');
console.log('Respostas:', mockRespostas);
console.log('Vetor de Níveis:', classificacao.niveis);
console.log('Perfil Sugerido:', classificacao.perfilSugerido.label);
