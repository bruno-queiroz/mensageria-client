"use client";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { RiCloseLine as CloseIcon } from "react-icons/ri";
import {
  IoMdPerson as PersonIcon,
  IoMdPersonAdd as AddFriendIcon,
} from "react-icons/io";
import { MdOutlineLogout as SignOutIcon } from "react-icons/md";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="ml-auto">
      <button onClick={toggleMenu}>
        <img
          src={data?.user?.image || ""}
          alt=""
          className="bg-blue-400 w-[40px] h-[40px] rounded-full"
        />
      </button>
      <div className={`${!isMenuOpen && "hidden"}`}>
        <div
          onClick={toggleMenu}
          className="bg-black/25 fixed top-0 bottom-0 right-0 left-0 z-10"
        />

        <aside className="fixed right-0 z-20 bg-white top-0 bottom-0 p-4 rounded-tl-lg rounded-bl-lg">
          <header className="flex items-center gap-2 mb-4">
            <img
              src={data?.user?.image || ""}
              alt=""
              className="bg-blue-400 w-[40px] h-[40px] rounded-full"
            />
            <div className="flex flex-col justify-center px-4">
              <span className="font-bold">{data?.user?.name}</span>
              <span className="text-gray-600">{data?.user?.email}</span>
            </div>

            <button
              onClick={toggleMenu}
              className="bg-blue-500 text-white p-1 rounded"
            >
              <CloseIcon />
            </button>
          </header>
          <div>
            <nav>
              <ul>
                <li>
                  <Link
                    href={"/profile"}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200"
                  >
                    <PersonIcon />
                    Your profile
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/friendship-request"}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200"
                  >
                    <AddFriendIcon />
                    Friendship requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 p-2 w-full hover:bg-gray-200"
                  >
                    <SignOutIcon />
                    Sign out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};
