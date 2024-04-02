import Link from "next/link";
import { Menu } from "./Menu";

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex gap-12 items-center">
        <Link href="/" className="font-bold text-3xl">
          Mensageria
        </Link>

        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link href="/find-friend">Find friend</Link>
            </li>
            <li>
              <Link href="/chat">Chat</Link>
            </li>
          </ul>
        </nav>
        <Menu />
      </div>
    </header>
  );
}
