import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// https://reactjs.org/tutorial/tutorial.html#function-components
function Square(props) {
    return (
      <button
          className="square"
          onClick={props.onClick}>
          {props.value}
      </button>
    );
}

class Board extends React.Component {
  // instead of storing state for each Square, we store the state of Board, which will pass states down to children
  // https://reactjs.org/tutorial/tutorial.html#completing-the-game
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true
  //   };
  // }

  renderSquare(i) {
// Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square
// when a square is clicked. Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function
// when a square is clicked

// Now we’re passing down two props from Board to Square: value and onClick
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />; // passing a prop called value
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // initial state
  constructor(props) {
      super(props);

      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0
      }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{  // Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0     // xIsNext to true if the number that we’re changing stepNumber to is even
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const pastMoves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;

    if (winner) {
     status = 'Winner: ' + winner;
    }
    else {
     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{pastMoves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//helper function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log([a, b, c]);

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
    return null;
}
