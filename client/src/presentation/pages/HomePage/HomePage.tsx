import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SongSphere HomePage',
};

export const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link className="link" href="/track/id">
        Track
      </Link>
    </>
  );
};
