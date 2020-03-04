module.exports = {
    nome: 'análise',
    descrição: "envia a imagem do jacadilo análise",
    executar(mensagem, gerenciadorErros){
        try{
            mensagem.channel.send({files: ['./imagens/análise.jpg']});
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}