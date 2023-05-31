'use client';

import { FC } from 'react';

import { SidebarNav } from './components/SidebarNav';
import { SidebarLibrary } from './components/SidebarLibrary';

export const Sidebar: FC = () => {
  return (
    <aside className="sidebar">
      <SidebarNav />
      <SidebarLibrary />
    </aside>
  );
};
