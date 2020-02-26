module.exports = {
    nome: 'oi',
    descrição: "responde 'eae'",
    executar(mensagem, gerenciadorErros){
        try{
            mensagem.reply('Eae');
            mensagem.react('👋');
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}