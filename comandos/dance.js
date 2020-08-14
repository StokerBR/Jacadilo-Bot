module.exports = {
    nome: 'dance',
    descrição: "Envia um gif dancando",
    uso: '``jacadilo dance``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, bot, discord, partyBlob){
        try{
            let embed = new discord.RichEmbed();
                embed.setColor('#D00CD2')
                embed.setImage('https://i.imgur.com/3N1Xbd7.gif');
            mensagem.channel.send(embed).then(mensagemEnviada => mensagemEnviada.react(bot.emojis.get(partyBlob)));
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}