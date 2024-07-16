import { GetMessage } from "@/services/message/getMessage";
import { ServerResponse } from "@/services/types";
import { useEffect, useRef } from "react";

export const useIntersectObserver = (
  data: ServerResponse<GetMessage>[],
  fetchNextPage: () => void
) => {
  const observerRef = useRef<IntersectionObserver>();

  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
  };

  const createObserver = (boxElement: HTMLElement | null) => {
    if (!boxElement) return;

    const options = {
      root: document.getElementById("scrollable"),
      rootMargin: "0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);
    observerRef.current.observe(boxElement);
  };

  useEffect(() => {
    if (data.length === 0) return;
    const boxElement = document.getElementById("observable");
    createObserver(boxElement);

    return () => observerRef.current?.disconnect();
  }, [data.length > 0]);

  return {
    createObserver,
  };
};
