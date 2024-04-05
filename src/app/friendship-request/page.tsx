import { FriendshipRequestItem } from "@/components/FriendshipRequestItem";
import { NoFriendshipRequests } from "@/components/NoFriendshipRequests";
import {
  GetFriendshipRequest,
  getFriendshipRequest,
} from "@/services/friendship-request/getFriendshipRequest";
import { ServerResponse } from "@/services/types";
import { cookies } from "next/headers";

export default async function FriendshipRequest() {
  const authCookie = cookies().get("next-auth.session-token");
  let friendshipRequests: null | ServerResponse<GetFriendshipRequest[]> = null;
  if (authCookie) {
    friendshipRequests = await getFriendshipRequest(
      `${authCookie.name}=${authCookie.value}`
    );
  }
  return (
    <section>
      <h1 className="font-semibold text-4xl text-center mb-8 mt-4">
        Friendship request
      </h1>
      <div className="flex flex-col gap-4 w-[70%] mx-auto">
        {friendshipRequests?.data?.length === 0 && <NoFriendshipRequests />}

        {friendshipRequests?.data?.map((request) => (
          <FriendshipRequestItem {...request} key={request.fromUser} />
        ))}
      </div>
    </section>
  );
}
