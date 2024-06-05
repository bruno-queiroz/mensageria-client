"use client";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { startSocket } from "@/ws";
import { FormEvent } from "react";
import { useFriends } from "@/hooks/useFriends";
import { Friend } from "./Friend";

export const Friends = () => {
  const { friends } = useFriends();

  const test = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startSocket("http://localhost:3333", 3010);
  };
  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-400 w-full overflow-auto">
      <form onSubmit={test}>
        <input className="mb-4" type="text" />
        <button>
          <SearchIcon />
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {friends?.data?.map((friend, i) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
};
