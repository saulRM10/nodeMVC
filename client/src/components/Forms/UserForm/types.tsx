interface UserFormProps {
    afterSave: () => void | null;
    requestType?: "POST" | "PATCH" | "DELETE";
    selectedUserId?: number;
    parentUserGroupId?: number;
}

interface DeleteUserData {
    id: number;
}
interface UpdateUserData {
    id: number;
    formData: {
        user_id: number;
    };
}

interface AddUserData {
    formData: {
        first_name: string;
        last_name: string;
        email: string;
        role_id: string;
    };
}

export type {
    UserFormProps,
    DeleteUserData,
    UpdateUserData,
    AddUserData
};