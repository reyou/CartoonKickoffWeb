import { Link } from 'react-router-dom';
import logo from './assets/logo.webp';
import styles from './Navbar.module.css';
import { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface NavbarStandardItemsProps {
  handleNavCollapse: () => void;
}

interface NavbarCollapseButtonProps {
  isNavCollapsed: boolean;
  handleNavCollapse: () => void;
}

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

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

          <NavbarAccountItems></NavbarAccountItems>
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

function NavbarAccountItems() {
  return (
    <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle'
          href='#'
          id='navbarAccountDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          Account
        </a>
        <ul
          className='dropdown-menu dropdown-menu-end'
          aria-labelledby='navbarAccountDropdown'
        >
          <li>
            <Link to='/account/login' className='dropdown-item'>
              Login
            </Link>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Register
            </a>
          </li>
          {/* After login, show additional options */}
          {/*
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><a className="dropdown-item" href="#">Logout</a></li>
          */}
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
