"use client";
import { startSocket } from "@/ws";
import { FormEvent } from "react";
import { useFriends } from "@/hooks/useFriends";
import { Friend } from "./Friend";
import { FilterFriends } from "./FilterFriends";

export const Friends = () => {
  const { friends } = useFriends();

  return (
    <div className="flex flex-col gap-4 p-2 bg-gray-400 w-full overflow-auto">
      <FilterFriends />

      <div className="flex flex-col gap-2">
        {friends?.data?.map((friend, i) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
};
