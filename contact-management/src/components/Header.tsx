import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
const Header: React.FC = () => {
  return (
    <header className='bg-black text-black font-semibold py-3 text-xl whitespace-nowrap'>
      <nav className=' hea flex justify-center'>
        <h1 className="heading text-center justify-content-center">Contacts Page</h1>
        <ul className=' head flex flex-row justify-spacearound list-none w-1/4 md:w-2/4 sm:w-2/4 max-[645px]:w-full justify-evenly'>
          <Link to='/'><div className="head1"><li className='border border-yellow-400 rounded-full px-4 py-1 bg-yellow-400'>Contacts</li></div></Link>
          <Link to='/charts'><div className="head1"><li className='border border-yellow-400 rounded-full px-4 py-1 bg-yellow-400'>Charts</li></div></Link>
          <Link to='/maps'><div className="head1"><li className='border border-yellow-400 rounded-full px-4 py-1 bg-yellow-400'>Maps</li></div></Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;