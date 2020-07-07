module.exports = {
    nome: 'copypaste',
    descrição: 'Envia um copypaste aleatório',
    uso: '``jacadilo copypaste``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, fs, bot, cooldownCopypaste, laranjo){
        try{
            let autor = mensagem.author.id;
            if(cooldownCopypaste.has(autor)){
                mensagem.channel.send("Calma lá amigão, só vou mandar outro copypaste em 5 min ⏲️");
            }
            else{
                let decadencia = "680614291581305008";
                if(mensagem.channel.id != decadencia){
                    mensagem.channel.send(`Só vou mandar copypaste no ${mensagem.guild.channels.get(decadencia)} ${bot.emojis.get(laranjo)}`);
                }
                else{
                    let quantidade = fs.readFileSync('./copypaste/!Quantidade.txt', 'utf8');
                
                    let numero = Math.floor(Math.random() * quantidade) + 1;
                
                    let texto = fs.readFileSync("./copypaste/" + numero + ".txt", 'utf8');
                    texto = texto.replace(/@pessoa/g, "<@" + mensagem.guild.members.randomKey() + ">");
                
                    mensagem.channel.send(texto);
                }
            }
            //inicia cooldown
            cooldownCopypaste.add(autor);
                setTimeout(() => {
                    cooldownCopypaste.delete(autor);
                }, 300000);
            
            /*
            cooldownCopypaste.add(autor);
            cooldownCopypaste.autor = 10;
            console.log(cooldownCopypaste.autor);*/
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}