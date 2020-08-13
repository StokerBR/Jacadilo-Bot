module.exports = {
    nome: 'leaderboard',
    descrição: 'Envia o Leaderboard das pessoas que mandaram mais jacadilos no canal jacadilo',
    uso: '``jacadilo leaderboard``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, quickdb, bot, discord){
        try{
            let todos = quickdb.all();
            
            todos.sort((a, b) => {
                return b.data - a.data;
            })

            let mensagemFinal = '', tamanho = 10, i, j = 0;

            if(todos.length < tamanho){
                tamanho = todos.length;
            }

            for(i = 0; i < tamanho; i++){
                if(todos[i].ID.split('_')[0] == 'canalJacadilo'){
                    mensagemFinal += `**${++j}.** ${bot.users.get(todos[i].ID.split('_')[1])}: **${numeroComVirgulas(todos[i].data)}**\n`;
                }
            }

            let embed = new discord.RichEmbed ();
                embed.setColor('#D00CD2');
                embed.addField('**Leaderboard de Jacadilos**', mensagemFinal);

            mensagem.channel.send(embed);


            function numeroComVirgulas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}