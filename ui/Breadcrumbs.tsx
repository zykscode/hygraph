/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import Logo from '#/components/Logo';

const Breadcrumbs = () => {
  console.log({ todo: 'add site name' });
  return (
    <div className="breadcrumbs">
      <div className="breadcrumb active">
        <Logo />
      </div>
    </div>
  );
};

export default Breadcrumbs;
