import { Link } from 'react-router-dom';
import logo from './assets/logo.webp';
import styles from './Navbar.module.css';
import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='Goal Kick Logo' className={styles.navbarLogo} />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label='Toggle navigation'
          onClick={handleNavCollapse}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          id='navbarSupportedContent'
          className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
        >
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
              <Link
                className='nav-link'
                to='/about'
                onClick={handleNavCollapse}
              >
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/contact'
                onClick={handleNavCollapse}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
