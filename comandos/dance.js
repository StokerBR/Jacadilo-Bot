module.exports = {
    nome: 'dance',
    descrição: "envia um gif dancando",
    executar(mensagem, gerenciadorErros, arg){
        try{
            mensagem.channel.send({files: ['./gifs/dance.gif']});
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}