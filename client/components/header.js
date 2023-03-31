import React from 'react';
import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li className='nav-item' key={href}>
          <Link href={href} id='link' className='nav-link'>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className='navbar  navbar-light bg-light'>
      <Link href='/' id='link' className='navbar-brand'>
        Tickets
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-cnter'>{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
