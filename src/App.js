import './App.css'
import Map from './Components/Map'
import Header from './Components/Header'
import FilterBox from './Components/FilterBox'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Map />
      <FilterBox />
      <Footer />
    </div>
  );
}

export default App;
