module.exports = {
    nome: 'nego ney',
    descrição: 'Envia a imagem "MORRA, Morra nego ney"',
    uso: '``jacadilo nego ney``',
    argumentos: '-',
    permissãoNecessária: '-',
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