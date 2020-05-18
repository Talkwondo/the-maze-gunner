import { UPDATE_BOARD, UPDATE_RESULT, SHOW_PATH } from './types/type'

export const updateBoard = (startPoint, randMaze) => {
  return {
    type: UPDATE_BOARD,
    payload: { startPoint, randMaze }
  }
}

export const updateResult = boolean => {
  return {
    type: UPDATE_RESULT,
    payload: boolean
  }
}

export const showPath = arr => {
  return {
    type: SHOW_PATH,
    payload: arr
  }
}
