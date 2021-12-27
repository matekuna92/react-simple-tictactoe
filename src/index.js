import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button
          className="square"
          onClick={() => this.props.onClick()}>
          {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // instead of storing state for each Square, we store the state of Board, which will pass states down to children
  // https://reactjs.org/tutorial/tutorial.html#completing-the-game
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();   // https://reactjs.org/tutorial/tutorial.html#data-change-without-mutation
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
// Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square
// when a square is clicked. Instead, we’ll pass down a function from the Board to the Square, and we’ll have Square call that function
// when a square is clicked

// Now we’re passing down two props from Board to Square: value and onClick
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />; // passing a prop called value
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
