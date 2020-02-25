module.exports = {
    nome: 'info',
    descrição: "forneçe informação sobre o que for pedido",
    executar(mensagem, arg, versão){
        if(arg[1] == 'versão'){
            mensagem.channel.send('Estou na versão ' + versão);
        }
        else if(arg[1] == 'criador'){
            mensagem.channel.send('Meu criador é o grande <@277157599378669568>');
        }
        else{
            mensagem.channel.send('O quê que você quer saber?');
        }
    }
}