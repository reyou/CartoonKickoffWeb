import { Link } from 'react-router-dom';
import logo from './assets/logo.webp';
import styles from './Navbar.module.css';
import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from './Components/AuthProvider';
import AuthContextType from './Components/AuthContextType';

interface NavbarStandardItemsProps {
  handleNavCollapse: () => void;
}

interface NavbarCollapseButtonProps {
  isNavCollapsed: boolean;
  handleNavCollapse: () => void;
}

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const auth = useAuth();
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <NavbarLogo></NavbarLogo>
        <NavbarCollapseButton
          isNavCollapsed={isNavCollapsed}
          handleNavCollapse={handleNavCollapse}
        />
        <div
          id='navbarSupportedContent'
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
        >
          <NavbarStandardItems
            handleNavCollapse={handleNavCollapse}
          ></NavbarStandardItems>

          <NavbarAccountItems auth={auth}></NavbarAccountItems>
        </div>
      </div>
    </nav>
  );
}

function NavbarCollapseButton({
  isNavCollapsed,
  handleNavCollapse
}: NavbarCollapseButtonProps) {
  return (
    <button
      className='navbar-toggler'
      type='button'
      data-bs-toggle='collapse'
      data-bs-target='#navbarSupportedContent'
      aria-controls='navbarSupportedContent'
      aria-expanded={!isNavCollapsed}
      aria-label='Toggle navigation'
      onClick={handleNavCollapse}
    >
      <span className='navbar-toggler-icon'></span>
    </button>
  );
}

function NavbarLogo() {
  return (
    <Link className='navbar-brand' to='/'>
      <img src={logo} alt='Goal Kick Logo' className={styles.navbarLogo} />
    </Link>
  );
}

interface NavbarAccountItemsProps {
  auth: AuthContextType | null;
}

function NavbarAccountItems({ auth }: NavbarAccountItemsProps) {
  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
      <li className='nav-item dropdown'>
        <button
          className='nav-link dropdown-toggle'
          id='navbarAccountDropdown'
          data-bs-toggle='dropdown'
          aria-expanded='false'
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            color: 'inherit',
            textDecoration: 'inherit'
          }}
        >
          Account
        </button>
        <ul
          className='dropdown-menu dropdown-menu-end'
          aria-labelledby='navbarAccountDropdown'
        >
          {auth && auth.authToken ? (
            <>
              <li>
                <Link to='/account' className='dropdown-item'>
                  Profile
                </Link>
              </li>
              <li>
                <button className='dropdown-item' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/account/log-in' className='dropdown-item'>
                  Login
                </Link>
              </li>
              <li>
                <Link to='/account/sign-up' className='dropdown-item'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </li>
    </ul>
  );
}

function NavbarStandardItems({ handleNavCollapse }: NavbarStandardItemsProps) {
  return (
    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
      <li className='nav-item'>
        <Link className='nav-link' to='/' onClick={handleNavCollapse}>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/play' onClick={handleNavCollapse}>
          Play
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/about' onClick={handleNavCollapse}>
          About
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/contact' onClick={handleNavCollapse}>
          Contact Us
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
