module.exports = {
    nome: 'quantidade',
    descrição: 'Diz quantas vezes você ou a pessoa que foi marcada já mandou "jacadilo" no canal jacadilo. Também informa quantos jacadilos lendários você já conseguiu e sua posição no Leaderboard de Jacadilos',
    uso: '``jacadilo quantidade``, ``jacadilo quanditade @<pessoa>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, quickdb, bot, canalJacadiloID, jacadiloBotID, jonas, angryKirby, laranjo, thonk, kellen, groovin, cursed){
        try{
            let marcou = true;
            let pessoa = mensagem.mentions.members.first();
            if(!pessoa){
                pessoa = mensagem.author;
                marcou = false;
            }

            if(mensagem.mentions.everyone){
                mensagem.channel.send('Só posso falar a quantidade de jacadilos de uma pessoa de cada vez');
                return;
            }
            if(arg[1] == 'jacadilo' || pessoa.id == jacadiloBotID){
                mensagem.channel.send(`Eu já mandei **∞** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)} ${bot.emojis.get(jonas)}`);
                return;
            }
            else if(arg[1] && !marcou){
                mensagem.channel.send('"' + arg[1] + '" não está no servidor, não é uma pessoa, ou não está marcado corretamente');
                return;
            }

            let quantidade = quickdb.fetch(`canalJacadilo_${pessoa.id}`);
            let jacadilosLendários = quickdb.fetch(`jacadilosLendários_${pessoa.id}`);
            if(!jacadilosLendários) jacadilosLendários = 0;
            let mensagemFinal = '';

            if(!marcou){
                if(!quantidade){
                    mensagemFinal = `Você ainda não mandou **nenhum** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}?! Vai lá mandar um agora!! ${bot.emojis.get(angryKirby)}`;
                }
                else if(quantidade == 1){
                    mensagemFinal = `Você só mandou **1** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}, decepcionante ${bot.emojis.get(laranjo)}`;
                }
                else if(quantidade > 1 && quantidade < 100){
                    mensagemFinal = `Você já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, hmm ${bot.emojis.get(thonk)}`;
                }
                else if(quantidade >= 100 && quantidade < 1000){
                    mensagemFinal = `Uau, você já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)} ${bot.emojis.get(kellen)}`;
                }
                else if(quantidade >= 1000 && quantidade < 10000){
                    mensagemFinal = `Que?!?! Você já mandou **${numeroSeparado(quantidade)}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, isso que dá não ter nada pra fazer ${bot.emojis.get(groovin)}`;
                }
                else if(quantidade >= 10000 && quantidade < 100000){
                    mensagemFinal = `Como assim você já mandou **${numeroSeparado(quantidade)}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}???! Você realmente não tem vida ${bot.emojis.get(cursed)}`;
                }
                else if(quantidade >= 100000){
                    mensagemFinal = `Eu nem sei mais o que falar, você já mandou **${numeroSeparado(quantidade)}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, recomendo você buscar ajuda psicológica imediatamente ${bot.emojis.get(cursed)}`;
                }
            }
            else{
                if(!quantidade){
                    mensagemFinal = `${pessoa} ainda não mandou **nenhum** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}?! Fala pra ele/ela ir lá mandar um agora!! ${bot.emojis.get(angryKirby)}`;
                }
                else if(quantidade == 1){
                    mensagemFinal = `${pessoa} só mandou **1** jacadilo no canal ${mensagem.guild.channels.get(canalJacadiloID)}, decepcionante ${bot.emojis.get(laranjo)}`;
                }
                else if(quantidade > 1 && quantidade < 100){
                    mensagemFinal = `${pessoa} já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, hmm ${bot.emojis.get(thonk)}`;
                }
                else if(quantidade >= 100 && quantidade < 1000){
                    mensagemFinal = `Uau, ${pessoa} já mandou **${quantidade}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)} ${bot.emojis.get(kellen)}`;
                }
                else if(quantidade >= 1000 && quantidade < 10000){
                    mensagemFinal = `Que?!?! ${pessoa} já mandou **${numeroSeparado(quantidade)}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, isso que dá não ter nada pra fazer ${bot.emojis.get(groovin)}`;
                }
                else if(quantidade >= 10000 && quantidade < 100000){
                    mensagemFinal = `Como assim ${pessoa} já mandou **${numeroSeparado(quantidade)}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}???! Ele/ela realmente não tem vida ${bot.emojis.get(cursed)}`;
                }
                else if(quantidade >= 100000){
                    mensagemFinal = `Eu nem sei mais o que falar, ${pessoa} já mandou **${numeroSeparado(quantidade)}** jacadilos no canal ${mensagem.guild.channels.get(canalJacadiloID)}, recomendo ele/ela buscar ajuda psicológica imediatamente ${bot.emojis.get(cursed)}`;
                }
            }

            mensagemFinal += `\n\n• _Jacadilos lendários:_ **${jacadilosLendários}**`;
            mensagemFinal += '\n• _Posição no Leaderboard:_ ';

            let rank = fazRank(pessoa);
            if(!rank){
                mensagemFinal += '-';
            }
            else{
                mensagemFinal += `**${rank}º lugar**`;
            }

            mensagem.channel.send(mensagemFinal);


            function numeroSeparado(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }

            function fazRank(pessoa){
                let todos = quickdb.all();
            
                todos.sort((a, b) => {
                    return b.data - a.data;
                });

                let j = 0

                for(let i = 0; i < todos.length; i++){
                    if(todos[i].ID.split('_')[0] == 'canalJacadilo'){
                        
                        j++;
                        
                        if(todos[i].ID.split('_')[1] == pessoa.id) return j;
                    }
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}