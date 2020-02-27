module.exports = {
    nome: 'entre',
    descrição: "entra no canal de voz que o usuário está",
    executar(mensagem, gerenciadorErros, bot, canalDeVozID){
        try{
            canalDeVozID = mensagem.member.voiceChannelID;
            let canalDeVoz = bot.channels.get(canalDeVozID);
            if(!canalDeVoz){
                mensagem.channel.send('Você tem que entrar em um canal de voz pra isso');
                return "0";
            }
            else{
                canalDeVoz.join().then(connection => {});
                return canalDeVozID;
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}