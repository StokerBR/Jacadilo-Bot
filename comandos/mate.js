module.exports = {
    nome: 'mate',
    descrição: 'Envia um gif do Jacadilo matando a pessoa que foi marcada',
    uso: '``jacadilo mate @<pessoa>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, jacadiloBotID, discord, quickdb){
        try{
            let pessoa = mensagem.mentions.users.first();
            let autor = mensagem.author;

            if(mensagem.mentions.everyone){
                mensagem.channel.send('Só posso matar uma pessoa de cada vez');
            }
            else if(!arg[1] && !pessoa){
                mensagem.channel.send('Não dá pra eu matar o vento né');
            }
            else if(autor.id == jacadiloBotID){
                mensagem.channel.send('Só vou matar uma pessoa se você mesmo pedir');
            }
            else if(pessoa){
                if(pessoa.id == jacadiloBotID){
                    mensagem.channel.send('Não!! Eu não vou me matar!');
                }
                else if(pessoa == autor){
                    mensagem.reply('eu gosto de você, não quero te matar');
                }
                else{
                    let apelido = mensagem.channel.guild.member(pessoa).nickname;
                    if(!apelido) apelido = pessoa.username;

                    quickdb.add(`quantidadeMortes_${pessoa.id}`, 1);
                    let mortes = quickdb.fetch(`quantidadeMortes_${pessoa.id}`);

                    let embed = new discord.RichEmbed();
                        embed.setDescription(`${pessoa} foi morto(a) a pedido de ${autor}`);
                        embed.setColor('#D00CD2');
                        embed.setImage('https://i.imgur.com/s4XTNaH.gif');
                        
                        if(mortes == 1){
                            embed.setFooter(`É a primeira vez que ${apelido} é morto(a)`);
                        }
                        else{
                            embed.setFooter(`${apelido} já foi morto(a) ${mortes} vezes`);
                        }

                    mensagem.channel.send(embed);
                }
            }
            else{
                mensagem.channel.send('"' + arg[1] + '" não está no servidor, não é uma pessoa, ou não está marcado corretamente');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}