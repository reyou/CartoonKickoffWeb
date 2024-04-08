import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Play from './Play';
import About from './About';
import Contact from './Contact';
import Account from './Pages/Account/Account';
import SignUp from './Pages/Account/SignUp';
import LogIn from './Pages/Account/Login';
import Verify from './Pages/Account/Verify';
import SignUpConfirmation from './Pages/Account/SignUpConfirmation';
import Sandbox from './Pages/Internal/Sandbox';
import NotFoundPage from './Pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/play' element={<Play />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/account' element={<Account />} />
      <Route path='/account/log-in' element={<LogIn />} />
      <Route path='/account/sign-up' element={<SignUp />} />
      <Route
        path='/account/sign-up-confirmation'
        element={<SignUpConfirmation />}
      />
      <Route path='/account/verify' element={<Verify />} />
      <Route path='/internal/sandbox' element={<Sandbox />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
