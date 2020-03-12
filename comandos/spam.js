module.exports = {
    nome: 'spam',
    descrição: 'Envia "jacadilo" periodicamente',
    uso: '``jacadilo spam <argumento>``',
    argumentos: '``ligado``, ``desligado``, ``ligado lento``, ``status``',
    permissãoNecessária: 'Administrador',
    executar(mensagem, gerenciadorErros, arg, jacadiloBotID, spam){
        try{
            if(mensagem.content == '░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░' && mensagem.author.id == "681083538107400222"){
                if(spam == 1){
                    setTimeout(() =>{
                        mensagem.channel.send('░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░');
                    }, 10000);
                }
                else if(spam == 2){
                    var tempo = Math.floor(Math.random() * 24) + 1;
                    setTimeout(() =>{
                        mensagem.channel.send('░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░');
                    }, tempo * 3600000);
                }
            }

            if(arg && arg[1] == 'status'){
                if(spam == 0){
                    mensagem.channel.send('O spam está desligado');
                }
                else if(spam == 1){
                    mensagem.channel.send('O spam está ligado');
                }
                else if(spam == 2){
                    mensagem.channel.send('O spam está ligado no modo lento');
                }
            }

            if(mensagem.author.id == jacadiloBotID){
                mensagem.channel.send('Você realmente acha que vai conseguir burlar o sistema assim?');
            }
            else if(mensagem.member.hasPermission("ADMINISTRATOR") && arg){
                if(arg[1] == 'ligado'){
                    if(arg[2] == 'lento'){
                        spam = 2;
                    }
                    else{
                        spam = 1;
                    }
                    mensagem.channel.send('Ligado');
                    mensagem.channel.send('░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░');
                    return (spam);
                }
                if(arg[1] == 'desligado'){
                    spam = 0;
                    mensagem.channel.send('Desligado');
                    return (spam);
                }
            }
            else if(arg){
                mensagem.channel.send('Você não tem permissão pra ligar/desligar o spam 🔒');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}