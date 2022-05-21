import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
  children?: React.ReactNode;
  title?: String;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Ricardo Flores" />
        <meta
          name="decription"
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: '0px 20px',
        }}
      >
        {children}
      </main>
    </>
  );
};
