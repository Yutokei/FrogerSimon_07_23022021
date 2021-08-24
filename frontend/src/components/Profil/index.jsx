import { React, useContext }from 'react';
import UserProfile from './UserProfil';
import UserPost from './UserPost';
import AdminPost from './AdminPost';
import AdminAllProfile from './AdminAllProfile';
import { AuthContext } from "../../auth/AuthContext";

const Index = () => {

const {authState} = useContext(AuthContext)

    return (
        <>
        <UserProfile />
        { authState.admin ? (
            <>
        <AdminAllProfile />
        <AdminPost /> 
        </>
        ):(
        <UserPost />)}
        </>
    );
}

export default Index;
