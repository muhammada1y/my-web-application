import './App.css';
import Nav from './components/Nav.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.js';
import SignUp from './components/SignUp.js';
import PrivetCommponent from './components/privateComponent.js';
import Login from './components/login.js';
import AudioUpload from './components/mp3.js'
import Diary from './components/diary.js';
import Home from './components/home.js';
import About from './components/about.js';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route element ={<PrivetCommponent />}>
            <Route path='/' element={<Home/>} />
            <Route path='/video' element={<h1>this is video page</h1>} />
            <Route path='/audio' element={<AudioUpload/>} />
            <Route path='/image' element={<h1>this is image page</h1>} />
            <Route path='/note' element={<Diary/>} />
            <Route path='/logout' element={<h1>this is logout</h1>} />
           </Route>
           <Route path='/about' element={<About/>}/>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
