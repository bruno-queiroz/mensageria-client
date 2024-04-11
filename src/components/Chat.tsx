"use client";
import { socket } from "@/app/layout";
import Message from "@/components/Message";
import { getCookie } from "cookies-next";
import { FormEvent, useEffect, useRef, useState } from "react";
import { GrSend as SendIcon } from "react-icons/gr";

export const Chat = () => {
  const [currentChat, setCurrentChat] = useState({
    name: "",
    email: "",
    online: false,
  });

  const [conversation, setConversation] = useState<
    { text: string; from: string }[]
  >([]);

  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    if (!messageRef.current) return;
    e.preventDefault();

    setConversation([
      ...conversation,
      { from: getCookie("email")!, text: messageRef.current!.value },
    ]);
    console.log("is connected", socket?.connected);
    socket?.emit("message", {
      text: messageRef.current!.value,
      to: currentChat.email,
    });
    messageRef.current.value = "";
  };

  useEffect(() => {
    function receiveMessage(data: string) {
      console.log("data", data);
      setConversation((cvt) => [...cvt, { from: "other", text: data }]);
    }
    socket?.on("message", receiveMessage);

    return () => {
      socket?.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-between bg-gray-500 min-h-screen p-2">
      <header>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-[60px] h-[60px] bg-blue-300 rounded-full">
              <img src="" alt="" />
            </div>

            <div className="flex flex-col">
              <span>{currentChat.name}</span>
              <span>{currentChat.online ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-2 flex-1 py-2">
        {conversation.map((message, i) => (
          <Message {...message} key={i} />
        ))}
      </div>

      <footer>
        <form className="flex gap-2 my-auto" onSubmit={sendMessage}>
          <input
            type="text"
            className="bg-gray-400 flex-1 p-2"
            placeholder="type..."
            ref={messageRef}
          />
          <button className="bg-blue-300 text-white p-2 rounded">
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
};
