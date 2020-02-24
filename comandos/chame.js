module.exports = {
    nome: 'chame',
    descrição: "envia uma mensagem direta para a pessoa que foi marcada e, se inserido, falando que a pessoa que usou o comando está chamando",
    executar(mensagem, arg){
        var fim_mensagem_chamar = false;
        var pessoa = mensagem.mentions.users.first();
        var autor = mensagem.author;
        if(mensagem.mentions.everyone){
            mensagem.channel.send('Só posso chamar uma pessoa de cada vez');
        }
        else if(pessoa){
            if(!arg[2]){
                pessoa.send(autor + ' tá te chamando');
            }
            else{
                let mensagem = autor + ' tá te chamando: "';
                for( let i = 2; !fim_mensagem_chamar; i++){
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
            mensagem.channel.send('Chamei');
        }
        else{
            mensagem.channel.send('"' + arg[1] + '" não está no servidor ou não é uma pessoa');
        }
    }
}