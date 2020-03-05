module.exports = {
    nome: 'dance',
    descrição: "Envia um gif dancando",
    uso: '``jacadilo dance``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, bot, partyBlob){
        try{
            mensagem.channel.send({files: ['./gifs/dance.gif']}).then(mensagemEnviada => mensagemEnviada.react(bot.emojis.get(partyBlob)));
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}