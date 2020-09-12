//requerimentos
const discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cheerio = require('cheerio');
const request = require('request');
const ytSearch = require('yt-search');
const quickdb = require('quick.db');
const schedule = require('node-schedule');
const { exit } = require('process');
require('dotenv').config();

//geral
const bot = new discord.Client();
const token = process.env.TOKEN;
const versão = require('./package.json').version;
const jacadiloBotID = "681083538107400222";
const canalJacadiloID = "684949321698770956";
const prefixo = 'jacadilo ';
const cooldownChame = new Set();
const cooldownImagem = new Set();
const cooldownCopypasta = new Set();
const statusCante = {cantando: false, canal: 0};
const scheduledAnivs = new Set();

//cargos
const cargoJacadilos0_ID = "742893105669341194";
const cargoJacadilos10_ID = "686553478935347221";
const cargoJacadilos100_ID = "686553691985019041";
const cargoJacadilos1k_ID = "686553760859684874";
const cargoJacadilos10k_ID = "686553832708243487";
const cargoJacadilos100k_ID = "742855418874691645";

//emojis
const jacadilo = "658869016269684786";
const stokerAgiota = "660169909296431104";
const sadYeehaw = "658862532085415940";
const hmm = "658827196705800209";
const angryKirby = "658858688701792276";
const laranjo = "658864307324321793";
const thonk = "658856199185235991";
const groovin = "658854525972643881";
const cursed = "658859459711467581";
const kellen = "310502299376156673";
const partyBlob = "660169111048945725";
const dab = "658863094658760715";
const jonas = "310502384680042496";

//funções
const sozinhoCanalDeVoz = require('./funções/sozinhoCanalDeVoz.js').executar; //sair do canal de voz se ficar sozinho nele
const cargoJacadilos = require('./funções/cargoJacadilos.js').executar; //dar cargo de jacadilos
const aniversário = require('./funções/aniversário.js').executar; //scheduleJob para os aniversários

//gerenciador de comandos
bot.comandos = new discord.Collection();
fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js')).forEach(arquivo => {
    let comando = require(`./comandos/${arquivo}`);
 
    bot.comandos.set(comando.nome, comando);
});

//gerenciador de erros
function gerenciadorErros (err, mensagem){
    bot.users.get("277157599378669568").send('Ocorreu um erro no canal ' + mensagem.channel + ' com a mensagem "' + mensagem.content + '"\nERRO: ```' + err + '```');
}

//variáveis globais
var spam = 0;

//login
bot.login(token);

//bot iniciado
bot.on('ready', () => {
    console.log('O bot está online! ' + versão);
    bot.user.setActivity('Interior Crocodile Alligator', {type: 'LISTENING'});

    //console.log(/^#[0-9A-F]{6}$/i.test('#AA33FF'));

    aniversário(bot, quickdb, schedule, scheduledAnivs, jacadiloBotID);
});

//mensagem de boas vindas para novos membros
bot.on('guildMemberAdd', membro => {
    let geral = bot.channels.get('277612251937112064');

    geral.send(`${membro}, bem vindo(a) ao **ᒍᗩᑕᗩᗪIᒪO**`);
})

//mensagens
bot.on('message', mensagem => {
    try{
        //se a mensagem for enviada no chat privado
        if(!mensagem.guild && mensagem.author.id != jacadiloBotID){
            mensagem.channel.send('Quem você acha que é pra ter o direito de me mandar mensagem?');
            return;
        }

        //para minsúsculo
        mensagemMinusculo = mensagem.content.toLowerCase();

        //spam
        if(spam > 0){
            let arg = null;
            bot.comandos.get('spam').executar(mensagem, gerenciadorErros, arg, jacadiloBotID, spam);
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
            //contador de jacadilos
            else if(mensagem.author.id != jacadiloBotID){
                quickdb.add(`canalJacadilo_${mensagem.author.id}`, 1);
                cargoJacadilos(mensagem, quickdb, cargoJacadilos0_ID, cargoJacadilos10_ID, cargoJacadilos100_ID, cargoJacadilos1k_ID, cargoJacadilos10k_ID, cargoJacadilos100k_ID);

                //jacadilos lendários
                let lendário = Math.floor(Math.random() * 100) + 1;
                if(lendário == 1){
                    quickdb.add(`jacadilosLendários_${mensagem.author.id}`, 1);
                    mensagem.reply(`uau, um **Jacadilo Lendário**! ${bot.emojis.get(dab)}`, {files: ['https://i.imgur.com/Bdk4YtR.gif']}).then(mensagemEnviada => mensagemEnviada.delete(10000));
                }
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
            case 'reinicie':
                bot.comandos.get('reinicie').executar(mensagem, gerenciadorErros, bot, token, jacadiloBotID);
                break;

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
                bot.comandos.get('dance').executar(mensagem, gerenciadorErros, bot, discord, partyBlob);
                break;

            case 'info':
                bot.comandos.get('info').executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota, jacadilo);
                break;

            case 'spam':
                spam = bot.comandos.get('spam').executar(mensagem, gerenciadorErros, arg, jacadiloBotID, spam);
                break;

            case 'apague':
                bot.comandos.get('apague').executar(mensagem, gerenciadorErros, arg, jacadiloBotID);
                break;

            case 'chame':
                bot.comandos.get('chame').executar(mensagem, gerenciadorErros, arg, cooldownChame, jacadiloBotID);
                break;

            case 'entre':
                bot.comandos.get('entre').executar(mensagem, gerenciadorErros, sozinhoCanalDeVoz);
                break;

            case 'saia':
                bot.comandos.get('saia').executar(mensagem, gerenciadorErros);
                break;

            case 'cante':
                bot.comandos.get('cante').executar(mensagem, gerenciadorErros, sozinhoCanalDeVoz, ytdl, statusCante);
                break;
            
            case 'imite':
                bot.comandos.get('imite').executar(mensagem, gerenciadorErros, arg, angryKirby, jacadiloBotID);
                break;
            
            case 'análise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros, discord);
                break;
            case 'analise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros, discord);
                break;

            case 'imagem':
                bot.comandos.get('imagem').executar(mensagem, gerenciadorErros, arg, bot, request, cheerio, discord, cooldownImagem, sadYeehaw);
                break;

            case 'vídeo':
                bot.comandos.get('vídeo').executar(mensagem, gerenciadorErros, arg, bot, ytSearch, sadYeehaw);
                break;
            case 'video':
                bot.comandos.get('vídeo').executar(mensagem, gerenciadorErros, arg, bot, ytSearch, sadYeehaw);
                break;

            case 'quantidade':
                bot.comandos.get('quantidade').executar(mensagem, gerenciadorErros, arg, quickdb, bot, canalJacadiloID, jacadiloBotID, jonas, angryKirby, laranjo, thonk, kellen, groovin, cursed);
                break;

            case 'buzzfeed':
                bot.comandos.get('buzzfeed').executar(mensagem, gerenciadorErros, request, cheerio);
                break;
            
            case 'calado':
                bot.comandos.get('calado').executar(mensagem, gerenciadorErros, ytdl, statusCante);
                break;

            case 'copypasta':
                bot.comandos.get('copypasta').executar(mensagem, gerenciadorErros, arg, fs, bot, cooldownCopypasta, laranjo);
                break;
            case 'copypaste':
                mensagem.reply('o comando ``jacadilo copypaste`` agora é ``jacadilo copypasta``');
                break;

            case 'furry':
                bot.comandos.get('furry').executar(mensagem, gerenciadorErros, discord);
                break;

            case 'leaderboard':
                bot.comandos.get('leaderboard').executar(mensagem, gerenciadorErros, arg, quickdb, bot, discord);
                break;
            case 'lb':
                bot.comandos.get('leaderboard').executar(mensagem, gerenciadorErros, arg, quickdb, bot, discord);
                break;

            case 'aniversário':
                bot.comandos.get('aniversário').executar(mensagem, gerenciadorErros, arg, aniversário, schedule, scheduledAnivs, quickdb, bot, discord, jacadiloBotID);
                break;
            case 'aniversario':
                bot.comandos.get('aniversário').executar(mensagem, gerenciadorErros, arg, aniversário, schedule, scheduledAnivs, quickdb, bot, discord, jacadiloBotID);
                break;

            case 'rule34':
                bot.comandos.get('rule34').executar(mensagem, gerenciadorErros, arg, bot, request, cheerio, discord, laranjo, thonk, cursed);
                break;

            case 'mate':
                bot.comandos.get('mate').executar(mensagem, gerenciadorErros, arg, jacadiloBotID, discord, quickdb);
                break;

            default:
                mensagem.channel.send('Não reconheço esse comando ' + bot.emojis.get(thonk) +'\nPara receber uma lista com todos os comandos disponíveis envie ``jacadilo comandos``');
                break;
        }
    }
    catch(err){
        gerenciadorErros(err, mensagem);
    }
});