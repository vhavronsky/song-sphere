import { FC, PropsWithChildren } from 'react';

import '../assets/styles/main.scss'

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <nav>
          <h1>My Navbar</h1>
        </nav>
        <div className='content'>
          <aside>
            <h1>My Aside Content</h1>
          </aside>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};
