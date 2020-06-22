module.exports = {
    nome: 'cante',
    descrição: 'Toca "interior crocodile alligator"',
    uso: '``jacadilo cante``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, sozinhoCanalDeVoz, ytdl, statusCante){
        try{
            if(!mensagem.member.voiceChannel){
                mensagem.channel.send('Você precisa estar em um canal de voz pra me ouvir cantando');
            }
            else{
                mensagem.member.voiceChannel.join().then(function(connection){
                    var link = "https://youtu.be/T1vlU5d5VNg"
                    var expedidor = connection.playStream(ytdl(link, {filter: "audioonly"}));
                    
                    statusCante.cantando = true;
                    statusCante.canal = mensagem.member.voiceChannel;
                    
                    expedidor.on('end', function(){
                        statusCante.cantando = false;
                    });
                });
                mensagem.channel.send('Vou cantar');
                
                setTimeout(() => {
                    sozinhoCanalDeVoz(mensagem);
                }, 60000);
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}