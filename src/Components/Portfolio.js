import React from 'react'
import { Animation } from './Animation'
import Menu from './Menu'
import '../css/Portfolio.css'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { code } from '../misc/code.js'
import Generator from '../Components/Generator.js'
import { Grid, Segment } from 'semantic-ui-react'
import gif from '../gif/maze.gif'

const Portfolio = () => {
  return (
    <main className="container">
      <nav>
        <Menu/>
        <Animation />
      </nav>
      <section>
        <header className="mazeTitle">
          <h1>The Maze Gunner</h1>
        </header>
        <article className="semi-container">
          <div className="introduction">
            <p>As I was pursuing a job for a higher web developer position,
                I had never thought I'd encounter such a challenging question on the board during an interview. For an intermediate web developer like me,
              it almost made me use my <a href="http://www.imfdb.org/wiki/CAA_Tactical_RONI" target="_blank" rel="noopener noreferrer">Roni Carbine Gun</a>.</p>
            <p style={{ textAlign: 'center' }}>My demos here will use <a href="https://en.wikipedia.org/wiki/Recursion_(computer_science)" target="_blank" alt="Recursive Algorithm" rel="noopener noreferrer">Recursive Algorithm</a> to solve games in pure <kbd>JavaScript</kbd>.</p>
          </div>
        </article>
        <section className="row">
          <aside className="leftText">
            <h2>The question on the board:</h2>
            <p>"You need to write a function that gets two arguments: 2D array and a starting point, this function returns a boolean if the maze can be solved or not"</p>
            <p><kbd>The digits in the 2D array represents the following: 0 is a valid path, 1 is a wall and 2 is the exit.</kbd></p>
            <p>I tried to solve it using iterations, but encountered a loop problem. Later on, I had been told that the solution should be solved in <span className="strong">DFS</span>, and then I thought, what the hell does that mean?</p>
            <p>I found that the best algorithm to solve a maze is the Trémaux's Algorithm, and it actually uses DFS (<a href="https://en.wikipedia.org/wiki/Depth-first_search" target="_blank" alt="DFS Algorithm" rel="noopener noreferrer">Depth First Search</a>) over a Tree.</p>
          </aside>
          <aside className="rightGif">
            <img src={gif} className="gif" alt="maze exercise"/>
          </aside>
        </section>
        <section className="row">
          <aside className="solution">
            <h2 style={{ textAlign: 'left', marginLeft: '10px' }}>The solution approach:</h2>
            <div className="codeFont">
              <p>When solving a complex maze there must be more than two directions, but most likely even three to four, thus we can not build a Binray Tree, instead we need to build a <a href="https://en.wikipedia.org/wiki/Tree_(graph_theory)" target="_blank" rel="noopener noreferrer">Graph Tree</a>.<br />
                There is a much shorter solution, if we just want to match a value of 2 in our search, it can be done
                without making a Tree or DFS, but if we want to present all the possible moves, the following approach is better.</p>
              <p>Below is the milestones of the solution:</p>
              <p>1. Create a Node and a Tree classes.</p>
              <p>2. Make a recursive function within the Tree that increments the "state" location by valid moves.</p>
              <p>3. Filter the locations that exceeds the array and walls.</p>
              <p>4. Get array of up to four locations indicates the junctions.</p>
              <p>5. For ordered Tree by moves, check the delta of the last state location and make a switch statment.</p>
              <p>6. Assign the locations and call recursivly with the current location and Node.</p>
              <p>7. Treaverse over the Tree with Depth First Search and add to array the values.</p>
              <p>8. Get the results.</p>
            </div>
            <div className="trySection">
              <h2>Try it yourself</h2>
              <p>Below you can generate a random board and check if there is an exit. Moreover, you can see the path of the DFS highilighted.
                <br/>I have also added recently an option to find the shortest way to the exit.</p>
              <Generator/>
            </div>
          </aside>
          <aside className="code">
            <SyntaxHighlighter customStyle={true} language="javascript" style={vs2015}>
              {code}
            </SyntaxHighlighter>
          </aside>
        </section>
      </section>
      <footer>
        <Grid columns='equal' inverted>
          <Grid.Column>
            <Segment>© Tal Talmon 2020</Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>My entire portfolio was built by me, including the scroll photos, which illustrates my creativity and skills of web development and graphic design<br/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment><img src={require('../photos/roni.jpg')} alt='roni gun' className="avatar"/></Segment>
          </Grid.Column>
        </Grid>
      </footer>
    </main>
  )
}
export default Portfolio
