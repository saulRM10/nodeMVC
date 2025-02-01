import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDivision, deleteDivision, updateDivision } from "./service";
import {
  CreateNewDivisionData,
  UpdateDivisionData,
  DeleteDivisionData,
} from "../../components/Forms/DivisionForm/types";

export const useCreateDivision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewDivisionData) => createDivision(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["divisions"],
      });
    },
  });
};

export const useUpdateDivision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDivisionData) => updateDivision(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["divisions"],
      });
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.error(`Error from Update Division: ${error}`);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["divisions"] });
        await queryClient.invalidateQueries({
          queryKey: ["divisions", { id: variables.id }],
        });
      }
    },
  });
};

export const useDeleteDivision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteDivisionData) => deleteDivision(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["divisions"],
      });
    },
    onSettled: async (_, error) => {
      if (error) {
        console.error(`Error from Delete Division: ${error}`);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["divisions"] });
      }
    },
  });
};
