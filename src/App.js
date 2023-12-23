
import './App.css';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Header from './components/Header/Header';
import SimpleBottomNavigation from "./components/MainNav"
import Movies from './components/Pages/Movies/Movies';
import Series from './components/Pages/Series/Series';
import Trending from './components/Pages/Trending/Trending';
import Search from './components/Pages/Search/Search';
import { Container } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
       <Routes>
         
            <Route path="/" element={<Trending/>} exact />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/search" element={<Search/>} />
        
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
