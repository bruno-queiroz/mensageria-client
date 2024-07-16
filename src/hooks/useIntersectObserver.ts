import { useEffect, useRef } from "react";

export const useIntersectObserver = (fetchNextPage: () => void) => {
  const observerRef = useRef<IntersectionObserver>();

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
    const boxElement = document.getElementById("observable");
    createObserver(boxElement);

    return () => observerRef.current?.disconnect();
  }, []);

  return {
    createObserver,
  };
};
