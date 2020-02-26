module.exports = {
    nome: 'info',
    descrição: "forneçe informação sobre o que for pedido",
    executar(mensagem, gerenciadorErros, arg, versão, stokerAgiota){
        try{
            if(arg[1] == 'versão'){
                mensagem.channel.send('Estou na versão **' + versão + '**');
            }
            else if(arg[1] == 'criador'){
                mensagem.channel.send('Meu criador é o grandioso <@277157599378669568>').then(e => e.react(stokerAgiota));
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