module.exports = {
    nome: 'info',
    descrição: "forneçe informação sobre o que for pedido",
    executar(mensagem, arg){
        if(arg[1] == 'versão'){
            mensagem.channel.send(versão);
        }
        else{
            mensagem.channel.send('O quê que você quer saber?');
        }
    }
}