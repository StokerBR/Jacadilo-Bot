module.exports = {
    nome: 'calado',
    descrição: 'Para de cantar',
    uso: '``jacadilo calado``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, ytdl, statusCante){
        try{
            if(!statusCante.cantando){
                mensagem.channel.send('Calado você, eu nem tô cantando');
            }
            else{
                //statusCante.canal.join();
                statusCante.canal.join().then(function(connection){
                    var link = ""
                    connection.playStream(ytdl(link, {filter: "audioonly"}));
                });
                
                mensagem.channel.send('Parei ;-;');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}