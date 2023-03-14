/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import React from 'react';

import ToggleThemeButton from '#/components/ToggleThemeButton';
import { navs } from '#/data/siteMetadata';

const Navbar = () => {
  return (
    <nav className="nav-header-rhs breadcrumbs">
      {navs.map((nav) => {
        return (
          <Link
            className="breadcrumb button"
            key={nav.name}
            href={`/${nav.link}`}
          >
            {nav.name}
          </Link>
        );
      })}

      <ToggleThemeButton />
    </nav>
  );
};

export default Navbar;
