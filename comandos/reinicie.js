module.exports = {
    nome: 'reinicie',
    descrição: 'Reinicia o bot',
    uso: '``jacadilo reinicie``',
    argumentos: '-',
    permissãoNecessária: 'Administrador',
    executar(mensagem, gerenciadorErros, bot, token, jacadiloBotID){
        try{
            if(mensagem.author.id == jacadiloBotID){
                mensagem.channel.send('Você realmente acha que vai conseguir burlar o sistema assim?');
            }
            else if(mensagem.member.hasPermission("ADMINISTRATOR")){
                mensagem.channel.send('Reiniciando').then(() => bot.destroy()).then(() => bot.login(token));
            }
            else{
                mensagem.channel.send('Você não tem permissão pra reiniciar o bot 🔒');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}