import { Friends } from "@/components/Friends";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="bg-gray-200">
        <div className="bg-blue-300 w-11 h-full fixed"></div>
        <div className="grid grid-cols-chat h-full ml-11 pl-2 gap-2">
          <Friends />
          {children}
        </div>
      </section>
    </>
  );
}
