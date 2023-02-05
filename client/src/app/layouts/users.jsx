import React from "react";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/user/editUserPage";
import UserPage from "../components/user/userPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <UsersLoader>
            {edit ? (
                userId === currentUserId ? (
                    <EditUserPage />
                ) : (
                    <Redirect to={`/users/${currentUserId}/edit`} />
                )
            ) : (
                <UserPage userId={userId} />
            )}
        </UsersLoader>
    );
};

export default Users;
