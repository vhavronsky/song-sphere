import { FC, PropsWithChildren } from 'react';

import { Header } from '@presentation/components/Header'
import { SideBar } from '@presentation/components/SideBar'
import { PlayingBar } from '@presentation/components/PlayingBar'
import { MainView } from '@presentation/components/MainView';

import '../../assets/styles/main.scss'

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className='root-content'>
          <Header />
          <SideBar />
          <PlayingBar />
          <MainView>{children}</MainView>
        </div>
      </body>
    </html>
  );
};
