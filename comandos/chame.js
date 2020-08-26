module.exports = {
    nome: 'chame',
    descrição: "Envia uma mensagem direta para a pessoa que foi marcada falando que você está chamando ela. Também envia uma mensagem escrita por você, caso inserida, juntamente com o chamado",
    uso: '``jacadilo chame @<pessoa>``, ``jacadilo chame @<pessoa> <mensagem>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, cooldownChame, jacadiloBotID){
        try{
            let tempoCooldown = 60;
            var fimMensagemChamar = false;
            var pessoa = mensagem.mentions.users.first();
            var autor = mensagem.author;
            var autor_e_pessoa = autor + pessoa;
            if(mensagem.mentions.everyone){
                mensagem.channel.send('Só posso chamar uma pessoa de cada vez');
            }
            else if(!arg[1] && !pessoa){
                mensagem.channel.send('Tá carente?');
            }
            else if(pessoa){
                if(pessoa.id == jacadiloBotID){
                    mensagem.channel.send('Eu já tô aqui');
                }
                else if(cooldownChame.has(autor_e_pessoa)){
                    tempoRestante = tempoCooldown - cooldownChame.autor_e_pessoa;

                    mensagem.channel.send(`Não, kk. (Você já chamou essa pessoa recentemente, tente de novo em ${tempoRestante} seg) ⏲️`);
                }
                else{
                    //apelido
                    let apelido = mensagem.channel.guild.member(autor).nickname;
                    if(apelido){
                        apelido = apelido + " (@" + autor.username + ")";
                    }
                    else{
                        apelido = autor.username;
                    }

                    if(!arg[2] && !arg[3]){
                        pessoa.send("**@" + apelido + "**" + ' tá te chamando');
                    }
                    else{
                        let mensagem = "**@" + apelido + "**" + ' tá te chamando: "';
                        
                        let i = 2;
                        if(!arg[2] && arg[3]) i = 3;

                        for(i; !fimMensagemChamar; i++){
                            if(arg[i]){
                                mensagem = mensagem + arg[i] + ' ';
                            }
                            else{
                                fimMensagemChamar = true;
                            }
                        }
                        mensagem = mensagem.slice(0, -1);
                        pessoa.send(mensagem + '"');
                    }
                    mensagem.channel.send('Chamei').then(mensagemEnviada => mensagemEnviada.react('📢'));
                    
                    //inicia cooldown
                    cooldownChame.add(autor_e_pessoa);
                    cooldownChame.autor_e_pessoa = 0;

                    let timer = setInterval(() => {
                        cooldownChame.autor_e_pessoa += 1;

                        if(cooldownChame.autor_e_pessoa >= tempoCooldown){
                            cooldownChame.delete(autor_e_pessoa);
                            clearInterval(timer);
                        }
                    }, 1000);
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