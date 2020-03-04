module.exports = {
    nome: 'imagem',
    descrição: 'envia uma imagem aleatória sobre o termo de pesquisa inserido',
    executar(mensagem, gerenciadorErros, arg, bot, request, cheerio, discord, jacadiloBotID, sadYeehaw){
        try{
            let pessoa = mensagem.mentions.users.first();
            if(!arg[1]){
                let pesquisa = "alligator";
                imagem(pesquisa);
             }
             else if(arg[1] == 'jacadilo'){
                mensagem.channel.send({files: ['./imagens/jaré.jpg']});
             }
            else if(pessoa){
                let embed = new discord.RichEmbed();
                    embed.setColor('#D00CD2');
                    embed.setImage(pessoa.avatarURL);
                mensagem.channel.send(embed);
            }
            else{
                let fimPalavras = false;
                let pesquisa = "";
                for(let i = 1; fimPalavras == false; i++){
                    if(arg[i]){
                        pesquisa = pesquisa + arg[i] + "+";
                    }
                    else{
                        fimPalavras = true;
                    }
                }
                pesquisa = pesquisa.slice(0, -1);
                imagem(pesquisa);
            }

            function imagem(pesquisa){
                var opções = {
                    url: "http://results.dogpile.com/serp?qc=images&q=" + pesquisa,
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                };
    
                request(opções, function(erro, response, responseBody){
                    if (erro) {
                        return;
                    }
                    $ = cheerio.load(responseBody);
                    var links = $(".image a.link");
                    var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                    if(!urls.length){
                        mensagem.channel.send(`Não encontrei nenhuma imagem sobre isso ${bot.emojis.get(sadYeehaw)}`);
                        return;
                    }
                    
                    let embed = new discord.RichEmbed();
                        embed.setColor('#D00CD2')
                        embed.setImage(urls[Math.floor(Math.random() * urls.length)])
                    mensagem.channel.send(embed);
                });
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}