import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  squares = Array(9).fill(null);
  player = Math.floor(Math.random() * 2)? 'X' : 'O';
  winner = null;
  total_moves = 0;
  cell_size;
  x_wins = 0;
  o_wins = 0;
  isOnePlayer;

  // with one player, I'll always be x, computer will be o

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.isOnePlayer = this.navParams.get('isOnePlayer');

    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i] = i
    }

    if (this.isOnePlayer && this.player == 'O')
      this.AIMove()
  }

  get gameStatusMessage() {
    if (this.total_moves >= 9 && !this.winner) {
      return "Tie game!"
    } else {
      return this.winner? `${this.winner} has won!` : 
      `${this.player}'s turn`;
    }
  }

  handleMove(position) {
    if ((this.isOnePlayer && this.player == 'X') || !this.isOnePlayer) { // If it is not computer's turn
      if(!this.winner && (this.squares[position] != 'X' && this.squares[position] != 'O')) {
        this.squares[position] = this.player;
        this.total_moves += 1
        if(this.winning(this.squares, this.player)) {
          this.winner = this.player;
          if (this.winner == 'X')
            this.x_wins += 1
          else
            this.o_wins += 1
        }
        this.player = this.player === 'X' ? 'O' : 'X';
        if (this.player == 'O' && this.isOnePlayer)
          this.AIMove()
      }
    }
  }

  restartGame() {
    this.squares = Array(9).fill(null);
    this.player = Math.floor(Math.random() * 2)? 'X' : 'O';
    this.winner = null;
    this.total_moves = 0

    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i] = i
    }

    if (this.isOnePlayer && this.player == 'O')
      this.AIMove()
  }

  AIMove() {
    var bestSpot = this.minimax(this.squares, 'O');

    this.squares[bestSpot.index] = this.player;
    this.total_moves += 1
    if(this.winning(this.squares, this.player)) {
      this.winner = this.player;
      this.o_wins += 1
    }
    this.player = 'X'
  }

  minimax(newBoard, player) {
    var huPlayer = "X";
    var aiPlayer = "O";

    //available spots
    var availSpots = this.emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (this.winning(newBoard, huPlayer)) {
      return {score:-10};
    } else if (this.winning(newBoard, aiPlayer)) {
      return {score:10};
    } else if (availSpots.length === 0) {
      return {score:0};
    }

    // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++) {
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {"score":"", "index":""};
      
      move.index = newBoard[availSpots[i]];
  
      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == aiPlayer){
        var result = this.minimax(newBoard, huPlayer);
        move.score = result.score;
      }
      else{
        var result = this.minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++) {
        if(moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
    // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

  // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  // returns the available spots on the board
  emptyIndexies(board) {
    return board.filter(s => s != "O" && s != "X");
  }

  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
  winning(board, player) {
    return ((board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player))
  }

}
