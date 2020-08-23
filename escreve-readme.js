const fs = require('fs');
const versão = require('./package.json').version;

let conteudo = `# Jacadilo-Bot 🐊\nJacadilo Bot é um bot de Discord feito exclusivamente para o meu servidor. Ele possui comandos úteis e divertidos, e está atualmente na versão _${versão}_ 🤖\n\n> O bot foi feito em JavaScript <img alt="js" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/187_Js_logo_logos-512.png" width="12px"> com <img alt="node.js" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1280px-Node.js_logo_2015.svg.png" width="70px"> e utilizando a biblioteca <img alt="discord.js" src="https://www.pngfind.com/pngs/b/102-1026997_jeffy-discordjs-discord-js-logo-hd-png-download.png" width="75px">.\n> Ele está hospedado em São Paulo em uma instância EC2 da Amazon Web Services <img alt="aws" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png" width="20px">.\n## Comandos 💬\n`
conteudo += '> O prefixo do bot é: `jacadilo `\n\n';

fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js')).forEach(arquivo => {
    let comando = require(`./comandos/${arquivo}`);

    conteudo += '[`' + comando.nome + '`](#' + comando.nome + '), ';
});

conteudo = conteudo.slice(0, conteudo.length - 2);
conteudo += '\n'

fs.readdirSync('./comandos/').filter(arquivo => arquivo.endsWith('.js')).forEach(arquivo => {
    let comando = require(`./comandos/${arquivo}`);

    conteudo += `### ${comando.nome}\n- **Descrição:**\n_${comando.descrição}_\n\n- **Uso:**\n_${comando.uso}_\n\n- **Argumentos:**\n_${comando.argumentos}_\n\n- **Permissão Necessária:**\n_${comando.permissãoNecessária}_\n`;
});

fs.writeFile('README.md', conteudo, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('README.md pronto!');
    }
});