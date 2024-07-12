"use client";
import { socket } from "@/app/layout";
import Message from "@/components/Message";
import { useInfiniteQuery } from "@/hooks/useInfiniteQuery";
import { sendMessage } from "@/services/message/sendMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { GrSend as SendIcon } from "react-icons/gr";

interface ChatProps {
  to: string;
}

export const Chat = ({ to }: ChatProps) => {
  const { data, fetchNextPage } = useInfiniteQuery(to);
  const params = useParams<{ to: string }>();
  const messageRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageRef.current) return;
    const newMessage = {
      message: messageRef.current!.value,
      toUser: data?.[0].data?.user.id!,
    };
    if (!newMessage.toUser) return;

    await sendMessage(newMessage);

    socket?.emit("private-message", {
      to: data?.[0]?.data?.user.id,
    });

    messageRef.current.value = "";
  };

  const scrollToEnd = () => {
    const scrollableDiv = document.getElementById("scrollable");
    if (scrollableDiv) {
      scrollableDiv.scrollTop = scrollableDiv?.scrollHeight;
    }
  };

  useEffect(() => {
    if (data.length === 1) {
      scrollToEnd();
    }
  }, [data]);

  useEffect(() => {
    function refetchMessages(payload: { to: string; from: string }) {
      if (payload.to === params.to || payload.from === params.to) {
        queryClient.invalidateQueries({ queryKey: ["getMessage"] });
      }
      queryClient.invalidateQueries({ queryKey: ["getFriend"] });
    }

    socket?.on("private-message", refetchMessages);
    socket?.on("private-message-seen", refetchMessages);

    return () => {
      socket?.off("private-message", refetchMessages);
      socket?.off("private-message-seen", refetchMessages);
    };
  }, []);

  const nextPage = () => {
    fetchNextPage();
  };
  return (
    <div className="flex flex-col gap-2 justify-between relative bg-gray-400 p-2 min-h-screen">
      <header className="sticky top-0 p-2 bg-gray-400 z-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-[60px] h-[60px] bg-blue-300 rounded-full">
              <img
                src={data?.[0]?.data?.user.image}
                alt=""
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">
                {data?.[0]?.data?.user.name}
              </span>
              <span>online</span>
            </div>

            <div>
              <button onClick={nextPage}>infinite</button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-2 flex-1 py-2">
        {data?.map((page) =>
          page?.data?.messages.map((message, i) => (
            <Message {...message} key={i} />
          ))
        )}
      </div>

      <footer className="sticky justify-center bottom-[10px]">
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
