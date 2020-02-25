module.exports = {
    nome: 'apague',
    descrição: "apaga a quantidade determinada de mensagens (até 20)",
    executar(mensagem, arg){
        if(mensagem.member.hasPermission("MANAGE_MESSAGES")){
            if(!arg[1]){
                mensagem.channel.send('Como vou saber quantas mensagens é pra apagar se você não me falar?');
                return;
            }
            else if(isNaN(arg[1])){
                mensagem.channel.send('"' + arg[1] + '" não é um número, idiota');
                return;
            }
            else if(+arg[1] == 0){
                mensagem.channel.send('Olha o cara querendo me fazer de idiota');
                return;
            }
            else if(+arg[1] < 0){
                mensagem.channel.send('Ué, tá louco querendo apagar um número negativo de mensagens?');
                return;
            }
            else if(+arg[1] > 20){
                mensagem.channel.send('Por que você quer apagar tantas mensagens? (Só vou limpar 20 mensagens ou menos por vez)');
                return;
            }
            else{
                mensagem.channel.bulkDelete(+arg[1] + 1);
            }
        }
        else{
            mensagem.channel.send('Você não tem permisssão pra apagar mensagens');
        }
    }
}