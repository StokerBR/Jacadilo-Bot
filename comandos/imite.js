module.exports = {
    nome: 'imite',
    descrição: "imita",
    executar(mensagem, gerenciadorErros, arg){
        try{
            if(arg[1] == 'sombra'){
                mensagem.channel.send('¿QUÉ OOOONNDA?');
            }
            else if(arg[1] == 'mudo'){
                mensagem.channel.send('_ _');
            }
            else if(arg[1] == 'isso'){
                mensagem.channel.send(mensagem.content.slice(20, mensagem.content.length));
            }
            else if(arg[1] == 'jacadilo'){
                mensagem.channel.send('Interior crocodile alligator');
                mensagem.channel.send('I drive a chevrolet movie theater');
            }
            else{
                mensagem.channel.send('O que é pra eu imitar?');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}