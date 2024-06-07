"use client";
import { socket } from "@/app/layout";
import Message from "@/components/Message";
import { getMessage } from "@/services/message/getMessage";
import { sendMessage } from "@/services/message/sendMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { GrSend as SendIcon } from "react-icons/gr";

interface ChatProps {
  to: string;
}

export const Chat = ({ to }: ChatProps) => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getMessage"],
    queryFn: () => getMessage(to),
  });
  const params = useParams<{ to: string }>();
  const messageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [chatWidth, setChatWidth] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageRef.current) return;
    const newMessage = {
      message: messageRef.current!.value,
      toUser: data?.data?.user.id!,
    };
    if (!newMessage.toUser) return;

    const message = await sendMessage(newMessage);

    socket?.emit("private-message", {
      to: data?.data?.user.id,
    });

    socket?.emit("testing", {
      to: data?.data?.user.id,
    });
    messageRef.current.value = "";
  };

  const updateChatWidth = () => {
    const padding = 32;
    const currentChatWidth =
      chatRef.current?.getBoundingClientRect().width || 100;
    setChatWidth(currentChatWidth - padding);
  };

  const scrollToEnd = () => {
    const scrollableDiv = document.getElementById("scroll");
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv?.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [data]);

  useEffect(() => {
    function refetchMessages(payload: { to: string }) {
      // if (payload.to !== params.to) return;
      queryClient.invalidateQueries({ queryKey: ["getMessage"] });
    }
    function test(payload: { to: string }) {
      if (payload.to === params.to) return;
      queryClient.invalidateQueries({ queryKey: ["getFriend"] });
    }
    socket?.on("private-message", refetchMessages);
    socket?.on("private-message-seen", refetchMessages);
    socket?.on("testing", test);

    updateChatWidth();
    window.addEventListener("resize", updateChatWidth);

    return () => {
      socket?.off("private-message", refetchMessages);
      socket?.off("private-message-seen", refetchMessages);
      socket?.off("testing", test);
      window.removeEventListener("resize", updateChatWidth);
    };
  }, []);

  return (
    <div
      className="flex flex-col gap-2 justify-between relative bg-gray-400 p-2 min-h-screen"
      ref={chatRef}
    >
      <header>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-[60px] h-[60px] bg-blue-300 rounded-full">
              <img
                src={data?.data?.user.image}
                alt=""
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col">
              <span>{data?.data?.user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-2 flex-1 py-2 pb-[50px]">
        {data?.data?.messages.map((message, i) => (
          <Message {...message} key={i} />
        ))}
      </div>

      <footer
        className="fixed justify-center bottom-[10px]"
        style={{ width: chatWidth }}
      >
        <form className="flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="bg-gray-200 flex-1 p-2"
            placeholder="Type..."
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
