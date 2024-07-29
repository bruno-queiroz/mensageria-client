"use client";
import { FaSearch as SearchIcon } from "react-icons/fa";
import { startSocket } from "@/ws";
import { FormEvent } from "react";
import { useFriends } from "@/hooks/useFriends";
import { Friend } from "./Friend";

export const Friends = () => {
  const { friends } = useFriends();

  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-400 w-full overflow-auto">
      <form>
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
