import { useCurrentChat } from "@/hooks/useCurrentChat";
import { MessageUser } from "@/services/message/types";
import Link from "next/link";

export function Friend(user: MessageUser) {
  return (
    <Link
      href={`/chat/${user.id}`}
      className="flex gap-4 p-4 rounded bg-blue-50 cursor-pointer hover:bg-blue-100"
    >
      <div className="w-[60px] h-[60px] bg-blue-300 rounded-full">
        <img src={user.image} alt="" className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <span>{user.name}</span>
        <span>say hello</span>
      </div>
    </Link>
  );
}
