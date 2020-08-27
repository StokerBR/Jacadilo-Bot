module.exports = {
    nome: 'copypasta',
    descrição: 'Envia uma copypasta aleatória',
    uso: '``jacadilo copypasta``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, fs, bot, cooldownCopypasta, laranjo){
        try{
            let botspam = "589243459764879406";
            if(mensagem.channel.id != botspam){
                mensagem.reply(`só vou mandar copypasta no ${mensagem.guild.channels.get(decadencia)} ${bot.emojis.get(laranjo)}`);
            }
            else{
                let tempoCooldown = 300;
                let autor = mensagem.author.id;
                if(cooldownCopypasta.has(autor)){
                    let tempoRestante = tempoCooldown - cooldownCopypasta.autor;

                    let tempoRestanteMin = Math.trunc(tempoRestante/60);
                    
                    let tempoRestanteSeg = tempoRestante - (tempoRestanteMin * 60);

                    if(tempoRestante >= 60){
                        mensagem.reply(`calma lá amigão, só vou mandar outro copypasta em ${tempoRestanteMin} min e ${tempoRestanteSeg} seg ⏲️`);
                    }
                    else{
                        mensagem.reply(`calma lá amigão, só vou mandar outro copypasta em ${tempoRestante} seg ⏲️`);
                    }
                }
                else{
                    if(arg[1] == 'jacadilo'){
                        mensagem.channel.send(fs.readFileSync('./copypasta/Jacadilo.txt', 'utf8'));
                    }
                    else{
                        let quantidade = fs.readFileSync('./copypasta/!Quantidade.txt', 'utf8');
                        
                        let numero = Math.floor(Math.random() * quantidade) + 1;
                        
                        let texto = fs.readFileSync("./copypasta/" + numero + ".txt", 'utf8');
                        texto = texto.replace(/@pessoa/g, "<@" + mensagem.guild.members.randomKey() + ">");
                        
                        mensagem.channel.send(texto);
                    }

                    //inicia cooldown
                    cooldownCopypasta.add(autor);
                    cooldownCopypasta.autor = 0;

                    let timer = setInterval(() => {
                        cooldownCopypasta.autor += 1;                   
                        
                        if (cooldownCopypasta.autor >= tempoCooldown){
                            cooldownCopypasta.delete(autor);
                            clearInterval(timer);
                        }
                    }, 1000);
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}