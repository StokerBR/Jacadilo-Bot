module.exports = {
    nome: 'chame',
    descrição: "envia uma mensagem direta para a pessoa que foi marcada falando que a pessoa que usou o comando está chamando e, se inserido, uma mensagem",
    executar(mensagem, gerenciadorErros, arg, cooldown){
        try{
            var fim_mensagem_chamar = false;
            var pessoa = mensagem.mentions.users.first();
            var autor = mensagem.author;
            var autor_e_pessoa = autor + pessoa;
            if(mensagem.mentions.everyone){
                mensagem.channel.send('Só posso chamar uma pessoa de cada vez');
            }
            else if(pessoa){
                if(pessoa.id == '681083538107400222'){
                    mensagem.channel.send('Eu já tô aqui');
                }
                else if(cooldown.has(autor_e_pessoa)){
                    mensagem.channel.send('Não, kk. (Você já chamou essa pessoa recentemente, tente de novo em 30 segundos) ⏲️');
                }
                else{
                    if(!arg[2]){
                        pessoa.send(autor + ' tá te chamando');
                    }
                    else{
                        let mensagem = autor + ' tá te chamando: "';
                        for(let i = 2; !fim_mensagem_chamar; i++){
                            if(arg[i]){
                                mensagem = mensagem + arg[i] + ' ';
                            }
                            else{
                                fim_mensagem_chamar = true;
                            }
                        }
                        mensagem = mensagem.slice(0, -1);
                        pessoa.send(mensagem + '"');
                    }
                    mensagem.channel.send('Chamei').then(e => e.react('📢'));
                    //inicia cooldown
                    cooldown.add(autor_e_pessoa);
                    setTimeout(() => {
                        cooldown.delete(autor_e_pessoa);
                    }, 30000);
                }
            }
            else{
                mensagem.channel.send('"' + arg[1] + '" não está no servidor ou não é uma pessoa');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}