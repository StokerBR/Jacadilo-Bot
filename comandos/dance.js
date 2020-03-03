module.exports = {
    nome: 'dance',
    descrição: "envia um gif dancando",
    executar(mensagem, gerenciadorErros){
        try{
            mensagem.channel.send({files: ['./gifs/dance.gif']});
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}