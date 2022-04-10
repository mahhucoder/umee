import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MainContent from './components/Layout/MainContent';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/UserContext';

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <div className="App">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </BrowserRouter>
    </UserContext>
  )
}

export default App
