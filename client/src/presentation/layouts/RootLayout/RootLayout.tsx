import { FC, PropsWithChildren } from 'react';

import { Header } from '@presentation/components/Header';
import { Sidebar } from '@presentation/components/Sidebar';
import { PlayingBar } from '@presentation/components/PlayingBar';
import { MainView } from '@presentation/components/MainView';

import '../../assets/styles/main.scss';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="root-content">
          <Header />
          <Sidebar />
          <PlayingBar />
          <MainView>{children}</MainView>
        </div>
      </body>
    </html>
  );
};
