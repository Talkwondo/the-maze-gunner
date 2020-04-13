import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  board: state.board,
  startPoint: state.startPoint,
  path: state.path
})

export const Square = props => <div style={{ background: props.bgcolor }} className="square"><span className="digit">{props.digit}</span></div>

const createBoard = props => {
  const maze = props.board
  const [y, x] = props.startPoint
  let rows = 0
  let colKey = 0
  const boardArray = [<tr key={'row' + 10}>{makeCol()}</tr>]

  function makeCol () {
    const obj = {}
    props.path.forEach(element => { obj[element[1]] = 1 })
    const array = []
    let color
    for (let i = 0; i < 9; i++) {
      (maze[rows][i] === 2) ? color = '#1c73da' : color = '#151515'
      if (obj[`${rows},${i}`] && maze[rows][i] !== 2) { color = '#ff3c34' }
      if (y === rows && x === i && maze[rows][i] !== 'M') { color = '#01a79d' }
      array.push(<th key={`col_${colKey}`}><Square bgcolor={color} digit={maze[rows][i]}/></th>)
      colKey++
    }
    return array
  }
  rows++
  while (rows < 9) {
    boardArray.push(<tr key={'row_' + rows}>{
      boardArray.map((...args) => (args[1] === 0) ? makeCol() : false)
    }</tr>)
    rows++
  }
  return (
    <table>
      <tbody>
        {boardArray}
      </tbody>
    </table>
  )
}

export const Board = props => <div>{createBoard(props)}</div>

export default connect(mapStateToProps, null)(Board)
