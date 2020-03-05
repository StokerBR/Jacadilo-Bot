//requerimentos
const discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const ytSearch = require('yt-search');
const quickdb = require('quick.db');

//constantes
const bot = new discord.Client();
const token = '';
const versão = '1.0.1';
const jacadiloBotID = "681083538107400222";
const canalJacadiloID = "684949321698770956";
const prefixo = 'jacadilo ';
const cooldownChame = new Set();

//emojis
const jacadilo = "658869016269684786";
const stokerAgiota = "660169909296431104";
const sadYeehaw = "658862532085415940";
const hmm = "658827196705800209";
const angryKirby = "658858688701792276";
const laranjo = "658864307324321793";
const thonk = "658856199185235991";
const ohYeahWoo = "658854734748319766";
const cursed = "658859459711467581";
const kellen = "310502299376156673";

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
            else if(mensagem.author.id!=jacadiloBotID){
                quickdb.add(`canalJacadilo_${mensagem.author.id}`, 1);
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
            case 'comandos':
                bot.comandos.get('comandos').executar(mensagem, gerenciadorErros, mensagemMinusculo, arg, discord, bot, prefixo, versão, hmm);
                break;

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
                bot.comandos.get('chame').executar(mensagem, gerenciadorErros, arg, cooldownChame);
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
                bot.comandos.get('imite').executar(mensagem, gerenciadorErros, arg, angryKirby);
                break;
            
            case 'análise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros);
                break;
            case 'analise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros);
                break;

            case 'imagem':
                bot.comandos.get('imagem').executar(mensagem, gerenciadorErros, arg, bot, request, cheerio, discord, jacadiloBotID, sadYeehaw);
                break;

            case 'vídeo':
                bot.comandos.get('vídeo').executar(mensagem, gerenciadorErros, arg, bot, ytSearch, sadYeehaw);
                break;
            case 'video':
                bot.comandos.get('vídeo').executar(mensagem, gerenciadorErros, arg, bot, ytSearch, sadYeehaw);
                break;
            
            case 'nego':
                bot.comandos.get('nego ney').executar(mensagem, gerenciadorErros, arg);
                break;

            case 'quantidade':
                bot.comandos.get('quantidade').executar(mensagem, gerenciadorErros, quickdb, bot, canalJacadiloID, angryKirby, laranjo, thonk, kellen, ohYeahWoo, cursed);
                break;
        }
    }
    catch(err){
        gerenciadorErros(err, mensagem);
    }
});