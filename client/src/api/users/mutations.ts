import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
    DeleteUserData,
    UpdateUserData,
    AddUserData
} from "../../components/Forms/UserForm/types";
import {
    deleteUser,
    updateUser,
    addUser,
} from "./service";

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AddUserData) => addUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserData) => updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteUserData) => deleteUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
}