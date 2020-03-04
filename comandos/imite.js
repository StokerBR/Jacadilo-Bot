module.exports = {
    nome: 'imite',
    descrição: "imita",
    executar(mensagem, gerenciadorErros, arg){
        try{
            if(arg[1] == 'sombra'){
                mensagem.channel.send('¿QUÉ OOOONNDA?');
            }
            else if(arg[1] == 'maiki' || arg[1] == 'maiki021'){
                mensagem.channel.send('Iae galera, beleza? Como que cês tão seus louco da cabeça?');
            }
            else if(arg[1] == 'mãe' || arg[1] == 'mae'){
                if(arg[2] == 'do'){
                    if(arg[3] == 'edésio' || arg[3] == 'edesio'){
                        mensagem.channel.send('**ISMAEEEEEEEEEEL!!!**');
                    }
                    else if(arg[3] == 'moraes' || arg[3] == 'suassuna'){
                        mensagem.channel.send('Mano');
                    }
                    else if(arg[3] == 'jacadilo'){
                        mensagem.channel.send('O cara acha que pode zoar minha mãe, vsf');
                    }
                    else{
                        mensagem.channel.send('Dele mesmo');
                    }
                }
                else{
                    mensagem.channel.send('É pra imitar a mãe de quem? Se for a sua eu vou causar um estrago');
                }
            }
            else if(arg[1] == 'mudo'){
                mensagem.channel.send('_ _');
            }
            else if(arg[1] == 'isso'){
                mensagem.channel.send(mensagem.content.slice(20, mensagem.content.length));
            }
            else if(arg[1] == 'jacadilo'){
                mensagem.channel.send('Interior crocodile alligator');
                mensagem.channel.send('I drive a chevrolet movie theater');
            }
            else{
                mensagem.channel.send('O que é pra eu imitar?');
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}