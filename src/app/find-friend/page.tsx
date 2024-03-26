"use client";
import { FindFriendItem } from "@/components/FindFriendItem";
import { Spinner } from "@/components/Spinner";
import { useFindFriend } from "@/hooks/useFindFriend";

export default function FindFriend() {
  const { query, setQuery, handleFindFriend, isLoading, users } =
    useFindFriend();

  return (
    <section>
      <div className="flex flex-col gap-8 items-center w-[70%] mx-auto">
        <h1 className="text-4xl font-bold text-center mt-4">Find friend</h1>

        <form className="flex w-full" onSubmit={handleFindFriend}>
          <input
            type="text"
            placeholder="Search for user id or username"
            className="bg-gray-200 p-2 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-blue-200 p-2 font-semibold">
            {isLoading ? <Spinner /> : "find"}
          </button>
        </form>

        <div className="flex flex-col gap-4 w-full">
          {users?.data?.map((user) => (
            <FindFriendItem {...user} />
          ))}
        </div>
      </div>
    </section>
  );
}
