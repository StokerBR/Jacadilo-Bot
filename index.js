const discord = require('discord.js');
const ytdl = require('ytdl-core');

const bot = new discord.Client();
const token = ''
const prefixo = 'jacadilo '; const prefixo_maiusculo = 'Jacadilo ';
const cargo_adm = '681306706080301167';

var spam = false;
var fim_mensagem_chamar = false;

bot.login(token);

bot.on('ready', () =>{
    console.log('O bot está online! ' + versão);
    bot.user.setActivity('Interior Crocodile Alligator', {type: 'LISTENING'});
})

bot.on('message', mensagem =>{   
  if(spam){
    var tempo = Math.floor(Math.random() * 10) + 1;
    setTimeout(function(){mensagem.channel.send('░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░');}, 6000);
}

    if(mensagem.content == 'jacadilo' || mensagem.content == 'Jacadilo'){
        mensagem.channel.send('Que??');
        return;
    }

    if(!mensagem.content.startsWith(prefixo)){
        if(!mensagem.content.startsWith(prefixo_maiusculo)){
            return;
        }
    }

    let arg = mensagem.content.substring(prefixo.length).split(" ");

    switch(arg[0]){
        case 'teste':
            mensagem.channel.send('Tá funcionando');
            break;

        case 'info':
            if(arg[1] == 'versão'){
                mensagem.channel.send(versão);
            }
            else{
                mensagem.channel.send('O quê que você quer saber?');
            }
            break;

        case 'spam':
            if(mensagem.member.hasPermission("ADMINISTRATOR")){
                if(arg[1] == 'ligado'){
                    spam = true;
                    mensagem.channel.send('Ligado');
                }
                if(arg[1] == 'desligado'){
                    spam = false;
                    mensagem.channel.send('Desligado');
                }
            }
            else{
                mensagem.channel.send('Você não tem permissão pra ligar/desligar o spam');
            }
            break;

        case 'apague':
            if(mensagem.member.roles.has(cargo_adm)){     
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
                mensagem.channel.send('Você não tem permisssão pra limpar mensagens');
            }
            break;

        case 'chame':
            var pessoa = mensagem.mentions.users.first();
            var autor = mensagem.author;
            if(mensagem.mentions.everyone){
                mensagem.channel.send('Só posso chamar uma pessoa de cada vez');
            }
            else if(pessoa){
                if(!arg[2]){
                    pessoa.send(autor + ' tá te chamando');
                    mensagem.channel.send('Chamei');
                }
                else{
                    var mensagem = autor + ' tá te chamando: "';
                    for( var i = 2; !fim_mensagem_chamar; i++){
                        if(arg[i]){
                            mensagem = mensagem + arg[i] + ' ';
                        }
                        else{
                            fim_mensagem_chamar = true;
                        }
                    }
                    fim_mensagem_chamar = false;
                    mensagem = mensagem.slice(0, -1);
                    pessoa.send(mensagem + '"');
                }
            }
            else{
                mensagem.channel.send('"' + arg[1] + '" não está no servidor ou não é uma pessoa');
            }
            break;
    }  
})
