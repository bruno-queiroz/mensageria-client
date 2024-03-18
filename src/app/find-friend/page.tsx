import { FindFriendItem } from "@/components/FindFriendItem";

export default function FindFriend() {
  return (
    <section>
      <div className="flex flex-col gap-8 items-center w-[70%] mx-auto">
        <h1 className="text-4xl font-bold text-center mt-4">Find friend</h1>

        <form className="flex w-full">
          <input
            type="text"
            placeholder="Search for user id or username"
            className="bg-gray-200 p-2 w-full"
          />
          <button className="bg-blue-200 p-2">Find</button>
        </form>

        <div className="flex flex-col gap-4 w-full">
          <FindFriendItem />
        </div>
      </div>
    </section>
  );
}
