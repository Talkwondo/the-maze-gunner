export const code =
`function isSolve (maze, start) {
  // Can be also diagonal
  const moves = [
      [+1, 0],
      [0, -1],
      [-1, 0],
      [0, +1]
    ]
  const _widthLength = maze.length
  const _heightLength = maze[0].length
  // This is the Node creator
  class Node {
    constructor (point, value) {
      this.left = null
      this.right = null
      this.forward = null
      this.backward = null
      this.value = value
      this.point = point
    }
  }
  // This is the Tree creator
  class Tree {
    constructor () {
      this.root = null
    }

    grow (pos, maze, track, currentNode) {
      if (track.length === 1) {
        this.root = startPose
        currentNode = this.root
      }
      const [y, x] = pos.point
      const path = moves.map(([yMove, xMove]) => {
        [y + yMove, x + xMove]}) 
      const filter = path.filter((path) => {
        if (path[0] > _widthLength - 1 || path[0] < 0 
          || path[1] > _heightLength - 1 ||
          path[1] < 0 || maze[path[0]][path[1]] === 1) {
            return false
        }
        return track.findIndex(index => index[0] === path[0] 
          && index[1] === path[1]) === -1
      })
      const nodeArr = filter.map(pos => {
        const node = new Node(pos, maze[pos[0]][pos[1]])
        track.push(pos)
        return node
      })
      // To make the Tree organize by moves
      nodeArr.forEach(position => {
        switch (true) {
          case position.point[0] < pos.point[0]:
            currentNode.backward = position
            this.grow(position, maze, track, 
              currentNode.backward)
            break
          case position.point[0] > pos.point[0]:
            currentNode.forward = position
            this.grow(position, maze, track, 
              currentNode.forward)
            break
          case position.point[1] < pos.point[1]:
            currentNode.left = position
            this.grow(position, maze, track, 
              currentNode.left)
            break
          case position.point[1] > pos.point[1]:
            currentNode.right = position
            this.grow(position, maze, track, 
              currentNode.right)
            break
          default:
        }
      })
    }
    // The Depth First Search over the tree
    dfs (node, arr) {
      if (node.left) {
        this.dfs(node.left, arr)
      }
      if (node.right) {
        this.dfs(node.right, arr)
      }
      if (node.forward) {
        this.dfs(node.forward, arr)
      }
      if (node.backward) {
        this.dfs(node.backward, arr)
      }
      arr.push([node.value, node.point])
      return arr
    }
  }
  // Constants and invocations
  const startPose = new Node([1, 1], maze[1][1])
  const tree = new Tree()
  tree.grow(startPose, maze, [[1, 1]])
  const result = tree.dfs(tree.root, [])
  const index = result.findIndex(arr => arr[0] === 2);
  return (index !== -1) ? true : false
}`
