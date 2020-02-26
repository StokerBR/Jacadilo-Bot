//requerimentos
const discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');

//constantes
const bot = new discord.Client();
const token = '';
const versão = '0.1.4';
const prefixo = 'jacadilo ';
const cooldown = new Set();

//emojis
const jacadilo = "682006794628759567"
const stokerAgiota = "682039067231387669"

//gerenciador de comandos
bot.comandos = new discord.Collection();
const arquivos_comandos = fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js'));
for(const arquivo of arquivos_comandos){
    const comando = require(`./comandos/${arquivo}`);
 
    bot.comandos.set(comando.nome, comando);
}

//gerenciador de erros
function gerenciadorErros (err, mensagem){
    bot.users.get("277157599378669568").send('Ocorreu um erro no canal ' + mensagem.channel + ' com a mensagem "' + mensagem.content + '"');
    bot.users.get("277157599378669568").send('ERRO: ```' + err + '```');
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
    try{
        //para minsúsculo
        mensagem_minusculo = mensagem.content.toLowerCase();

        //spam
        if(spam > 0){
            let arg = null;
            bot.comandos.get('spam').executar(mensagem, gerenciadorErros, arg, spam);
        }
        if(mensagem.content == '░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░' && spam == 0){
            mensagem.delete(0);
        }

        //se a mensagenm for somente "jacadilo"/"Jacadilo"
        if(mensagem_minusculo == 'jacadilo' || mensagem_minusculo == 'jacadilo '){
            mensagem.channel.send('Que??');
            return;
        }

        //checar se a mensagem inicia com o prefixo ou prefixo maiusculo
        if(!mensagem_minusculo.startsWith(prefixo)) return;

        //ler os argumentos
        let arg = mensagem_minusculo.substring(prefixo.length).split(" ");

        //comandos
        switch(arg[0]){      
            case 'jacadilo':
                bot.comandos.get('jacadilo').executar(mensagem, gerenciadorErros, arg, jacadilo);
                break;
           
            case 'oi':
                bot.comandos.get('oi').executar(mensagem, gerenciadorErros);
                break;

            case 'dance':
                bot.comandos.get('dance').executar(mensagem, gerenciadorErros);
                break;

            case 'info':
                bot.comandos.get('info').executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota);
                break;

            case 'spam':
                spam = bot.comandos.get('spam').executar(mensagem, gerenciadorErros, arg, spam);
                break;

            case 'apague':
                bot.comandos.get('apague').executar(mensagem, gerenciadorErros, arg);
                break;

            case 'chame':
                bot.comandos.get('chame').executar(mensagem, gerenciadorErros, arg, cooldown);
                break;
        }
    }
    catch(err){
        gerenciadorErros(err, mensagem);
    }
});