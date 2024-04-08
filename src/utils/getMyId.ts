"use client";

export const getMyId = () => {
  const [_, myId] = document.cookie.split("=");
  return myId;
};
