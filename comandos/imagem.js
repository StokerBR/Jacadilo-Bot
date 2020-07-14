module.exports = {
    nome: 'imagem',
    descrição: 'Envia uma imagem aleatória sobre o termo(s) de pesquisa inserido, ou a foto de perfil da pessoa marcada',
    uso: '``jacadilo imagem <termo de pesquisa>``, ``jacadilo imagem @<pessoa>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, bot, request, cheerio, discord, cooldownImagem, sadYeehaw){
        try{
            let tempoCooldown = 10;
            let autor = mensagem.author.id;
            let pessoa = mensagem.mentions.users.first();
            if(cooldownImagem.has(autor)){
                let tempoRestante = tempoCooldown - cooldownImagem.autor;

                mensagem.reply(`calma aí pô. (Você tá buscando imagens rápido demais, tente de novo em ${tempoRestante} seg) ⏲️`);
            }
            else{
                if(!arg[1] && !arg[2]){
                    let pesquisa = "alligator";
                    imagem(pesquisa);
                 }
                 else if(arg[1] == 'jacadilo'){
                    mensagem.channel.send({files: ['./imagens/jaré.jpg']});
                 }
                 else if(arg[1] == 'eneano'){
                    pesquisa = "torbjorn overwatch";
                    imagem(pesquisa);
                 }
                else if(pessoa){
                    let embed = new discord.RichEmbed();
                        embed.setColor('#D00CD2');
                        embed.setImage(pessoa.avatarURL);
                    mensagem.channel.send(embed);
                }
                else{
                    let pesquisa = mensagem.content.slice(16, mensagem.content.length);
                    for(let i = 0; i <= pesquisa.length; i++){
                        if(pesquisa[i] == ' '){
                            pesquisa[i] = '+';
                        }
                    }
                    imagem(pesquisa);
                }
                
                //inicia cooldown
                cooldownImagem.add(autor);
                cooldownImagem.autor = 0;

                let timer = setInterval(() => {
                    cooldownImagem.autor += 1;

                    if(cooldownImagem.autor >= tempoCooldown){
                        cooldownImagem.delete(autor);
                        clearInterval(timer);
                    }
                }, 1000);
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