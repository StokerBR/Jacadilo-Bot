//requerimentos
const discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');

//constantes
const bot = new discord.Client();
const token = '';
const versão = '0.2.2';
const jacadiloBotID = "681083538107400222";
const canalJacadiloID = "684268211675594753";
const prefixo = 'jacadilo ';
const cooldown = new Set();

//emojis
const jacadilo = "682006794628759567"
const stokerAgiota = "682039067231387669"

//gerenciador de comandos
bot.comandos = new discord.Collection();
const arquivosComandos = fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js'));
for(const arquivo of arquivosComandos){
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
        mensagemMinusculo = mensagem.content.toLowerCase();

        //spam
        if(spam > 0){
            let arg = null;
            bot.comandos.get('spam').executar(mensagem, gerenciadorErros, arg, spam);
        }
        if(mensagem.content == '░J░ ░A░ ░C░ ░A░ ░D░ ░I░ ░L░ ░O░' && spam == 0 && mensagem.author.id == jacadiloBotID){
            mensagem.delete(0);
        }

        //canal apenas jacadilo
        if(mensagem.channel.id == canalJacadiloID){
            if(mensagem.author.id != jacadiloBotID && mensagemMinusculo != 'jacadilo' && mensagemMinusculo != 'jacadilo '){
                mensagem.delete(0);
                mensagem.reply('tá ficando bobo?\nVocê só pode enviar "jacadilo" nesse canal').then(mensagemEnviada => mensagemEnviada.delete(5000));
            }
            return;
        }

        //se a mensagenm for somente "jacadilo"/"jacadilo "
        if(mensagemMinusculo == 'jacadilo' || mensagemMinusculo == 'jacadilo '){
            mensagem.channel.send('Que??');
            return;
        }

        //checar se a mensagem inicia com o prefixo
        if(!mensagemMinusculo.startsWith(prefixo)) return;

        //ler os argumentos
        let arg = mensagemMinusculo.substring(prefixo.length).split(" ");

        //comandos
        switch(arg[0]){      
            case 'jacadilo':
                bot.comandos.get('jacadilo').executar(mensagem, gerenciadorErros, arg, bot, jacadilo);
                break;
           
            case 'oi':
                bot.comandos.get('oi').executar(mensagem, gerenciadorErros);
                break;

            case 'dance':
                bot.comandos.get('dance').executar(mensagem, gerenciadorErros);
                break;

            case 'info':
                bot.comandos.get('info').executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota, jacadilo);
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

            case 'crie':
                bot.comandos.get('crie chamada').executar(mensagem, gerenciadorErros, arg);
                break;

            case 'entre':
                bot.comandos.get('entre').executar(mensagem, gerenciadorErros);
                break;

            case 'saia':
                bot.comandos.get('saia').executar(mensagem, gerenciadorErros);
                break;

            case 'cante':
                bot.comandos.get('cante').executar(mensagem, gerenciadorErros, ytdl);
                break;
            
            case 'imite':
                bot.comandos.get('imite').executar(mensagem, gerenciadorErros, arg);
                break;
            
            case 'análise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros);
                break;
            case 'analise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros);
                break;
        }
    }
    catch(err){
        gerenciadorErros(err, mensagem);
    }
});