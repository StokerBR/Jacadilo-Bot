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

//constantes
const bot = new discord.Client();
const token = fs.readFileSync('./Token.txt', 'utf8');
const versão = '1.9.2';
const jacadiloBotID = "681083538107400222";
const canalJacadiloID = "684949321698770956";
const prefixo = 'jacadilo ';
const cooldownChame = new Set();
const cooldownImagem = new Set();
const cooldownCopypaste = new Set();
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

//gerenciador de comandos
bot.comandos = new discord.Collection();
fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js')).forEach(arquivo => {
    let comando = require(`./comandos/${arquivo}`);
 
    bot.comandos.set(comando.nome, comando);
})

//gerenciador de erros
function gerenciadorErros (err, mensagem){
    bot.users.get("277157599378669568").send('Ocorreu um erro no canal ' + mensagem.channel + ' com a mensagem "' + mensagem.content + '"\nERRO: ```' + err + '```');
}

//funções
    //sair do canal de voz se ficar sozinho nele
    function sozinhoCanalDeVoz (mensagem){
        if(mensagem.guild.voiceConnection){
            canalDeVoz = mensagem.guild.voiceConnection.channel;
            if(canalDeVoz.members.size == 1){
                canalDeVoz.leave();
                mensagem.channel.send(`Saí do canal de voz __${canalDeVoz}__ porque fiquei sozinho nele`);
            }
            else{
                setTimeout(() => {
                    sozinhoCanalDeVoz(mensagem);
                }, 60000);
            }
        }
    }

    //dar cargo de jacadilos
    function cargoJacadilos (mensagem){
        let jacadilos = quickdb.fetch(`canalJacadilo_${mensagem.author.id}`);

        let jacadilos0 = mensagem.guild.roles.get(cargoJacadilos0_ID);
        let jacadilos10 = mensagem.guild.roles.get(cargoJacadilos10_ID);
        let jacadilos100 = mensagem.guild.roles.get(cargoJacadilos100_ID);
        let jacadilos1k = mensagem.guild.roles.get(cargoJacadilos1k_ID);
        let jacadilos10k = mensagem.guild.roles.get(cargoJacadilos10k_ID);
        let jacadilos100k = mensagem.guild.roles.get(cargoJacadilos100k_ID);

        if(jacadilos >= 10 && jacadilos < 100 && !mensagem.member.roles.has(jacadilos10.id)){
            mensagem.member.addRole(jacadilos10).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos0).catch(console.error);
            }, 5000);
        }
        else if(jacadilos >= 100 && jacadilos < 1000 && !mensagem.member.roles.has(jacadilos100.id)){
            mensagem.member.addRole(jacadilos100).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos10).catch(console.error);
            }, 5000);
        }
        else if(jacadilos >= 1000 && jacadilos < 10000 && !mensagem.member.roles.has(jacadilos1k.id)){
            mensagem.member.addRole(jacadilos1k).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos100).catch(console.error);
            }, 5000);
        }
        else if(jacadilos >= 10000 && jacadilo < 100000 && !mensagem.member.roles.has(jacadilos10k.id)){
            mensagem.member.addRole(jacadilos10k).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos1k).catch(console.error);
            }, 5000);
        }
        else if(jacadilos >= 100000 && !mensagem.member.roles.has(jacadilos100k.id)){
            mensagem.member.addRole(jacadilos100k).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos10k).catch(console.error);
            }, 5000);
        }
    }

    //scheduleJob para os aniversários
    function aniversário (){
        let todos = quickdb.all();

        let i;
        for(i = 0; i < todos.length; i++){
            if(todos[i].ID.split('_')[0] == 'aniversário'){
                let aniv = todos[i];

                dataAtual = new Date();
                let h = 0, m = 0;
                let dataAniv = new Date(dataAtual.getFullYear(), (aniv.data.mes - 1), aniv.data.dia, h, m);
                if(dataAtual.getMonth() > (aniv.data.mes - 1)){
                    dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
                }
                else if(dataAtual.getMonth() == (aniv.data.mes - 1) && dataAtual.getDate() >= aniv.data.dia){
                    dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
                }
                /*
                else if(dataAtual.getDate() == aniv.data.dia && dataAtual.getHours() > h){
                    dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
                }
                else if(dataAtual.getHours() == h && dataAtual.getMinutes() >= m){
                    dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
                }
                */

                let user = aniv.data.uid;
                if(!scheduledAnivs.has(user)){
                    scheduledAnivs.add(user);
                    scheduledAnivs.user = schedule.scheduleJob(dataAniv, function(aniv){
                        let geral = bot.channels.get('277612251937112064');
                        geral.send(`Feliz aniversário ${bot.users.get(aniv.data.uid)}! :tada: :confetti_ball:`, {files: ['https://i.imgur.com/i7ZWen4.gif']});

                        let user = aniv.data.uid;
                        if(scheduledAnivs.has(user)){
                            scheduledAnivs.delete(user);
                        }
                        aniversário();
                    }.bind(null, aniv));
                }
            }
        }
    }

//variáveis globais
var spam = 0;

//login
bot.login(token);

//bot iniciado
bot.on('ready', () =>{
    console.log('O bot está online! ' + versão);
    bot.user.setActivity('Interior Crocodile Alligator', {type: 'LISTENING'});

    aniversário();
})

//mensagens
bot.on('message', mensagem =>{
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
                cargoJacadilos(mensagem);

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
                bot.comandos.get('imite').executar(mensagem, gerenciadorErros, arg, angryKirby);
                break;
            
            case 'análise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros, discord);
                break;
            case 'analise':
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros);
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

            case 'copypaste':
                bot.comandos.get('copypaste').executar(mensagem, gerenciadorErros, fs, bot, cooldownCopypaste, laranjo);
                break;

            case 'furry':
                bot.comandos.get('furry').executar(mensagem, gerenciadorErros, discord);
                break;

            case 'leaderboard':
                bot.comandos.get('leaderboard').executar(mensagem, gerenciadorErros, quickdb, bot, discord);
                break;

            case 'aniversário':
                bot.comandos.get('aniversário').executar(mensagem, gerenciadorErros, arg, aniversário, scheduledAnivs, quickdb, bot, discord, jacadiloBotID);
                break;
            case 'aniversario':
                bot.comandos.get('aniversário').executar(mensagem, gerenciadorErros, arg, aniversário, scheduledAnivs, quickdb, bot, discord, jacadiloBotID);
                break;

            case 'rule34':
                bot.comandos.get('rule34').executar(mensagem, gerenciadorErros, bot, request, cheerio, discord, laranjo, thonk);
                break;
        }
    }
    catch(err){
        gerenciadorErros(err, mensagem);
    }
});