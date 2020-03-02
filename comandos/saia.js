module.exports = {
    nome: 'saia',
    descrição: "sai do canal de voz",
    executar(mensagem, gerenciadorErros){
        try{
            if(!mensagem.guild.voiceConnection){
                mensagem.channel.send('Não estou em nenhum canal de voz');
            }
            else{
                mensagem.guild.voiceConnection.disconnect();
                mensagem.channel.send('Saí');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}