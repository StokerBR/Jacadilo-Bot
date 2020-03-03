module.exports = {
    nome: 'info',
    descrição: "forneçe informação sobre o que for pedido",
    executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota, jacadilo){
        try{
            if(arg[1] == 'versão'){
                mensagem.channel.send('Estou na versão **' + versão + '**');
            }
            else if(arg[1] == 'criador'){
                mensagem.channel.send('Meu criador é o grandioso <@277157599378669568>').then(mensagemEnviada => mensagemEnviada.react(stokerAgiota));
            }
            else if(arg[1] == 'jacadilo'){
                mensagem.channel.send('Sim, eu sou o Jacadilo').then(mensagemEnviada => mensagemEnviada.react(jacadilo));
            }
            else{
                mensagem.channel.send('O quê que você quer saber?');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}