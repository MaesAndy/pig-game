/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, dice, gamePlaying, dice6;
init();


//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';




//CLICKING THE ROLL DICE BUTTON
document.querySelector('.btn-roll').addEventListener('click', function(){ //anonymous function

    if(gamePlaying){
    //1. RANDOM NUMBER
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    //2 DISPLAY THE RESULT IN THE DICE IMG
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';


    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


    //UPDATE SCORE AND GLOBAL SCORE TO 0 IF PLAYER ROLLS TWO 6's IN A row
/*
    if (dice === 6 && dice6 === true){
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = 0;
      nextPlayer();

    }

    if (dice == 6){
      dice6 = true;
    }

    else{
      dice6 = false;
    }

*/

    //3 update the round score if the rolled number was NOT a 1

    if (dice1 !== 1 && dice2 !==1){
      // ADD SCORE
      sumDices = dice1 + dice2;
      roundScore += sumDices;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else{
      //NEXT PLAYER
      nextPlayer();

    }
  }
} );






// CLICKING THE HOLD button

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying){
  //Add CURRENT SCORE TO GLOBAL score
  scores[activePlayer]+= roundScore;

  // UPDATE THE USER INTERFACE

  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  document.querySelector('#dice-1').style.display = 'none';
  document.querySelector('#dice-2').style.display = 'none';

  var input = document.getElementById('winningScore').value;
  var winningScore;


  // Undefined, 0 , null or "" are coerced to false

  if (input){
    winningScore = input;
  }
  else{
    winningScore = 100;
  }


  // CHECK IF PLAYER WON THE

  if (scores[activePlayer] >= winningScore){
    document.querySelector('#name-' + activePlayer).textContent = "Winner!";
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  }
  else{
    //NEXT PLAYER
    nextPlayer();
  }


}

});

function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
  /*  if(activePlayer === 0){
      activePlayer = 1;
      }
      else{
        activePlayer = 0;
      } */
  dice6 = false;
  roundScore = 0;
  document.getElementById('current-0').textContent= '0';
  document.getElementById('current-1').textContent= '0';

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');



}

//PRESS NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);

function init(){


  dice6 = false;
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // 0 is the first player 1 the second
  document.querySelector('#dice-2').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.getElementById('name-0').textContent = "PLAYER 1";
  document.getElementById('name-1').textContent = "PLAYER 2";
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
}
