module.exports = {
    nome: 'furry',
    descrição: 'Envia uma imagem de um furry aleatório do site _This Fursona Does Not Exist_',
    uso: '``jacadilo furry``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, discord){
        try{
            let n = Math.floor(Math.random() * 100000);
            let num = n.toString();

            switch(num.length){
                case 1:
                    num = '0000' + num;
                    break;
            
                case 2:
                    num = '000' + num;
                    break;

                case 3:
                    num = '00' + num;
                    break;

                case 4:
                    num = '0' + num;
            }

            let link = 'https://thisfursonadoesnotexist.com/v2/jpgs-2x/seed' + num + '.jpg'

            let embed = new discord.RichEmbed();
                        embed.setColor('#D00CD2');
                        embed.setImage(link);
            
            mensagem.channel.send(embed);
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}