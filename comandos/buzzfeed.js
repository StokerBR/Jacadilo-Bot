module.exports = {
    nome: 'buzzfeed',
    descrição: 'Envia um teste do buzzfeed aleatório',
    uso: '``jacadilo buzzfeed``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, request, cheerio){
        try{
            var opções = {
                url: "https://www.buzzfeed.com/br/quizzes",
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };

            request(opções, function(erro, response, responseBody){
                if (erro) {
                    mensagem.channel.send('Ocorreu um erro');
                    return;
                }
                $ = cheerio.load(responseBody);
                var links = $("a.js-card__link");
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                if(!urls.length){
                    mensagem.channel.send(`Ué, não encontrei nenhum teste (?????)`);
                    return;
                }
                
                mensagem.channel.send(urls[Math.floor(Math.random() * urls.length)]);
            });
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}