import Link from 'next/link';

import LogoIcon from '../__icons/Logo.icon';

function Sidebar() {
  return (
    <aside className="bg-base-100 w-[80vw] max-w-sm">
      <div className="px-6 py-5 border-b">
        <LogoIcon height="24" />
      </div>
      <ul className="px-6 py-4">
        <li>
          <Link href="/" className="block py-4">
            홈
          </Link>
        </li>
        <li>
          <Link href="/items/new" className="block py-4">
            신규
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
