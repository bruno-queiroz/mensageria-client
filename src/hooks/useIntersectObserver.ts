import { GetMessage } from "@/services/message/getMessage";
import { ServerResponse } from "@/services/types";
import { useEffect, useRef } from "react";

export const useIntersectObserver = (
  data: ServerResponse<GetMessage>[],
  isScrolledDown: boolean,
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
    const chatHeaderHeight = "-76px";
    const options = {
      root: document.getElementById("scrollable"),
      rootMargin: chatHeaderHeight,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);
    observerRef.current.observe(boxElement);
  };

  useEffect(() => {
    const boxElement = document.getElementById("observable");
    let timeoutId: NodeJS.Timeout;

    if (data.length === 1 && isScrolledDown) {
      timeoutId = setTimeout(() => {
        createObserver(boxElement);
      }, 1000);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current?.unobserve(boxElement!);
      clearTimeout(timeoutId);
    };
  }, [isScrolledDown]);
};
