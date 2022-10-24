import Link from 'next/link';

import LogoIcon from '../__icons/Logo.icon';

export interface SidebarProps {}

function Sidebar(props: SidebarProps) {
  return (
    <div className="bg-base-100 w-[80vw] max-w-sm">
      <div className="px-6 py-5 border-b">
        <LogoIcon height="24" />
      </div>
      <ul className="px-6 py-4">
        <li>
          <Link href="/" passHref>
            <a className="block py-4">홈</a>
          </Link>
        </li>
        <li>
          <Link href="/items/new" passHref>
            <a className="block py-4">신규</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
