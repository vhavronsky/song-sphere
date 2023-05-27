import { FC } from 'react';
import Link from 'next/link';

export const SideBar: FC = () => {
  return (
    <aside className="sidebar">
      <Link className="link" href="/">
        Home
      </Link>
      <br />
      SideBar
    </aside>
  );
};
