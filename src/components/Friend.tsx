import { useCurrentChat } from "@/hooks/useCurrentChat";
import { MessageUser } from "@/services/message/types";
import Link from "next/link";

export function Friend(user: MessageUser) {
  return (
    <Link
      href={`/chat/${user.id}`}
      className="flex items-center gap-4 p-4 rounded bg-blue-50 cursor-pointer hover:bg-blue-100"
    >
      <div className="w-[60px] h-[60px] bg-blue-300 rounded-full">
        <img src={user?.image} alt="" className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{user.name}</span>
        <div className="text-gray-600">
          {user?.last_message?.length ? (
            <span>{user.last_message}</span>
          ) : (
            <span>say hello</span>
          )}
        </div>
      </div>

      <div className="ml-auto">
        {user?.message_amount > 0 && (
          <div className="py-[2px] px-2 text-white bg-blue-400 rounded-full">
            {user.message_amount}
          </div>
        )}
      </div>
    </Link>
  );
}
