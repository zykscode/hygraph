/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <section className="min-h-3/4 m-auto grid w-5/6 rounded-2xl md:w-3/5 lg:grid-cols-2 ">
      <div className="relative overflow-hidden bg-gradient-to-tr from-blue-400 to-indigo-600">
        Images
      </div>
      <div className="right flex flex-col justify-evenly  bg-[var(--blueBackgroundCo)]">
        <div className="py-10 text-center">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
