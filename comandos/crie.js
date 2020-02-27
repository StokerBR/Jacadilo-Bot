module.exports = {
    nome: 'crie',
    descrição: "cria um link para chamada de vídeo no canal do servidor",
    executar(mensagem, gerenciadorErros, arg){
        try{
            if(arg[1] == 'chamada'){
                canalDeVozID = mensagem.member.voiceChannelID;
                if(!canalDeVozID){
                    mensagem.channel.send('Você tem que entrar em um canal de voz pra isso');
                }
                else{
                    mensagem.channel.send('https://discordapp.com/channels/' + mensagem.guild.id + '/' + canalDeVozID);
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}