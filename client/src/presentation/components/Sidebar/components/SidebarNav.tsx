import { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import { HomeIcon, SearchIcon } from '@presentation/components/Icons';
import { usePathname } from 'next/navigation';

export const SidebarNav: FC = ({}) => {
  const pathname = usePathname();

  const [isHomeActive, isSearchActive] = [
    pathname === '/',
    pathname === '/search',
  ];

  return (
    <nav className="sidebar__nav nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link
            className={classnames('nav__link', {
              active: isHomeActive,
            })}
            href="/"
          >
            <HomeIcon isActive={isHomeActive} />
            <span className="link__title">Home</span>
          </Link>
        </li>
        <li className="nav__item">
          <Link
            className={classnames('nav__link', {
              active: isSearchActive,
            })}
            href="/search"
          >
            <SearchIcon isActive={isSearchActive} />
            <span className="link__title">Search</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
