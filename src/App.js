import './App.css';
import FilmsList from './components/FilmsList';
import StoreImages from './components/StoreImages';
import { Auth } from './components/auth';
function App() {
  return (
    <div className="App">
      <h1>Firebase Tutorial</h1>
      <Auth/>
      <FilmsList/>
      <StoreImages/>
    </div>
  );
}

export default App;
