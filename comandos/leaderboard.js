module.exports = {
    nome: 'leaderboard',
    descrição: 'Envia o Leaderboard das pessoas que mandaram mais jacadilos no canal jacadilo ou o Leaderboard das pessoas que mais têm Jacadilos Lendários',
    uso: '``jacadilo leaderboard``, ``jacadilo lb``, ``jacadilo leaderboard lendários``, ``jacadilo lb lendários``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, quickdb, bot, discord){
        try{
            let todos = quickdb.all();
            
            todos.sort((a, b) => {
                return b.data - a.data;
            });

            let mensagemFinal = '', i, j = 0, k = 0;

            if(arg[1] == 'lendários' || arg[1] == 'lendarios'){
                for(i = 0; i < todos.length; i++){
                    if(todos[i].ID.split('_')[0] == 'jacadilosLendários'){
                        mensagemFinal += `**${++j}.** ${bot.users.get(todos[i].ID.split('_')[1])}: **${numeroSeparado(todos[i].data)}**\n`;

                        k++;
                        if(k == 10) break;
                    }
                }

                let embed = new discord.RichEmbed ();
                    embed.setColor('#D00CD2');
                    embed.addField('**Leaderboard de Jacadilos Lendários**', mensagemFinal);

                mensagem.channel.send(embed);
            }
            else{
                for(i = 0; i < todos.length; i++){
                    if(todos[i].ID.split('_')[0] == 'canalJacadilo'){
                        mensagemFinal += `**${++j}.** ${bot.users.get(todos[i].ID.split('_')[1])}: **${numeroSeparado(todos[i].data)}**\n`;

                        k++;
                        if(k == 10) break;
                    }
                }

                let embed = new discord.RichEmbed ();
                    embed.setColor('#D00CD2');
                    embed.addField('**Leaderboard de Jacadilos**', mensagemFinal);

                mensagem.channel.send(embed);
            }


            function numeroSeparado(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}