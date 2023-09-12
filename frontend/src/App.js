
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainForm from './components/MainForm';
import ChatRoom from './components/ChatRoom';
// import Anagram from './components/Anagram'

function App() {
  return (
  //  <Anagram/>
        <BrowserRouter>

          <Routes>
             <Route path='/' element={<MainForm/>}/>
             <Route path='/chat/:roomName' element={<ChatRoom/>}/>
             <Route path='*' element={<h1>404, Page Not Found</h1>}/>
          </Routes>

        </BrowserRouter>
  );
}

export default App;
