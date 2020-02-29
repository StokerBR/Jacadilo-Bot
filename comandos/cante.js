module.exports = {
    nome: 'cante',
    descrição: "toca 'interior crocodile alligator'",
    executar(mensagem, gerenciadorErros, bot, ytdl, canalDeVozID){
        try{
            canalDeVozID = mensagem.member.voiceChannelID;
            canalDeVoz = bot.channels.get(canalDeVozID);
            if(!canalDeVoz){
                mensagem.channel.send('Você precisa estar em um canal de voz pra me ouvir cantando');
                return "0"
            }
            else{
                canalDeVoz.join().then(function(connection){
                    var link = "https://youtu.be/I7TUr047h7o"
                    var expedidor = connection.playStream(ytdl(link));
        
                    expedidor.on('end', function(){
                        connection.disconnect();
                    });
                });
                return canalDeVozID;
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}