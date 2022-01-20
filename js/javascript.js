//make a class for the ships with a method for attacking

function hull(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function power(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function acc(min, max){
    return Math.random() * (max - min) + min;
}

const player = {
        name: 'USS Assembly',
        hull: 20,
        firePower: 5,
        accuracy: .7,

    attack(ship){
        if(Math.random() < player.accuracy){
            aliens.ships[aliens.ships.length-1].hull -= player.firePower;
            alert('A direct hit!')
            alert('The aliens\' hull is at ' + aliens.ships[aliens.ships.length-1].hull + '!')
        } else {
            alert('You\'ve missed the target!')
        }
    }
}

class Alien {
    constructor(){
        this.hull = hull(3, 7);
        this.firePower = power(2, 5);
        this.accuracy = acc(.6, .8);
    }
    attack(ship){
        if(Math.random() < this.accuracy){
            ship.hull -= this.firePower;
            alert('You\'ve been hit! Hit \'em harder next round!')
        } else {
            alert('You avoided the shot! Get ready for the next round')
        }
    }
}

//creat a factory for the alien ships

class Factory {
    constructor(){
        this.ships = []
    }
    generateShip(){
        const alien = new Alien();
        this.ships.push(alien)
    }
}

const aliens = new Factory()

//create the alien ships

aliens.generateShip()


function playerCheck(){
    alert('You\'re hull is at ' + player.hull + ' soldier!')
    if(player.hull <= 0){
        window.confirm('You\'ve been defeated! Better luck next time!')
    }
}

function alienTurn(){
    if(aliens.ships[aliens.ships.length - 1].hull <= 0){
        aliens.ships.pop()
        window.confirm('You\'ve defeated the ship! On to the next!')
    } else {
        window.alert('Watch out! The alien ship is charging up their weapons!')
        aliens.ships[aliens.ships.length - 1].attack(player)
        playerCheck()
    }
}

function endlessAlienTurn(){
    if(aliens.ships[aliens.ships.length - 1].hull <= 0){
        aliens.ships.pop()
        window.confirm('You\'ve defeated the ship! On to the next!')
        aliens.generateShip()
    } else {
        window.alert('Watch out! The alien ship is charging up their weapons!')
        aliens.ships[aliens.ships.length - 1].attack(player)
        playerCheck()
    }
}


/* create a 'loop' that pits an alien ship and the player against each other until one 
is destroyed */

//Intro
window.alert('Hail, Soldier! You\'re in command of the \'USS Assembly\'! A group of Aliens has attacked Earth and it\'s up to you to stop them!')

//Choice of starting the game or leaving immediately
let battleStart = window.prompt("Are you ready, Soldier? (y/n)")

//The main game loop
while(aliens.ships.length > 0){
    //Recurring choice to start the next fight or exit the game
    if(battleStart == "y"){
        var fire = window.prompt("The alien's hull strength is " + aliens.ships[aliens.ships.length - 1].hull + '. They have an accuracy of ' + aliens.ships[aliens.ships.length - 1].accuracy + ' and their firepower is ' + aliens.ships[aliens.ships.length - 1].firePower + '. (fire/retreat)')
    } else if(battleStart == 'n'){
        window.confirm('Good run, Soldier! Come back when you\'re ready for the fight!')
        break
    }

    //player fires their shot
    if(fire == 'fire'){
        player.attack(aliens.ships[aliens.ships.length - 1])
        /*If the player misses or the alien survives, the alien takes it's turn and the loop 
    repeats (see function alienTurn)*/
        alienTurn()
    } else if(fire == 'retreat'){
        window.confirm('Good run, Soldier! Come back when you\'re ready for the fight!')
        break
    }
}


if(aliens.ships.length == 0){
    var gameWin = window.prompt('You\'ve defeated all of the aliens and saved Earth! Now that you\'ve won bring the fight to them and invade the alien planet in endless mode!                      (endless/n)')
}


/* I wasn't able to figure out the dom due to time constraints (finished the night before because I was STRUGGLING and had work the next day) and a not-so-great understanding of how to connect the html and buttons and javascript all together, so I made an endless mode with 
what time was left */


if(gameWin == 'endless'){
    aliens.generateShip()
    let endlessStart = window.prompt("Get ready! We\'re coming out of hyperspace right in front of their home planet! We\'ve upgraded your hull quite a bit so you can take out as many as you can. Are you ready, Soldier? (y/n)")
    player.hull = 100
    while(aliens.ships.length > 0){
        if(endlessStart == "y"){
            var endless = window.prompt("The alien's hull strength is " + aliens.ships[aliens.ships.length - 1].hull + '. They have an accuracy of ' + aliens.ships[aliens.ships.length - 1].accuracy + ' and their firepower is ' + aliens.ships[aliens.ships.length - 1].firePower + '. (fire/retreat)')
        } else if(endlessStart == 'n'){
            window.confirm('Good run, Soldier! Come back when you\'re ready for the fight!')
            break
        }
    
        if(endless == 'fire'){
            player.attack(aliens.ships[aliens.ships.length - 1])
            endlessAlienTurn()
        }else if(endless == 'retreat'){
            window.confirm('Good run, Soldier! Come back when you\'re ready for the fight!')
            break
        }
    }
} else if (gameWin == 'n') {
    window.confirm('Good run, Soldier! Come back when you\'re ready for the fight!')
}