module.exports = {
    nome: 'análise',
    descrição: "Envia a imagem do jacadilo análise",
    uso: '``jacadilo análise``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros){
        try{
            mensagem.channel.send({files: ['./imagens/análise.jpg']});
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}