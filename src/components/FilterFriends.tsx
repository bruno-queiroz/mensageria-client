import { FormEvent, useRef } from "react";
import { FaSearch as SearchIcon } from "react-icons/fa";

interface FilterFriendsProps {
  filter: (e: FormEvent<HTMLFormElement>, name: string) => void;
}

export const FilterFriends = ({ filter }: FilterFriendsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex"
      onSubmit={(e) => filter(e, inputRef.current?.value || "")}
    >
      <input className="w-full p-1" type="text" ref={inputRef} />
      <button className="bg-blue-300 py-1 px-4 text-white">
        <SearchIcon />
      </button>
    </form>
  );
};
