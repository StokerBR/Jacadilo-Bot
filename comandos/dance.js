module.exports = {
    nome: 'dance',
    descrição: "Envia um gif dancando",
    uso: '``jacadilo dance``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros){
        try{
            mensagem.channel.send({files: ['./gifs/dance.gif']});
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}