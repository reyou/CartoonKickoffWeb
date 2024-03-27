import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Play from './Play';
import Navbar from './Navbar';
import About from './About';
import Contact from './Contact';
import Account from './Pages/Account';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { AuthProvider } from './Components/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/play' element={<Play />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/account' element={<Account />} />
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/sign-up' element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
