import Link from 'next/link';

import LogoIcon from '../__icons/Logo.Icon';

function Sidebar() {
  return (
    <aside className="bg-base-100 w-[80vw] max-w-sm">
      <div className="px-6 py-6 border-b">
        <LogoIcon height="24" />
      </div>
      <ul className="py-4">
        <li>
          <Link
            href="/"
            className="block px-6 py-4 hover:bg-base-300 active:bg-base-200 transition-all"
          >
            홈
          </Link>
        </li>
        <li>
          <Link
            href="/items/new"
            className="block px-6 py-4 hover:bg-base-300 active:bg-base-200 transition-all"
          >
            신규
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
