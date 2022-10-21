import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export interface HeaderProps {}

function Header(props: HeaderProps) {
  const { data, status } = useSession();

  const onClick = () => {
    signOut({ redirect: false });
  };

  return (
    <header>
      <Link href="/" passHref>
        <a>Blogmark</a>
      </Link>
      <nav />
      <p>
        {status === 'loading' && 'loading...'}
        {status === 'authenticated' && (
          <div>
            <p>{data.user?.name}</p>
            <button type="button" onClick={onClick}>
              logout
            </button>
          </div>
        )}
        {status === 'unauthenticated' && 'unauthenticated'}
      </p>
    </header>
  );
}

export default Header;
