module.exports = {
    nome: 'saia',
    descrição: "Sai do canal de voz",
    uso: '``jacadilo saia``',
    argumentos: '-',
    permissãoNecessária: '-',
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