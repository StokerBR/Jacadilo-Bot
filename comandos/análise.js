module.exports = {
    nome: 'análise',
    descrição: "Envia a imagem do jacadilo análise",
    uso: '``jacadilo análise``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, discord){
        try{
            let embed = new discord.RichEmbed();
                embed.setColor('#D00CD2')
                embed.setImage('https://i.imgur.com/bBnSx9x.jpg');
            mensagem.channel.send(embed);
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}