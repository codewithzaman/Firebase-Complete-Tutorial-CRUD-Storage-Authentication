import './App.css';
import FilmsList from './components/FilmsList';
import { Auth } from './components/auth';
function App() {
  return (
    <div className="App">
      <h1>Firebase Tutorial</h1>
      <h3>Authentication by Email and Password</h3>
      <Auth/>
      <FilmsList/>
    </div>
  );
}

export default App;
