module.exports = {
    nome: 'info',
    descrição: "Forneçe informação sobre o que for pedido",
    uso: '``jacadilo info <argumento>``',
    argumentos: '``versão``, ``criador``, ``github``, ``jacadilo``',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota, jacadilo){
        try{
            if(!arg[1]){
                mensagem.channel.send('O quê que você quer saber?');
            }
            if(arg[1] == 'versão' || arg[1] == 'versao'){
                mensagem.channel.send('Estou na versão **' + versão + '**');
            }
            else if(arg[1] == 'criador'){
                mensagem.channel.send('Meu criador é o grandioso <@277157599378669568>').then(mensagemEnviada => mensagemEnviada.react(stokerAgiota));
            }
            else if(arg [1] == 'github'){
                mensagem.channel.send('https://github.com/HenriqueMartinsCosta/Jacadilo-Bot');
            }
            else if(arg[1] == 'jacadilo'){
                mensagem.channel.send('Sim, eu sou o Jacadilo').then(mensagemEnviada => mensagemEnviada.react(jacadilo));
            }
            else{
                mensagem.channel.send('Não sei te informar sobre isso');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}