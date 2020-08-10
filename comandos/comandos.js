module.exports = {
    nome: 'comandos',
    descrição: 'Envia a lista de comandos ou descreve um comando específico',
    uso: '``jacadilo comandos``, ``jacadilo comandos <comando>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, mensagemMinusculo, arg, discord, bot, prefixo, versão, hmm){
        try{
            if(!arg[1]){
                let embed = new discord.RichEmbed ();
                embed.setColor('#D00CD2');
                embed.setAuthor('Comandos Jacadilo Bot');
                embed.setThumbnail(mensagem.guild.iconURL);
                embed.addField(`O prefixo do bot é: ${prefixo}`, '_ _');
                embed.addField(`**Comandos:**`, '``análise``, ``aniversário``, ``apague``, ``buzzfeed``, ``cante``, ``calado``, ``chame``, ``comandos``, ``copypaste``, ``dance``, ``entre``, ``furry``, ``imagem``, ``imite``, ``info``, ``jacadilo``, ``leaderboard``, ``oi``, ``quantidade``, ``reinicie``, ``saia``, ``spam``, ``vídeo``');
                embed.addField('_Para mais informações sobre um comando específico envie:_', '_``jacadilo comandos <comando>``_');
                embed.setTimestamp();
                embed.setFooter(`ᒍᗩᑕᗩᗪIᒪO ᗷOT ${versão}`, bot.user.displayAvatarURL);
                
                mensagem.channel.send(embed);
            }
            else{
                let comando = mensagemMinusculo.slice(18, mensagemMinusculo.length);
                if(bot.comandos.has(comando)){
                    comando = bot.comandos.get(comando);
                    let embed = new discord.RichEmbed ();
                    embed.setColor('#D00CD2');
                    embed.setAuthor(`Comando ${comando.nome}`);
                    embed.setThumbnail(mensagem.guild.iconURL);
                    //embed.setDescription(`**>Nome:** ${comando.nome}\n**>Descrição:** ${comando.descrição}\n**>Uso:** ${comando.uso}\n**>Argumentos:** ${comando.argumentos}\n**>Permissão necessária:** ${comando.permissãoNecessária}`);
                    embed.addField('**Nome:**', `${comando.nome}`);
                    embed.addField('**Descrição:**', `${comando.descrição}`);
                    embed.addField('**Uso:**', `${comando.uso}`);
                    embed.addField('**Argumentos:**', `${comando.argumentos}`);
                    embed.addField('**Permissão necessária:**', `${comando.permissãoNecessária}`);
                    embed.setTimestamp();
                    embed.setFooter(`ᒍᗩᑕᗩᗪIᒪO ᗷOT ${versão}`, bot.user.displayAvatarURL);

                    mensagem.channel.send(embed);
                }
                else{
                    mensagem.channel.send(`Não reconheco esse comando ${bot.emojis.get(hmm)}`);
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}