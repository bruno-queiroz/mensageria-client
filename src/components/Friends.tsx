"use client";
import { useFriends } from "@/hooks/useFriends";
import { Friend } from "./Friend";
import { FilterFriends } from "./FilterFriends";
import { useFilterFriends } from "@/hooks/useFilterFriends";

export const Friends = () => {
  const { friends, isRefetching, isSuccess } = useFriends();
  const { friendsFiltered, filter } = useFilterFriends({
    friends,
    isRefetching,
    isSuccess,
  });

  return (
    <div className="flex flex-col gap-4 p-2 bg-gray-400 w-full overflow-auto">
      <FilterFriends filter={filter} />

      <div className="flex flex-col gap-2">
        {friendsFiltered?.map((friend) => (
          <Friend key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
};
