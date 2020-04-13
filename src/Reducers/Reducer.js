import { UPDATE_BOARD, UPDATE_RESULT, SHOW_PATH } from '../Actions/types/type'
import React from 'react'

const intialState = {
  board: new Array(9).fill('M').map(() => new Array(9).fill('M')),
  startPoint: [0, 0],
  result: <div></div>,
  path: []
}

export const setBoardData = (state = intialState, action = {}) => {
  switch (action.type) {
    case UPDATE_BOARD:
      return { ...state, board: action.payload.randMaze, startPoint: action.payload.startPoint }
    case UPDATE_RESULT:
      return { ...state, result: action.payload }
    case SHOW_PATH:
      return { ...state, path: action.payload }
    default:
      return state
  }
}
