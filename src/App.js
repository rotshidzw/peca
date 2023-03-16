import './App.css';
import Herosection from './components/HeroSection';
import Cards from './components/cards';
import Popular from './components/popular';
import Trending from './components/trending';
import Layout from './components/layout';


function App() {
  return (
  <Layout >
   <div className="App">
  
 
   <Herosection />
    <Cards />
    <Popular />
    <Trending />
    
  
    </div>
 </Layout>
  );
}

export default App;
