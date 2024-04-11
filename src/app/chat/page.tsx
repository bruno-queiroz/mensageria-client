import { Friends } from "@/components/Friends";
import { Chat } from "@/components/Chat";

export default function ChatPage() {
  return (
    <section className="bg-gray-200">
      <div className="bg-blue-300 w-11 h-full fixed"></div>
      <div className="grid grid-cols-chat h-full ml-11 pl-2 gap-2">
        <Friends />
        <Chat />
      </div>
    </section>
  );
}
