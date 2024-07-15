import { GetMessage, getMessage } from "@/services/message/getMessage";
import { ServerResponse } from "@/services/types";
import { useEffect, useState } from "react";

export const useInfiniteQuery = (to: string) => {
  const [data, setDate] = useState<ServerResponse<GetMessage>[]>([]);

  const fetchNextPage = async () => {
    const newData = await getMessage({
      date: data[data.length - 1].data?.messages[0].sentAt,
      to,
      mode: "default",
    });
    setDate([...data, newData].reverse());
  };

  useEffect(() => {
    (async () => {
      const newData = await getMessage({
        date: new Date().toISOString(),
        to: to,
        mode: "default",
      });
      setDate([...data, newData]);
    })();
  }, []);

  return {
    data,
    fetchNextPage,
  };
};
