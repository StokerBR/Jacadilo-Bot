module.exports = {
    nome: 'análise',
    descrição: "envia imagem de análise",
    executar(mensagem, gerenciadorErros){
        try{
            mensagem.channel.send({files: ['./imagens/análise.jpg']});
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}