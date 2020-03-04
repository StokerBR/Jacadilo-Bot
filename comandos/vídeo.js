module.exports = {
    nome: 'vídeo',
    descrição: "envia um vídeo do youtube aleatório sobre o termo de pesquisa inserido",
    executar(mensagem, gerenciadorErros, arg, bot, ytSearch, sadYeehaw){
        try{
            let pesquisa = mensagem.content.slice(15, mensagem.content.length);
            if(!arg[1]){
                pesquisa = "interior crocodile alligator";
            }
            else if(arg[1] == 'jacadilo'){
                mensagem.channel.send('https://youtube.com/watch?v=DBY6zvSOPo8');
                return;
            }
            ytSearch(pesquisa, function(err, res){
                if(err){
                    mensagem.channel.send(`Não encontrei nenhum vídeo sobre isso ${bot.emojis.get(sadYeehaw)}`);
                    return;
                }
                
                mensagem.channel.send(res.videos[Math.floor(Math.random() * res.videos.length)].url);
            });
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}