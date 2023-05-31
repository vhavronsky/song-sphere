import { FC } from 'react';

import { LibraryIcon, AddIcon } from '@presentation/components/Icons';

export const SidebarLibrary: FC = () => (
  <div className="sidebar__library">
    <div className="card">
      <div>
        <button className="library__btn">
          <span className="library__btn__img">
            <LibraryIcon />
          </span>
          <span className="library__btn__text">Your Library</span>
        </button>
      </div>
      <button className="library__btn">
        <span className="library__btn__img add-icon__wrapper">
          <AddIcon />
        </span>
      </button>
    </div>
    <div className="filters-container">
      <div>
        <div className="filters">
          <button className="filter-checkbox reset-btn">
            <span>X</span>
          </button>
          <button className="filter-checkbox">
            <span>Songs</span>
          </button>
          <button className="filter-checkbox">
            <span>Playlists</span>
          </button>
          <button className="filter-checkbox">
            <span>Artists</span>
          </button>
          <button className="filter-checkbox">
            <span>Albums</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
