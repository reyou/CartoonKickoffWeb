import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

import { AuthProvider } from './Components/AuthProvider';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar></Navbar>
        <AppRoutes></AppRoutes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
