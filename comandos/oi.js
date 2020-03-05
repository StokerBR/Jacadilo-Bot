module.exports = {
    nome: 'oi',
    descrição: 'Responde "Eae"',
    uso: '``jacadilo oi``',
    argumentos: '-',
    permissãoNecessária: '-',
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