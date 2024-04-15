import { Chat } from "@/components/Chat";
import { getMessage } from "@/services/message/getMessage";

export default async function Page({ params }: { params: { to: string } }) {
  const data = await getMessage(params.to);
  return (
    <section>
      <Chat {...data} />
    </section>
  );
}
