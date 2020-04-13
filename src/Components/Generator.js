import React from 'react'
import Board from '../Components/Board'
import { updateBoard, updateResult, showPath } from '../Actions/Action'
import { Button, Message, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Solver } from '../misc/solve'

const generateMaze = (makeMaze, makeResult, makePath) => {
  // Generate Maze 9X9 with number 0 and 1
  const randMaze = new Array(9).fill(null).map(() => new Array(9).fill(null))
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      randMaze[i][j] = Number(weightedRandom({ 0: 0.6, 1: 0.4 }))
    }
  }
  function weightedRandom (prob) {
    let i; let sum = 0; const r = Math.random()
    for (i in prob) {
      sum += prob[i]
      if (r <= sum) return i
    }
  }
  // Insert exit point to the Maze
  randMaze[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 2

  // Making start point
  function validStartPoint (startPoint) {
    return (randMaze[startPoint[0]][startPoint[1]] === 1 || randMaze[startPoint[0]][startPoint[1]] === 2)
      ? validStartPoint([Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]) : startPoint
  }
  const startPoint = validStartPoint([Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)])
  makeMaze(startPoint, randMaze)
  makeResult(<div></div>)
  makePath([])
}

const SolvingMaze = (props, makeResult, makePath) => {
  if (props.board[0][0] === 'M') { return }
  const solution = Solver(props.board, props.startPoint);
  (solution[1])
    ? makeResult(<div className="column">
      <Message positive>
        <Message.Header>{solution[0]}  <Icon name='thumbs up' /></Message.Header>
      </Message>
      <Message className="textJson">
        <Message.Header>Below is the Tree structure, and for a cool visual presentation, I recommend to copy and past it on <a href="https://vanya.jp.net/vtree/" target="_blank" rel="noopener noreferrer">this</a> website.</Message.Header>
        <span className="json">{solution[3]}</span>
      </Message>
    </div>
    )
    : makeResult(<div className="column"><Message error>
      <Message.Header>There is no exit  <Icon name='dont' /></Message.Header>
    </Message>
    <Message className="textJson">
      <Message.Header className="spaceAside">Below is the Tree structure, and for a cool visual presentation, I recommend to copy and past it on <a href="https://vanya.jp.net/vtree/" target="_blank" rel="noopener noreferrer">this</a> website.</Message.Header>
      <div className="json">{solution[3]}</div>
    </Message>
    </div>)

  makePath(solution[2])
}

const mapDispatchToProps = dispatch => {
  return {
    makeMaze: (startPoint, randMaze) => dispatch(updateBoard(startPoint, randMaze)),
    makeResult: (boolean) => dispatch(updateResult(boolean)),
    makePath: (arr) => dispatch(showPath(arr))
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    startPoint: state.startPoint,
    result: state.result
  }
}

export const Generator = props => {
  const { makeMaze, makeResult, makePath } = props
  return (
    <main>
      <section className="centerElement">
        <Board/>
      </section>
      <section className="centerElement">
        <Button inverted onClick={() => generateMaze(makeMaze, makeResult, makePath)}>Generate Maze</Button>
        <Button primary inverted onClick={() => SolvingMaze(props, makeResult, makePath)}>SolveMaze</Button>
      </section>
      <section className="centerElement">
        {props.result}
      </section>
    </main>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Generator)
