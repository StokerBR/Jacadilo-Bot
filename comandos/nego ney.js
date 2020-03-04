module.exports = {
    nome: 'nego ney',
    descrição: 'envia a imagem "MORRA, Morra nego ney"',
    executar(mensagem, gerenciadorErros, arg){
        try{
            if(arg[1] == 'ney'){
                mensagem.channel.send({files: ['./imagens/morra.jpg']});
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}