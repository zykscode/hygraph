/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import Breadcrumbs from '../Breadcrumbs';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="header rounded-t-2xl bg-green-400 ">
      <div className="nav-header rounded-t-[32px]">
        <Breadcrumbs />
        <Navbar />
      </div>
    </header>
  );
}
