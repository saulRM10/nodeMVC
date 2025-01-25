import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "./service";

export const useGetAllGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });
};
