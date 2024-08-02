import { getFriends } from "@/services/friend/getFriends";
import { useQuery } from "@tanstack/react-query";

export const useFriends = () => {
  const {
    data: friends,
    isSuccess,
    isRefetching,
  } = useQuery({
    queryKey: ["getFriend"],
    queryFn: getFriends,
  });

  return {
    friends,
    isRefetching,
    isSuccess,
  };
};
