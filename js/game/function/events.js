function RandomEvents(){
    player.etvents.time = player.etvents.time.add(n(1).mul(DIFF))

    if(player.etvents.time.gte(1)){
        player.etvents.time = player.etvents.time.sub(1)
    }
}