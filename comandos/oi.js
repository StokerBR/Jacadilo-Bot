module.exports = {
    nome: 'oi',
    descrição: "responde 'eae'",
    executar(mensagem, arg){
        mensagem.reply('Eae');
    }
}