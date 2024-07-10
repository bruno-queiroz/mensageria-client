import { getFriends } from "@/services/friend/getFriends";
import { useQuery } from "@tanstack/react-query";

export const useFriends = () => {
  const { data: friends, isPending } = useQuery({
    queryKey: ["getFriend"],
    queryFn: getFriends,
  });

  return {
    friends,
  };
};
