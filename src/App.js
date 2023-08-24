import './App.css';
import Sketch from './components/Sketch';

function App() {
  return (
    <div className="App">
      <h1>Walkman</h1>
			
			<header>
				<p className="header">
					Walkman generates a 2D{" "}
					<a href="https://en.wikipedia.org/wiki/Random_walk" target="_blank" rel="noopener noreferrer">
						random walk
					</a>{" "}
					using your input as a seed for the random function that utilizes the algorithm.
				</p>

				<p>
					I would love if you shared your results with me on Discord{" "}
					<a href="https://discord.gg/5Wj3VdRtRQ" target="_blank" rel="noopener noreferrer">
						@kilgamesh
					</a>!
				</p>
			</header>

			<Sketch />

			<footer>
				<p>
					Coded with <span role="img" aria-label="heart">❤️</span> by{" "}
					<a href="https://kilgamesh.tech" target="_blank" rel="noopener noreferrer">
						KJ
					</a>
				</p>
			</footer>
    </div>
  );
}

export default App;
