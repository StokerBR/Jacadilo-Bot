module.exports = {
    nome: 'chame',
    descrição: "envia uma mensagem direta para a pessoa que foi marcada falando que você está chamando ela. Também envia uma mensagem escrita por você, caso inserida, juntamente com o chamado",
    executar(mensagem, gerenciadorErros, arg, cooldownChame){
        try{
            var fimMensagemChamar = false;
            var pessoa = mensagem.mentions.users.first();
            var autor = mensagem.author;
            var autor_e_pessoa = autor + pessoa;
            if(mensagem.mentions.everyone){
                mensagem.channel.send('Só posso chamar uma pessoa de cada vez');
            }
            else if(!arg[1]){
                mensagem.channel.send('Tá carente?');
            }
            else if(pessoa){
                if(pessoa.id == '681083538107400222'){
                    mensagem.channel.send('Eu já tô aqui');
                }
                else if(cooldownChame.has(autor_e_pessoa)){
                    mensagem.channel.send('Não, kk. (Você já chamou essa pessoa recentemente, tente de novo em 30 segundos) ⏲️');
                }
                else{
                    if(!arg[2]){
                        pessoa.send(autor + ' tá te chamando');
                    }
                    else{
                        let mensagem = autor + ' tá te chamando: "';
                        for(let i = 2; !fimMensagemChamar; i++){
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
                    setTimeout(() => {
                        cooldownChame.delete(autor_e_pessoa);
                    }, 30000);
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