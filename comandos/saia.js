module.exports = {
    nome: 'saia',
    descrição: "sai do canal de voz",
    executar(mensagem, gerenciadorErros, bot, canalDeVozID){
        try{
            if(canalDeVozID == "0"){
                mensagem.channel.send('Não estou em nenhum canal de voz');
            }
            else{
                let canalDeVoz = bot.channels.get(canalDeVozID);
                canalDeVoz.leave();
                return "0";
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}