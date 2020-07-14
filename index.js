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
const versão = '1.5.3';
const jacadiloBotID = "681083538107400222";
const canalJacadiloID = "684949321698770956";
const prefixo = 'jacadilo ';
const cooldownChame = new Set();
const cooldownImagem = new Set();
const cooldownCopypaste = new Set();
const statusCante = {cantando: false, canal: 0};

//cargos
const jacadilos10ID = "686553478935347221";
const jacadilos100ID = "686553691985019041";
const jacadilos1000ID = "686553760859684874";
const jacadilos10000ID = "686553832708243487";

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

//funções
    //sair do canal de voz se ficar sozinho nele
    function sozinhoCanalDeVoz (mensagem){
        if(mensagem.guild.voiceConnection){
            canalDeVoz = mensagem.guild.voiceConnection.channel;
            if(canalDeVoz.members.size == 1){
                canalDeVoz.leave();
                mensagem.channel.send("Saí do canal de voz " + "`" + canalDeVoz + "`" + " porque fiquei sozinho nele");
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

        let jacadilos10 = mensagem.guild.roles.get(jacadilos10ID);
        let jacadilos100 = mensagem.guild.roles.get(jacadilos100ID);
        let jacadilos1000 = mensagem.guild.roles.get(jacadilos1000ID);
        let jacadilos10000 = mensagem.guild.roles.get(jacadilos10000ID);

        if(jacadilos >= 10 && jacadilos < 100 && !mensagem.member.roles.has(jacadilos10.id)){
            mensagem.member.addRole(jacadilos10).catch(console.error);
        }
        else if(jacadilos >= 100 && jacadilos < 1000 && !mensagem.member.roles.has(jacadilos100.id)){
            mensagem.member.addRole(jacadilos100).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos10).catch(console.error);
            }, 5000);
        }
        else if(jacadilos >= 1000 && jacadilos < 10000 && !mensagem.member.roles.has(jacadilos1000.id)){
            mensagem.member.addRole(jacadilos1000).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos100).catch(console.error);
            }, 5000);
        }
        else if(jacadilos >= 10000 && !mensagem.member.roles.has(jacadilos10000.id)){
            mensagem.member.addRole(jacadilos10000).catch(console.error);
            setTimeout(() => {
                mensagem.member.removeRole(jacadilos1000).catch(console.error);
            }, 5000);
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
            //contador de jacadilos
            else if(mensagem.author.id!=jacadiloBotID){
                quickdb.add(`canalJacadilo_${mensagem.author.id}`, 1);
                cargoJacadilos(mensagem);

                //jacadilos lendários
                let lendário = Math.floor(Math.random() * 100) + 1;
                if(lendário == 1){
                    quickdb.add(`jacadilosLendários_${mensagem.author.id}`, 1);
                    mensagem.reply(`Uau, um **Jacadilo Lendário**! ${bot.emojis.get(dab)}`).then(mensagemEnviada => mensagemEnviada.delete(10000));
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
                bot.comandos.get('dance').executar(mensagem, gerenciadorErros, bot, partyBlob);
                break;

            case 'info':
                bot.comandos.get('info').executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota, jacadilo);
                break;

            case 'spam':
                spam = bot.comandos.get('spam').executar(mensagem, gerenciadorErros, jacadiloBotID, arg, spam);
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
                bot.comandos.get('análise').executar(mensagem, gerenciadorErros);
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
            
            case 'nego':
                bot.comandos.get('nego ney').executar(mensagem, gerenciadorErros, arg);
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
        }
    }
    catch(err){
        gerenciadorErros(err, mensagem);
    }
});