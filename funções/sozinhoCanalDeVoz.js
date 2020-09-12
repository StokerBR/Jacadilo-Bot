module.exports.executar = () => {
    const sozinhoCanalDeVoz = require('./funções/sozinhoCanalDeVoz.js').executar;
    
    if(mensagem.guild.voiceConnection){
        canalDeVoz = mensagem.guild.voiceConnection.channel;
        if(canalDeVoz.members.size == 1){
            canalDeVoz.leave();
            mensagem.channel.send(`Saí do canal de voz __${canalDeVoz}__ porque fiquei sozinho nele`);
        }
        else{
            setTimeout(() => {
                sozinhoCanalDeVoz(mensagem);
            }, 60000);
        }
    }
}