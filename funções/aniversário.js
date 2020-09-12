module.exports.executar = (bot, quickdb, schedule, scheduledAnivs, jacadiloBotID) => {
    const aniversário = require('./aniversário.js').executar;

    let todos = quickdb.all();

    for(let i = 0; i < todos.length; i++){
        if(todos[i].ID.split('_')[0] == 'aniversário'){
            let aniv = todos[i];

            dataAtual = new Date();
            let h = 0, m = 0;
            let dataAniv = new Date(dataAtual.getFullYear(), (aniv.data.mes - 1), aniv.data.dia, h, m);
            if(dataAtual.getMonth() > (aniv.data.mes - 1)){
                dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
            }
            else if(dataAtual.getMonth() == (aniv.data.mes - 1) && dataAtual.getDate() >= aniv.data.dia){
                dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
            }
            /*
            else if(dataAtual.getDate() == aniv.data.dia && dataAtual.getHours() > h){
                dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
            }
            else if(dataAtual.getHours() == h && dataAtual.getMinutes() >= m){
                dataAniv = new Date((dataAtual.getFullYear() + 1), (aniv.data.mes - 1), aniv.data.dia, h, m);
            }
            */

            let user = aniv.data.uid;
            if(!scheduledAnivs.has(user)){
                scheduledAnivs.add(user);
                scheduledAnivs.user = schedule.scheduleJob(dataAniv, function(aniv){
                    let geral = bot.channels.get('277612251937112064');
                    let aniversariante = bot.users.get(aniv.data.uid);

                    if(aniversariante.id == jacadiloBotID){
                        geral.send(`Feliz aniversário pra mim! :tada: :confetti_ball:`, {files: ['https://i.imgur.com/i7ZWen4.gif']});
                    }
                    else{
                        geral.send(`Feliz aniversário ${aniversariante}! :tada: :confetti_ball:`, {files: ['https://i.imgur.com/i7ZWen4.gif']});
                    }

                    let user = aniv.data.uid;
                    if(scheduledAnivs.has(user)){
                        scheduledAnivs.delete(user);
                    }
                    aniversário(bot, quickdb, schedule, scheduledAnivs, jacadiloBotID);
                }.bind(null, aniv));
            }
        }
    }
}