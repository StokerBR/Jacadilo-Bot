module.exports = {
    nome: 'cante',
    descrição: "toca 'interior crocodile alligator'",
    executar(mensagem, gerenciadorErros, ytdl){
        try{
            if(!mensagem.member.voiceChannel){
                mensagem.channel.send('Você precisa estar em um canal de voz pra me ouvir cantando');
            }
            else{
                mensagem.member.voiceChannel.join().then(function(connection){
                    var link = "https://youtu.be/I7TUr047h7o"
                    var expedidor = connection.playStream(ytdl(link));
        
                    expedidor.on('end', function(){
                        connection.disconnect();
                    });
                });
                mensagem.channel.send('Vou cantar');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}