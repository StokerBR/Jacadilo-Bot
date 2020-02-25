//requerimentos
const discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');

//constantes
const bot = new discord.Client();
const token = '';
const versão = '0.1.3';
const prefixo = 'jacadilo ';
const prefixo_maiusculo = 'Jacadilo ';
const cooldown = new Set();

//gerenciador de comandos
bot.comandos = new discord.Collection();
const arquivos_comandos = fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js'));
for(const arquivo of arquivos_comandos){
    const comando = require(`./comandos/${arquivo}`);
 
    bot.comandos.set(comando.nome, comando);
}

//variáveis globais
var spam = 0;

//login
bot.login(token);

//bot iniciado
bot.on('ready', () =>{
    console.log('O bot está online! ' + versão);
    bot.user.setActivity('Interior Crocodile Alligator', {type: 'LISTENING'});
})

//mensagens
bot.on('message', mensagem =>{   
    //spam
    if(spam > 0){
        let arg = null;
        bot.comandos.get('spam').executar(mensagem, arg, spam);
      }
    if(mensagem.content == '░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░' && spam == 0){
        mensagem.delete(0);
    }

    //se a mensagenm for somente "jacadilo"/"Jacadilo"
    if(mensagem.content == 'jacadilo' || mensagem.content == 'Jacadilo'){
        mensagem.channel.send('Que??');
        return;
    }

    //checar se a mensagem inicia com o prefixo ou prefixo maiusculo
    if(!mensagem.content.startsWith(prefixo) && !mensagem.content.startsWith(prefixo_maiusculo)) return;

    //ler os argumentos
    let arg = mensagem.content.substring(prefixo.length).split(" ");

    //comandos
    switch(arg[0]){
        case 'oi':
            bot.comandos.get('oi').executar(mensagem, arg);
            break;

        case 'info':
            bot.comandos.get('info').executar(mensagem, arg, versão);
            break;

        case 'spam':
            spam = bot.comandos.get('spam').executar(mensagem, arg, spam);
            break;

        case 'apague':
            bot.comandos.get('apague').executar(mensagem, arg);
            break;

        case 'chame':
            bot.comandos.get('chame').executar(mensagem, arg, cooldown);
            break;
    }
});