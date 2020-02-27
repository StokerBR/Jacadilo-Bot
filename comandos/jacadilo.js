module.exports = {
    nome: 'jacadilo',
    descrição: "responde com o emoji jacadilo",
    executar(mensagem, gerenciadorErros, arg, bot, jacadilo){
        try{
            if(arg[1] == 'jacadilo'){
                mensagem.channel.send(`${bot.emojis.get(jacadilo)}`).then(e => e.react(jacadilo));
            }
            else{
                mensagem.channel.send(`${bot.emojis.get(jacadilo)}`);
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}