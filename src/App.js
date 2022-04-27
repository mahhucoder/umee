import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/UserContext';
import MainContent from './components/Layout/MainContent';
import DataBase from './Context/DataBase';

function App() {
  return (
    <UserContext>
      <DataBase>
        <BrowserRouter>
          <div className="App">
            <Header />
            <MainContent />
            <Footer />
          </div>
        </BrowserRouter>
      </DataBase>
    </UserContext>
  )
}

export default App
