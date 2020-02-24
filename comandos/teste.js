module.exports = {
    nome: 'teste',
    descrição: "diz que está funcionando",
    executar(mensagem, arg){
        mensagem.channel.send('Tá funcionando');
    }
}