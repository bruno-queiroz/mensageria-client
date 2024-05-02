import { Chat } from "@/components/Chat";

export default function Page({ params }: { params: { to: string } }) {
  return (
    <section>
      <Chat to={params.to} />
    </section>
  );
}
