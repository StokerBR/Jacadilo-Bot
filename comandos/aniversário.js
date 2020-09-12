module.exports = {
    nome: 'aniversário',
    descrição: 'Mostra todos os aniversários dos integrantes do server que foram adicionados ao comando. No dia do aniversário da pessoa (às 00h) manda um "Feliz aniversário" no chat Geral',
    uso: '``jacadilo aniversário``, ``jacadilo aniversário add @<pessoa> <dia> <mês>``, ``jacadilo aniversário apague @<pessoa>``',
    argumentos: '-',
    permissãoNecessária: 'Administrador (para adicionar ou apagar)',
    executar(mensagem, gerenciadorErros, arg, aniversário, schedule, scheduledAnivs, quickdb, bot, discord, jacadiloBotID){
        try{
            var pessoa = mensagem.mentions.users.first();
            var dia, mes, uid;
            if(!arg[1]){
                let todos = quickdb.all();

                let i, j = 0, todosAnivs = [], mensagemFinal = '';
                for(i = 0; i < todos.length; i++){
                    if(todos[i].ID.split('_')[0] == 'aniversário'){
                        todosAnivs[j] = todos[i];
                        j++;
                    }
                }
            
                todosAnivs.sort((a, b) => {
                    return a.data.dia - b.data.dia;
                })
                todosAnivs.sort((a, b) => {
                    return a.data.mes - b.data.mes;
                })

                for(i = 0; i < todosAnivs.length; i++){
                    if(todosAnivs[i].data.dia < 10 && todosAnivs[i].data.mes < 10){
                        mensagemFinal += `${bot.users.get(todosAnivs[i].data.uid)}: **0${todosAnivs[i].data.dia}/0${todosAnivs[i].data.mes}**\n`
                    }
                    else if(todosAnivs[i].data.dia < 10){
                        mensagemFinal += `${bot.users.get(todosAnivs[i].data.uid)}: **0${todosAnivs[i].data.dia}/${todosAnivs[i].data.mes}**\n`
                    }
                    else if(todosAnivs[i].data.mes < 10){
                        mensagemFinal += `${bot.users.get(todosAnivs[i].data.uid)}: **${todosAnivs[i].data.dia}/0${todosAnivs[i].data.mes}**\n`
                    }
                    else{
                        mensagemFinal += `${bot.users.get(todosAnivs[i].data.uid)}: **${todosAnivs[i].data.dia}/${todosAnivs[i].data.mes}**\n`
                    }
                }

                let embed = new discord.RichEmbed ();
                embed.setColor('#D00CD2');
                embed.addField('**Todos os aniversários:**', mensagemFinal);

                mensagem.channel.send(embed);
            }
            else if(arg[1] == 'add'){
                if(mensagem.author.id == jacadiloBotID){
                    mensagem.channel.send('Você realmente acha que vai conseguir burlar o sistema assim?');
                }
                else if(mensagem.member.hasPermission("ADMINISTRATOR")){
                    if(pessoa){
                        uid = pessoa.id;
                    }
                    else{
                        mensagem.channel.send('"' + arg[2] + '" não está no servidor, não é uma pessoa, ou não está marcado corretamente');
                        return;
                    }

                    if(!quickdb.has(`aniversário_${uid}`)){
                        if(arg[3] && !isNaN(arg[3])){
                            let num = parseInt(arg[3]);
    
                            if(num < 1 || num > 31){
                                mensagem.channel.send('O dia especificado não é válido');
                                return;
                            }
                            else{
                                dia = num;
                            }
                        }
                        else{
                            mensagem.channel.send('O dia especificado não é válido');
                            exit();
                        }
                        
                        if(arg[4] && !isNaN(arg[4])){
                            let num = parseInt(arg[4]);
    
                            if(num < 1 || num > 12){
                                mensagem.channel.send('O mês especificado não é válido');
                                return;
                            }
                            else{
                                mes = num;
                            }
                        }
                        else{
                            mensagem.channel.send('O mês especificado não é válido');
                            return;
                        }
    
                        quickdb.set(`aniversário_${uid}.uid`, uid);
                        quickdb.set(`aniversário_${uid}.dia`, dia);
                        quickdb.set(`aniversário_${uid}.mes`, mes);
                        aniversário(bot, quickdb, schedule, scheduledAnivs, jacadiloBotID);
    
                        mensagem.channel.send('Adicionado');
                        return;
                    }
                    else{
                        mensagem.channel.send('Essa pessoa já foi adicionada')
                        return;
                    }
                }
                else{
                    mensagem.channel.send('Você não tem permisssão pra adicionar aniversários 🔒');
                    return;
                }
            }
            else if(arg[1] == 'apague' || arg[1] == 'apagar'){
                if(mensagem.author.id == jacadiloBotID){
                    mensagem.channel.send('Você realmente acha que vai conseguir burlar o sistema assim?');
                    return;
                }
                else if(mensagem.member.hasPermission("ADMINISTRATOR")){
                    if(pessoa && arg[2]){
                        uid = pessoa.id;

                        if(quickdb.delete(`aniversário_${uid}`)){
                            let user = uid;
                            if(scheduledAnivs.has(user)){
                                scheduledAnivs.user.cancel();
                                scheduledAnivs.delete(user);
                            }
                            
                            mensagem.channel.send('Apagado');
                            return;
                        }
                        else{
                            mensagem.channel.send('Essa pessoa não pode ser apagada pois nunca foi adicionada');
                            return;
                        }
                    }
                    else{
                        mensagem.channel.send('"' + arg[4] + '" não está no servidor, não é uma pessoa, ou não está marcado corretamente');
                        return;
                    }
                }
                else{
                    mensagem.channel.send('Você não tem permisssão pra apagar aniversários 🔒');
                    return;
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}