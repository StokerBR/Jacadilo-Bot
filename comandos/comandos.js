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
                embed.setTitle('Comandos Jacadilo Bot');
                embed.setThumbnail(mensagem.guild.iconURL);
                embed.addField('O prefixo do bot é: ``' + prefixo + '``', '_ _');
                embed.addField(`**Comandos:**`, listaComandos(bot));
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
                    embed.setTitle(`Comando ${comando.nome}`);
                    embed.setThumbnail(mensagem.guild.iconURL);
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

            function listaComandos (bot){
                let todos = '';
                
                bot.comandos.forEach(comando => {
                      todos += '``' + comando.nome + '``, ';
                });

                todos = todos.slice(0, todos.length - 2);
                
                return todos;
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}