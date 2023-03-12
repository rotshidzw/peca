import './App.css';
import Nav from '../src/components/Nav';
import Herosection from './components/HeroSection';
import Cards from './components/cards';
import Popular from './components/popular';
import Trending from './components/trending';
import Footer from './components/footer'
function App() {
  return (
    <div className="App">
    <Nav />
    <Herosection />
    <Cards />
    <Popular />
    <Trending />
    <Footer />
    </div>
  );
}

export default App;
