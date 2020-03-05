module.exports = {
    nome: 'quantidade',
    descrição: 'Diz quantas vezes você ou a pessoa que foi marcada já mandou "jacadilo" no canal jacadilo',
    uso: '``jacadilo quantidade``, ``jacadilo quanditade @<pessoa>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, quickdb, bot, canalJacadiloID, angryKirby, laranjo, thonk, kellen, ohYeahWoo, cursed){
        try{
            let marcou = true;
            let pessoa = mensagem.mentions.members.first();
            if(!pessoa){
                pessoa = mensagem.author;
                marcou = false;
            }

            quantidade = quickdb.fetch(`canalJacadilo_${pessoa.id}`);

            if(!marcou){
                if(!quantidade){
                    mensagem.channel.send(`Você ainda não mandou **nenhum** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}?! Vai lá mandar um agora!! ${bot.emojis.get(angryKirby)}`)
                }
                else if(quantidade == 1){
                    mensagem.channel.send(`Você só mandou **1** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}, decepcionante ${bot.emojis.get(laranjo)}`);
                }
                else if(quantidade > 1 && quantidade < 100){
                    mensagem.channel.send(`Você já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, hmm ${bot.emojis.get(thonk)}`);
                }
                else if(quantidade >= 100 && quantidade <1000){
                    mensagem.channel.send(`Uau, você já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)} ${bot.emojis.get(kellen)}`)
                }
                else if(quantidade >= 1000 && quantidade <10000){
                    mensagem.channel.send(`Que?!?! Você já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, isso que dá não ter nada pra fazer ${bot.emojis.get(ohYeahWoo)}`);
                }
                else if(quantidade >= 10000){
                    mensagem.channel.send(`Como assim você já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}???! Você realmente não tem vida ${bot.emojis.get(cursed)}`);
                }
            }
            else{
                if(!quantidade){
                    mensagem.channel.send(`${pessoa} ainda não mandou **nenhum** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}?! Fala pra ele/ela ir lá mandar um agora!! ${bot.emojis.get(angryKirby)}`);
                }
                else if(quantidade == 1){
                    mensagem.channel.send(`${pessoa} só mandou **1** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}, decepcionante ${bot.emojis.get(laranjo)}`);
                }
                else if(quantidade > 1 && quantidade < 100){
                    mensagem.channel.send(`${pessoa} já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, hmm ${bot.emojis.get(thonk)}`);
                }
                else if(quantidade >= 100 && quantidade <1000){
                    mensagem.channel.send(`Uau, ${pessoa} já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)} ${bot.emojis.get(kellen)}`)
                }
                else if(quantidade >= 1000 && quantidade <10000){
                    mensagem.channel.send(`Que?!?! ${pessoa} já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, isso que dá não ter nada pra fazer ${bot.emojis.get(ohYeahWoo)}`);
                }
                else if(quantidade >= 10000){
                    mensagem.channel.send(`Como assim ${pessoa} já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}???! Ele/ela realmente não tem vida ${bot.emojis.get(cursed)}`);
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}