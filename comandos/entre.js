module.exports = {
    nome: 'entre',
    descrição: "Entra no canal de voz que o usuário está",
    uso: '``jacadilo entre``',
    argumentos: '-',
    permissãoNecessária: '-',
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