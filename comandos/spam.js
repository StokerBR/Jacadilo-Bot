module.exports = {
    nome: 'spam',
    descrição: "envia 'jacadilo' periodicamente",
    executar(mensagem, arg, spam){
        if(mensagem.content == '░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░'){
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

        if(mensagem.member.hasPermission("ADMINISTRATOR") && arg != null){
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
        else if(arg != null){
            mensagem.channel.send('Você não tem permissão pra ligar/desligar o spam');
        }
    }
}