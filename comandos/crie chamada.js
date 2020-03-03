module.exports = {
    nome: 'crie chamada',
    descrição: "cria uma chamada de vídeo para o canal de voz atual",
    executar(mensagem, gerenciadorErros, arg){
        try{
            if(arg[1] == 'chamada'){
                let canalDeVozID = mensagem.member.voiceChannelID;
                if(!canalDeVozID){
                    mensagem.channel.send('Você tem que estar em um canal de voz pra criar uma chamada nele');
                }
                else{
                    mensagem.channel.send('https://discordapp.com/channels/' + mensagem.guild.id + '/' + canalDeVozID);
                }
            }
            else{
                mensagem.channel.send('Não to afim de criar nada não');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}