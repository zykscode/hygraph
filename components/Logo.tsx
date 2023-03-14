import Image from 'next/image';
import React from 'react';

import logo from '#/public/static/images/me.jpg';

const Logo = () => {
  return (
    <Image priority={true} src={logo} alt={'site Logo'} className="h-10 w-10 rounded-full" />
  );
};

export default Logo;
