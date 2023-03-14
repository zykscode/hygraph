/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from 'react';

import { LoginForm } from '#/components/Forms';

type Props = {
  children: ReactNode;
};

const Page = () => {
  return (
    <section className="flexGroup gap-10">
      <div>
        <h2 className="title">Admin login</h2>
        <p> Sign in as an Admin</p>
      </div>
      <LoginForm />
    </section>
  );
};

export default Page;
