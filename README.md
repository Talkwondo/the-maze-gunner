# The-Maze-Gunner

## The inspiration
As I was pursuing a job for a higher web developer position, I had encountered a very challenging question on the board. This question took me several weeks to solve it, and finally I fully understand it. There are very few guides on the web with a reference for an efficient and short solution like I did, thus I published this for more web developers who wants to improve their skills on data structures and algorithms.

## The question on the board
"You need to write a function that gets two arguments: 2D array and a starting point, this function returns a boolean if the maze can be solved or not"

The digits in the 2D array represents the following: 0 is a valid path, 1 is a wall and 2 is the exit.

![The Maze](maze.png)


## The solution approach

1. Create a Node and a Tree classes.

2. Make a recursive function within the Tree that increments the "state" location by valid moves.

3. Filter the locations that exceeds the array and walls.

4. Get array of up to four locations indicates the junctions.

5. For ordered Tree by moves, check the delta of the last state location and make a switch statment.

6. Assign the locations and call recursivly with the current location and Node.

7. Treaverse over the Tree with Depth First Search and add to array the values.

8. Get the results.



# Visit the Site!

[The Maze Gunner](https://talkwondo.github.io/the-maze-gunner/)


Good Luck

