import { FaSearch as SearchIcon } from "react-icons/fa";

export const FilterFriends = () => {
  return (
    <form className="flex">
      <input className="w-full p-1" type="text" />
      <button className="bg-blue-300 py-1 px-4 text-white">
        <SearchIcon />
      </button>
    </form>
  );
};
