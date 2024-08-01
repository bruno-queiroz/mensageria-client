"use client";

export const getMyId = () => {
  if (!document) return "";
  const [_, myId] = document?.cookie.split("=");
  return myId;
};
