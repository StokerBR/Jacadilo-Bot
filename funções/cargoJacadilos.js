module.exports.executar = (mensagem, quickdb, cargoJacadilos0_ID, cargoJacadilos10_ID, cargoJacadilos100_ID, cargoJacadilos1k_ID, cargoJacadilos10k_ID, cargoJacadilos100k_ID) => {
    let jacadilos = quickdb.fetch(`canalJacadilo_${mensagem.author.id}`);

    let jacadilos0 = mensagem.guild.roles.get(cargoJacadilos0_ID);
    let jacadilos10 = mensagem.guild.roles.get(cargoJacadilos10_ID);
    let jacadilos100 = mensagem.guild.roles.get(cargoJacadilos100_ID);
    let jacadilos1k = mensagem.guild.roles.get(cargoJacadilos1k_ID);
    let jacadilos10k = mensagem.guild.roles.get(cargoJacadilos10k_ID);
    let jacadilos100k = mensagem.guild.roles.get(cargoJacadilos100k_ID);

    if(jacadilos >= 10 && jacadilos < 100 && !mensagem.member.roles.has(jacadilos10.id)){
        mensagem.member.addRole(jacadilos10).catch(console.error);
        setTimeout(() => {
            mensagem.member.removeRole(jacadilos0).catch(console.error);
        }, 5000);
    }
    else if(jacadilos >= 100 && jacadilos < 1000 && !mensagem.member.roles.has(jacadilos100.id)){
        mensagem.member.addRole(jacadilos100).catch(console.error);
        setTimeout(() => {
            mensagem.member.removeRole(jacadilos10).catch(console.error);
        }, 5000);
    }
    else if(jacadilos >= 1000 && jacadilos < 10000 && !mensagem.member.roles.has(jacadilos1k.id)){
        mensagem.member.addRole(jacadilos1k).catch(console.error);
        setTimeout(() => {
            mensagem.member.removeRole(jacadilos100).catch(console.error);
        }, 5000);
    }
    else if(jacadilos >= 10000 && jacadilo < 100000 && !mensagem.member.roles.has(jacadilos10k.id)){
        mensagem.member.addRole(jacadilos10k).catch(console.error);
        setTimeout(() => {
            mensagem.member.removeRole(jacadilos1k).catch(console.error);
        }, 5000);
    }
    else if(jacadilos >= 100000 && !mensagem.member.roles.has(jacadilos100k.id)){
        mensagem.member.addRole(jacadilos100k).catch(console.error);
        setTimeout(() => {
            mensagem.member.removeRole(jacadilos10k).catch(console.error);
        }, 5000);
    }
}