import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTeam, updateTeam, deleteTeam } from "./service";
import {
  CreateNewTeamData,
  UpdateTeamData,
  DeleteTeamData,
} from "../../components/Forms/TeamsForm/types";

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewTeamData) => createNewTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTeamData) => updateTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.error(`Error from Update Team: ${error}`);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["update"] });
        await queryClient.invalidateQueries({
          queryKey: ["update", { id: variables.id }],
        });
      }
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteTeamData) => deleteTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(`Error from Delete Team: ${error}`);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["teams"] });
      }
    },
  });
};
