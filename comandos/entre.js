module.exports = {
    nome: 'entre',
    descrição: "entra no canal de voz que o usuário está",
    executar(mensagem, gerenciadorErros){
        try{
            if(!mensagem.member.voiceChannel){
                mensagem.channel.send('Você tem que entrar em um canal de voz pra isso');
            }
            else{
                mensagem.member.voiceChannel.join().then(connection => {});
                mensagem.channel.send('Entrei');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}